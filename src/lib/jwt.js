import { jwtVerify } from "jose";

export async function verifyToken(token) {
    if(!token) return null;
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const { payload } = await jwtVerify(token, secret)
        return payload;
    } catch (error) {
        console.error("JWT verification error:", error.message);
        return null
    }
}