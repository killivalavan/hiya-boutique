import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { category } = req.query;

  if (!category || typeof category !== 'string') {
    return res.status(400).json({ error: 'Missing category' });
  }

  const dirPath = path.join(process.cwd(), 'public', category);

  try {
    if (!fs.existsSync(dirPath)) {
      return res.status(200).json({ files: [] });  // empty list if dir not exist
    }

    const files = fs.readdirSync(dirPath)
      .filter(f => !f.startsWith('.') && /\.(jpe?g|png|webp)$/i.test(f))
      .sort((a, b) => {
        const aTime = fs.statSync(path.join(dirPath, a)).mtime.getTime();
        const bTime = fs.statSync(path.join(dirPath, b)).mtime.getTime();
        return bTime - aTime;  // newest first
      });

    return res.status(200).json({ files });
  } catch (err) {
    console.error('List error:', err);
    return res.status(500).json({ error: 'Failed to list files' });
  }
}
