// @ts-nocheck
import { fail, redirect } from "@sveltejs/kit";

export async function load({locals}){
    const {session}=await locals.safeGetSession();
    if(!session){
        throw redirect (302,"/auth")
    }
    return{}
}
export const actions={
    default:async({request,locals,fetch})=>{
        const {session}=await locals.safeGetSession()
        if(!session) throw redirect(302,"/auth")
        const formData=await request.formData()
        const full_name=formData.get("full_name")
        // const email=(await formData).get(email)
        const currentCity=(await formData).get("currentCity")
        try {
            const response=await fetch("http://host.docker.internal:3000/onboard",{
                method:"POST",
                headers:{
                    'Authorization':`Bearer ${session.access_token}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    full_name,currentCity
                })
            })
            if(!response.ok){
                const apiError=await response.json()
                return fail(response.status,{
                    message:apiError.message || "Server side error, try again!",
                    full_name
                })
            }
            return {
                success:true,
                message:"Profile created successfully, you will be redirected...."
            }
        } catch (err) {
            console.error("Fetch Error:", err); 
            return fail(500, { message: "Could not connect to API server." });
        }
    }
}