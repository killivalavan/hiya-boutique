import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const dirPath = path.join(process.cwd(), 'data');
const filePath = path.join(dirPath, 'popup-flag.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // ✅ Create folder if not exists
      if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);

      // ✅ Create default file if not exists
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({ enabled: false }, null, 2), 'utf-8');
      }

      const file = fs.readFileSync(filePath, 'utf-8');
      const json = JSON.parse(file);
      res.status(200).json(json);
    } catch (err) {
      console.error('[GET popup-flag error]', err);
      res.status(500).json({ error: 'Failed to read popup flag' });
    }
  } else if (req.method === 'POST') {
    try {
      const body = req.body;

      // ✅ Ensure folder exists before writing
      if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);

      fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf-8');
      res.status(200).json({ success: true });
    } catch (err) {
      console.error('[POST popup-flag error]', err);
      res.status(500).json({ error: 'Failed to update popup flag' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
