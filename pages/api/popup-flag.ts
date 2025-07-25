// /pages/api/popup-flag.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('popup_flag')
      .select('enabled')
      .eq('id', 1) // ✅ match numeric ID
      .single();

    if (error) {
      console.error('[GET] Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { enabled } = req.body;

    const { error } = await supabase
      .from('popup_flag')
      .upsert({ id: 1, enabled }); // ✅ use numeric ID

    if (error) {
      console.error('[POST] Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
