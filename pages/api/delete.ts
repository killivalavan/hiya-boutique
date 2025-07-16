// pages/api/delete.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { public_id } = req.body;

  if (!public_id) {
    return res.status(400).json({ error: 'Missing public_id' });
  }

  try {
    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result === 'ok' || result.result === 'not found') {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: 'Failed to delete on Cloudinary' });
    }
  } catch (err) {
    console.error('Cloudinary delete error:', err);
    return res.status(500).json({ error: 'Failed to delete image' });
  }
}
