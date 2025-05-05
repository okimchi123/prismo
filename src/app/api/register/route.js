import connectDB from "@/lib/database";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function POST(req){
    try {
        await connectDB()

        const {firstname, lastname, email, password} = await req.json()

        const existingEmail = await User.findOne({email})
        if(existingEmail){
            return NextResponse.json({message:"Email is already used"}, {status:400})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User(
            {
            firstname, 
            lastname, 
            email, 
            password: hashedPassword,
        })

        await newUser.save()

        return NextResponse.json(newUser, {status:201})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Server Error"}, {status: 500})
    }
}