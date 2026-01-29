// @ts-nocheck
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get('code');

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const { data: userRecord } = await supabase
        .from('users')
        .select('id')
        .eq('id', data.user.id)
        .single();8

      if (userRecord) {
        throw redirect(303, '/dashboard');
      } else {
        throw redirect(303, '/onboard');
      }
    }
  }

  
  throw redirect(303, '/auth?error=invalid-link');
};