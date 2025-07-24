// pages/api/list.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // secure key
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const category = req.query.category as string;

  if (!category) {
    return res.status(400).json({ error: 'Category is required' });
  }

  try {
    const { resources } = await cloudinary.search
      .expression(`folder=${category}`)
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    const cloudinaryFiles = resources.map((file: any) => ({
      url: file.secure_url,
      public_id: file.public_id,
    }));

    const publicIds = cloudinaryFiles.map((f) => f.public_id);

    // 🟢 Get badges from Supabase
    const { data: badgeRows, error: badgeError } = await supabase
      .from('image_badges')
      .select('public_id, badge')
      .in('public_id', publicIds);

    if (badgeError) {
      console.error('Supabase badge error:', badgeError);
    }

    const badgeMap = (badgeRows || []).reduce((acc, row) => {
      acc[row.public_id] = row.badge;
      return acc;
    }, {} as Record<string, string>);

    // 🟢 Merge badge into each Cloudinary image
    const imagesWithBadges = cloudinaryFiles.map((file) => ({
      ...file,
      badge: badgeMap[file.public_id] || null,
    }));

    res.status(200).json({ files: imagesWithBadges });
  } catch (err: any) {
    console.error('List API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
}
