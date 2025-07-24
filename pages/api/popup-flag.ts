// /pages/api/popup-flag.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Make sure to secure this in Vercel secrets
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('popup_flags')
      .select('enabled')
      .eq('id', 'global')
      .single();

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
  }

  else if (req.method === 'POST') {
    const { enabled } = req.body;

    const { error } = await supabase
      .from('popup_flags')
      .upsert({ id: 'global', enabled });

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ success: true });
  }

  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
