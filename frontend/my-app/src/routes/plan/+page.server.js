// @ts-nocheck
import { redirect, fail } from "@sveltejs/kit"; 
import { env } from '$env/dynamic/public';

const PUBLIC_API_URL = env.PUBLIC_API_URL;

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const { session } = await locals.safeGetSession();
    if (!session) throw redirect(303, "/auth");
    return { user: session.user };
}

/** @type {import('./$types').Actions} */
export const actions = {
    createTrip: async ({ request, locals, fetch }) => {
        const { session } = await locals.safeGetSession();
        if (!session) throw redirect(303, "/auth");

        const formData = await request.formData();
        
        const payload = {
            source: formData.get('origin'),           
            destination: formData.get('destination'), 
            start_date: formData.get('start_date'),   
            return_date: formData.get('start_date'),  
            number_of_days: parseInt(formData.get('days') || '1'),
            user_id: session.user.id,
            mode: formData.get('mode') || 'Other',
            transport_details: formData.get('flight_no') || 'Not Specified', 
            pnr: formData.get('pnr') || 'N/A',
            additional_info: "Generated via Travelio Web"
        };

        if (!payload.source || !payload.destination || !payload.start_date) {
            return fail(400, { message: "Missing required trip details" });
        }

        try {
            const response = await fetch(`${PUBLIC_API_URL}/createTrip`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const responseText = await response.text();
            let result;

            try {
                result = JSON.parse(responseText);
            } catch (e) {
                console.error(`Infrastructure Error (${response.status}):`, responseText.substring(0, 200));
                return fail(response.status, {
                    message: `API Error ${response.status}: Server returned invalid response`
                });
            }

            if (!response.ok) {
                console.error(`Backend logic error (${response.status}):`, result);
                return fail(response.status, {
                    message: result.message || "Something went wrong, contact support"
                });
            }

            return {
                success: true,
                message: "Trip created successfully!",
                tripID: result.tripID
            };
        } catch (err) {
            console.error("Critical API Error:", err);
            return fail(500, { message: "Connection to backend API failed" });
        }
    }
};