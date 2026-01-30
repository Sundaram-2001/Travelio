// @ts-nocheck
import { fail, redirect } from "@sveltejs/kit";
import { env } from '$env/dynamic/public';
const PUBLIC_API_URL = env.PUBLIC_API_URL;

export async function load({ locals }) {
    const { session } = await locals.safeGetSession();
    if (!session) {
        throw redirect(302, "/auth");
    }
    return {};
}

export const actions = {
    default: async ({ request, locals, fetch }) => {
        const { session } = await locals.safeGetSession();
        if (!session) throw redirect(302, "/auth");

        const formData = await request.formData();
        const full_name = formData.get("full_name");
        const currentCity = formData.get("currentCity");

        // Basic validation: Don't even hit the API if fields are empty
        if (!full_name || !currentCity) {
            return fail(400, { message: "All fields are required", full_name });
        }

        try {
            // Note the `$` added here
            const response = await fetch(`${PUBLIC_API_URL}/onboard`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ full_name, currentCity })
            });

            if (!response.ok) {
                const statusCode=response.status()
                const backendMessage=await response.text()
                let errorMessage = "Unknown Server Error";
                try {
                    const jsonResponse=JSON.parse(backendMessage)
                    errorMessage=jsonResponse.message||backendMessage
                } catch (error) {
                    errorMessage = rawResponse.substring(0, 200); 
                }
                console.error(`[BACKEND ERROR] Status: ${statusCode} | Message: ${errorMessage}`);
            }

            return {
                success: true,
                message: "Profile created successfully!"
            };

        } catch (err) {
            console.error("Fetch Error:", err);
            return fail(500, { message: "Could not connect to API server." });
        }
    }
};