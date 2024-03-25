import Message from "@/models/Message";
import { NextResponse } from "next/server";


export async function POST(req){
    try{
        const data = await req.json();
        console.log(data);

        // Save to database
        const message = new Message({
            courseId: data.courseId,
            sender: {
                name: data.user.name,
                email: data.user.email
            },
            message: data.message
        });

        const newMessage = await message.save();

        return NextResponse.json({
            error: false,
            data: newMessage
        }, {status: 201});
    }catch(e){
        return NextResponse.json({
            error: true,
            message: e.message
        }, {status: 500});
    }
}


export async function GET(req){
    try{
       const courseId = req.nextUrl.searchParams.get('courseId');

       const messages = await Message.find({courseId});
        
        return NextResponse.json({
            error: false,
            data: messages
        });
    }catch(e){
        return NextResponse.json({
            error: true,
            message: e.message
        }, {status: 500});
    }
}