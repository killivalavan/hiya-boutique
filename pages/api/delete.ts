import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { category, filename } = req.body;

  if (!category || !filename) {
    return res.status(400).json({ error: 'Missing category or filename' });
  }

  const filePath = path.join(process.cwd(), 'public', category, filename);

  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.status(200).json({ success: true });
    } else {
      return res.status(404).json({ error: 'File not found' });
    }
  } catch (err) {
    console.error('Delete error:', err);
    return res.status(500).json({ error: 'Failed to delete file' });
  }
}
