// @ts-nocheck
/** @type {import('./$types').LayoutServerLoad} */
export async function load({locals,cookies}){
    const {session,user}=await locals.safeGetSession();
    return{
        session,user,
        cookies:cookies.getAll()
    }
}