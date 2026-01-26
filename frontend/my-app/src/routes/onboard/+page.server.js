// @ts-nocheck
import { fail, redirect } from "@sveltejs/kit";
import { PUBLIC_SITE_URL } from "$env/static/public";

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
            const response = await fetch(`${PUBLIC_SITE_URL}/onboard`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ full_name, currentCity })
            });

            if (!response.ok) {
                // Safely handle cases where the API might not return JSON
                const apiError = await response.json().catch(() => ({}));
                return fail(response.status, {
                    message: apiError.message || "Server side error, try again!",
                    full_name
                });
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