import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

const filePath = path.join(process.cwd(), 'data', 'popup-flag.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const data = fs.readFileSync(filePath, 'utf-8');
    res.status(200).json(JSON.parse(data));
  } else if (req.method === 'POST') {
    const { enabled } = req.body;
    fs.writeFileSync(filePath, JSON.stringify({ enabled }));
    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
}
