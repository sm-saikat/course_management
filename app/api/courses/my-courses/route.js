import Course from "@/models/Course";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function GET(req){
    try{
        const session = await getServerSession(authOptions);
        const user = session.user;

        let courses = [];
        
        if(user.role === 'lecturer'){
            courses = await Course.find({author: user.id});
        }else if(user.role === 'student'){
            courses = await Course.find({enrolled: {$in: [user.id]}});
        }

        return NextResponse.json({
            error: false,
            data: courses
        })
    }catch(err){
        console.log(err.message);
        return NextResponse.json({
            error: true,
            message: "Something went wrong"
        })
    }
}