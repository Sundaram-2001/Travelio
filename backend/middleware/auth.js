import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const client = jwksClient({
    // Your specific project URL
    jwksUri: "https://fhavkotpssawwpixnqhj.supabase.co/auth/v1/.well-known/jwks.json",
    cache: true,
    rateLimit: true
});

function getKey(header, callback) {
    client.getSigningKey(header.kid, function(err, key) {
        if (err || !key) {
            console.error("JWKS Key Retrieval Error:", err);
            return callback(err || new Error('Public key not found'));
        }
        // For ES256, getPublicKey() is the correct method
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
    });
}

export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Safety check to prevent .split() crash
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(' ')[1];

    // CRITICAL: Must match the "alg": "ES256" from your jwt.io check
    jwt.verify(token, getKey, { algorithms: ['ES256'] }, (err, decoded) => {
        if (err) {
            console.error("JWT Verification Error:", err.message);
            return res.status(401).json({ message: `Unauthorized: ${err.message}` });
        }
        
        req.userId = decoded.sub;
        console.log("Success! Authenticated User:", req.userId);
        next();
    });
};