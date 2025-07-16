// pages/api/list.ts
import { v2 as cloudinary } from 'cloudinary';
import type { NextApiRequest, NextApiResponse } from 'next';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { category } = req.query;
  if (!category || typeof category !== 'string') {
    return res.status(400).json({ error: 'Missing category' });
  }

  try {
    const result = await cloudinary.search
      .expression(`folder:${category}`)
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    const files = result.resources.map((r) => ({
      url: r.secure_url,
      public_id: r.public_id,
    }));

    return res.status(200).json({ files });
  } catch (err) {
    console.error('Cloudinary list error:', err);
    return res.status(500).json({ error: 'Failed to list files' });
  }
}
