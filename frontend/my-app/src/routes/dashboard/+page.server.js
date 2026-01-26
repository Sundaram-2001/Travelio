// @ts-nocheck
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    const { session } = await locals.safeGetSession();

    if (!session) {
        throw redirect(303, "/auth"); 
    }

    const { data: userData, error: dbError } = await locals.supabase
        .from("users")
        .select("*")
        .eq('id', session.user.id) 
        .single(); 

    return { userData };
}