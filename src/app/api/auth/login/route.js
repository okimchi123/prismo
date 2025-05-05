import connectDB from "@/lib/database";
import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req){
    try {
        await connectDB()

        const { email, password } = await req.json()

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({message:"Invalid Email"},{status:401})
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword){
            return NextResponse.json({message:"Incorrect Password"}, {status:401})
        }

        const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn:'7d'})

        const response = NextResponse.json({message:"Login Successful"})
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        })

        return response

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Server Error"}, {status:500})
    }
}