// @ts-nocheck
import { redirect, fail } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const { session } = await locals.safeGetSession();
    
    
    if (!session) {
        throw redirect(303, "/auth");
    }
    
    return {
        user: session.user
    };
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
            
            const response = await fetch('http://host.docker.internal:3000/createTrip', {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${session.access_token}`, 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (!response.ok) {
                return fail(response.status, {
                    message: result.message || "Backend failed to process trip"
                });
            }

            
            return {
                success: true,
                message: "Trip created successfully, you will be redirected...",
                tripID: result.tripID 
            };
            
        } catch (err) {
            console.error("Critical API Error:", err);
            return fail(500, { message: "Connection to backend API failed" });
        }
    }
};