import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('popup_flag')
      .select('id, enabled')
      .limit(1)
      .maybeSingle();


    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(200).json({ enabled: false });

    return res.status(200).json({ enabled: data.enabled });
  }

  if (req.method === 'POST') {
    const { enabled } = req.body;

    const { data: existing, error: getErr } = await supabase
      .from('popup_flag')
      .select('id')
      .limit(1)
      .maybeSingle();


    if (getErr) {
      return res.status(500).json({ error: getErr.message });
    }

    if (!existing) {
      console.log('📥 No row, inserting new...');
      const { data, error } = await supabase
        .from('popup_flag')
        .insert({ enabled })
        .select()
        .maybeSingle();


      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true, data });
    }

    const { data, error } = await supabase
      .from('popup_flag')
      .update({ enabled })
      .eq('id', existing.id)
      .select()
      .maybeSingle();


    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json({ success: true, data });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
