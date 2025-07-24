import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'popup-flag.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const file = fs.readFileSync(filePath, 'utf-8');
      const json = JSON.parse(file);
      res.status(200).json(json);
    } catch (err) {
      res.status(500).json({ error: 'Failed to read popup flag' });
    }
  } else if (req.method === 'POST') {
    try {
      const body = req.body;
      fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf-8');
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update popup flag' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
