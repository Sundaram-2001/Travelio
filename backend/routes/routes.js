import express from "express";
import { verifyJWT } from "../middleware/auth.js";
import { createClient } from "@supabase/supabase-js";
// createTrip
// import { configDotenv } from "dotenv";
import * as dotenv from "dotenv"
import { fetchWeather } from "../weatherfetch/fetchWeather.js";
import { supabaseAdmin } from "../db/db.js";
import { createTrip } from "../controller/trip.controller.js";
dotenv.config();
// configDotenv.config
const router = express.Router();
// const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

router.get("/",(req,res)=>{
    res.send("it works from docker too!")
})
router.post("/onboard", verifyJWT, async (req, res) => {
    try {
        
        const userID = req.userId; 
        const { full_name, currentCity } = req.body;

        const { error: dbError } = await supabaseAdmin
            .from("users")
            .insert({
                //column name:variable name
                id: userID,
                full_name,
                current_city: currentCity
            });

        if (dbError) throw dbError;
        console.error(dbError)
        return res.status(200).json({ success: true });
    } catch (err) {
        console.error("Database Error:", err.message);
        return res.status(400).json({ 
            success: false,
            message: err.message || "Failed to save profile to database" 
        });
    }
});

router.post("/createTrip",createTrip)

export default router;