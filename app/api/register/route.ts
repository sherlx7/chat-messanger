import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

//handles HTTP POST requests (aka create a user)
export async function POST(
    request: Request
) {
    try {
        const body = await request.json();
        const {
            email,
            name,
            password
        } = body;

        if (!email || !name || !password) {
            return new NextResponse('Missing Info', { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        })
        //calls json method of NextResponse class,which takes in a 'body' of 
        //type 'JsonBody'.It returns NextResponse object with the specified JSON body,
        //whhich is a HTTP response
        return NextResponse.json(user)
    } catch (error: any) {
        console.log(error, 'REGISTRATION_ERROR');
        //calls the constructor of NextResponse class
        //initializes it with body and parameters (e.g status code)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
