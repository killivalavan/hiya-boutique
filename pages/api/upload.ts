import { IncomingForm, File } from 'formidable';
import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to ensure directory exists
const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const form = new IncomingForm({ multiples: true, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(400).json({ error: 'Error parsing form' });
    }

    const category = Array.isArray(fields.category)
      ? fields.category[0]
      : fields.category;

    if (!category) {
      return res.status(400).json({ error: 'Missing category' });
    }

    const uploadDir = path.join(process.cwd(), 'public', category);
    ensureDir(uploadDir);

    const allFiles = Array.isArray(files.images) ? files.images : [files.images];

      try {
    for (const file of allFiles) {
      const typed = file as File;
      if (!typed.filepath || !typed.originalFilename) continue;

      const dest = path.join(uploadDir, typed.originalFilename);
      fs.copyFileSync(typed.filepath, dest);      // ✅ copy from temp
      fs.unlinkSync(typed.filepath);              // ✅ delete temp file
    }

    return res.status(200).json({ success: true });
  } catch (moveErr) {
    console.error('File move error:', moveErr);
    return res.status(500).json({ error: 'Failed to move files' });
  }
    });
}
