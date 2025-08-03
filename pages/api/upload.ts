// pages/api/upload.ts
import { v2 as cloudinary } from 'cloudinary';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, Fields, Files } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Warn early if env is missing
['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'].forEach((name) => {
  if (!process.env[name]) {
    console.warn(`Warning: Environment variable ${name} is not set.`);
  }
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

type UploadedFileInfo = { url: string; public_id: string };

// parse with per-file and total size caps
const parseForm = (req: NextApiRequest) =>
  new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
    const form = new IncomingForm({
      multiples: true,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB per file
      maxTotalFileSize: 100 * 1024 * 1024, // 100MB aggregate across all files
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { fields, files } = await parseForm(req);

    const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;
    if (!category || typeof category !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid category' });
    }

    let allFiles: any[] = [];
    if (Array.isArray(files.images)) {
      allFiles = files.images;
    } else if (files.images) {
      allFiles = [files.images];
    } else {
      return res.status(400).json({ error: 'No images uploaded under field "images"' });
    }

    if (allFiles.length > 10) {
      return res.status(400).json({ error: 'Too many files. Maximum of 10 images allowed per upload.' });
    }

    const uploadedFiles: UploadedFileInfo[] = [];

    for (const file of allFiles) {
      const filepath = (file as any).filepath || (file as any).path;
      if (!filepath || !fs.existsSync(filepath)) {
        console.warn('Skipping file with missing path:', file);
        continue;
      }

      const result = await cloudinary.uploader.upload(filepath, {
        folder: category,
        resource_type: 'image',
      });

      uploadedFiles.push({ url: result.secure_url, public_id: result.public_id });
    }

    if (uploadedFiles.length === 0) {
      return res.status(500).json({ error: 'No files were uploaded successfully' });
    }

    return res.status(200).json({ success: true, files: uploadedFiles });
  } catch (err: any) {
    console.error('Upload handler error:', err);

    // formidable file size errors
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ error: 'One of the files is too large. Max size is 10MB per file.' });
    }
    if (err.code === 'LIMIT_TOTAL_FILE_SIZE' || (err.message && err.message.includes('maxTotalFileSize'))) {
      return res.status(413).json({ error: 'Total upload size exceeded. Max aggregate is 100MB.' });
    }

    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
