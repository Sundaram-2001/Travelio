// @ts-nocheck
import { fail, redirect } from "@sveltejs/kit";
import { env } from '$env/dynamic/public';
const PUBLIC_API_URL = env.PUBLIC_API_URL;

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const { session } = await locals.safeGetSession();
    if (!session) throw redirect(303, "/auth");
    return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals, fetch }) => {
        const { session } = await locals.safeGetSession();
        if (!session) throw redirect(303, "/auth");

        const formData = await request.formData();
        const full_name = formData.get("full_name");
        const currentCity = formData.get("currentCity");

        if (!full_name || !currentCity) {
            return fail(400, { message: "All fields are required", full_name });
        }

        let success = false;

        try {
            const response = await fetch(`${PUBLIC_API_URL}/onboard`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ full_name, currentCity })
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error(`[BACKEND ERROR] Status: ${response.status} | Message: ${errorMessage}`);
                
                return fail(response.status, { 
                    message: "Backend failed to save profile", 
                    full_name 
                });
            }

            
            success = true;

        } catch (err) {
            console.error("Fetch Error:", err);
            return fail(500, { message: "Could not connect to API server." });
        }

        
        if (success) {
            throw redirect(303, "/dashboard");
        }
    }
};