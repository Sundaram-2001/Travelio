import { supabaseAdmin } from "../db/db.js";
export const createTrip=async(req,res)=>{
    try {
        const { 
            source, destination, start_date, return_date, 
            number_of_days, user_id, mode, transport_details, 
            pnr, additional_info 
        } = req.body;
        const { data: tripID, error } = await supabaseAdmin.rpc('create_new_trip', {
            p_source: source,
            p_destination: destination,
            p_start_date: start_date,
            p_return_date: return_date,
            p_number_of_days: number_of_days,
            p_user_id: user_id,
            p_mode: mode,
            p_transport_details: transport_details,
            p_pnr: pnr,
            p_additional_info: additional_info
        });
        if (error) {
            console.error('Database RPC Error:', error.message);
            return res.status(500).json({ message: 'Database transaction failed', error: error.message });
        }
        return res.status(201).json({ 
            success: true, 
            tripID: tripID 
        });
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    }
