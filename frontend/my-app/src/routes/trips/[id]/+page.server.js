// @ts-nocheck
import { redirect,error } from '@sveltejs/kit'
// @ts-nocheck
export async function load({locals,params}){
    // const{supaba}=locals.supaba
    const {session}=await locals.safeGetSession()
    if(!session){
        throw redirect(303,"/auth")
    }
    const {id}=params;
    const {data:trip,error:dbError}=await locals.supabase
    .from('trips')
    .select(`
        *,transport:transport!tripid(*)
        `)
        .eq('trip_id',id)
        .single()
        if(dbError || !trip){
            throw error(404,{message:"Could not find the trip!"})
        }
        return {trip}
    }
