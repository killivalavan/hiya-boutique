import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { public_id, badge, category } = req.body;

  if (!public_id || category === undefined || category === null) {
    return res.status(400).json({ error: 'One or more required fields are missing' });
  }

  try {
    const { data, error } = await supabase
      .from('image_badges')
      .upsert([{ public_id, badge: badge || null, category }], {
        onConflict: 'public_id'
      });

    if (error) {
      console.error('Supabase upsert error:', error);
      return res.status(500).json({ error: 'Failed to update badge' });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
