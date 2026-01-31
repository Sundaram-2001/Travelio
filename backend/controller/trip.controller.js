import { supabaseAdmin } from "../db/db.js";

export const createTrip = async (req, res) => {
    console.log("CreateTrip Request Received");
    try {
        const user_id = req.userId; // Secure: taken from verified JWT
        const { 
            source, destination, start_date, return_date, 
            number_of_days, mode, transport_details, pnr, additional_info 
        } = req.body;

        const { data: tripID, error } = await supabaseAdmin.rpc('create_new_trip', {
            p_source: source,
            p_destination: destination,
            p_start_date: start_date,
            p_return_date: return_date,
            p_number_of_days: number_of_days,
            p_user_id: user_id, // Use secure ID
            p_mode: mode,
            p_transport_details: transport_details,
            p_pnr: pnr,
            p_additional_info: additional_info
        });

        if (error) {
            console.error('RPC Error:', error.message);
            return res.status(500).json({ message: error.message });
        }

        return res.status(201).json({ success: true, tripID });
    } catch (error) {
        console.error('Server Crash:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};