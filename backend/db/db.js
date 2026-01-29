import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv"

dotenv.config()

    const supabase_url=process.env.SUPABASE_URL
    const service_key=process.env.SUPABASE_SERVICE_ROLE_KEY

    export const supabaseAdmin=createClient(supabase_url,service_key)   