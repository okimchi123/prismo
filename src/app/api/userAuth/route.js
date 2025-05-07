import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function GET(params){
    const token = (await cookies()).get('token')?.value;
    const user = await verifyToken(token)
    if(!user){
        return NextResponse.json({message:'Unauthorized'}, {status: 401})
    }

    return NextResponse.json({message: 'Authorized access', user})
}   