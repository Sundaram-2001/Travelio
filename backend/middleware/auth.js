import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const client = jwksClient({
    jwksUri: "https://fhavkotpssawwpixnqhj.supabase.co/auth/v1/.well-known/jwks.json",
    cache: true,
    rateLimit: true
});

function getKey(header, callback) {
    client.getSigningKey(header.kid, function(err, key) {
        if (err || !key) {
            return callback(err || new Error('Public key not found'));
        }
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
    });
}

export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.error("Auth Failure: No Bearer token");
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(' ')[1];

    
    jwt.verify(token, getKey, { algorithms: ['HS256'] }, (err, decoded) => {
        if (err) {
            console.error("JWT Verify Error:", err.message);
            return res.status(401).json({ message: "Unauthorized!" });
        }
        req.userId = decoded.sub;
        console.log("Verified User:", req.userId);
        next();
    });
};