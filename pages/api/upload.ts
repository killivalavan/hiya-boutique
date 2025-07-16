// pages/api/upload.ts
import { v2 as cloudinary } from 'cloudinary';
import type { NextApiRequest, NextApiResponse } from 'next';

const formidable = require('formidable'); // ✅ safe CJS import
export const config = { api: { bodyParser: false } };

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const form = new formidable.IncomingForm({ multiples: true, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(400).json({ error: 'Error parsing form' });
    }

    const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;
    if (!category) {
      return res.status(400).json({ error: 'Missing category' });
    }

    const allFiles = Array.isArray(files.images) ? files.images : [files.images];
    const uploadedFiles = [];

    try {
      for (const file of allFiles) {
        if (!file?.filepath) continue;

        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: category,
          resource_type: 'image',
        });

        uploadedFiles.push({ url: result.secure_url, public_id: result.public_id });
      }

      return res.status(200).json({ success: true, files: uploadedFiles });
    } catch (uploadErr) {
      console.error('Upload error:', uploadErr);
      return res.status(500).json({ error: 'Failed to upload files' });
    }
  });
}
