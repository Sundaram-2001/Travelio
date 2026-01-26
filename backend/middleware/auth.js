import { NavigatorLockAcquireTimeoutError } from "@supabase/supabase-js"
import jwt from "jsonwebtoken"
import jwksClient from "jwks-rsa"


const client=jwksClient({
    jwksUri:"https://fhavkotpssawwpixnqhj.supabase.co/auth/v1/.well-known/jwks.json",
    cache:true,
    rateLimit:true
})

//fetches the public key
function getKey(header,callback){
    client.getSigningKey(header.kid,function(err,key){
        if(err || !key){
            console.error(err)
            return callback(err || new Error('Public key not found'))
        }
        const signingKey=key.getPublicKey()
        callback(null,signingKey)
    })
}

//verifying the jwt
export const verifyJWT=(req,res,next)=>{
    const authParam=req.headers.authorization
    const token=authParam.split(' ')[1]
    if (!token || token === "undefined" || token === "null" ) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token,getKey,{algorithms:['ES256']},(err,decoded)=>{
        if(err){
            console.error(err)
            return res.status(401).json({message:"Unauthorized!"})
        }
        req.userId = decoded.sub;
        console.log("SUCCESS: Decoded User ID is:", req.userId);
        next()
    })
}