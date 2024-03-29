import Course from "@/models/Course";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req, res){
    try{
        console.log('Getting courses...');
        const session = await getServerSession(authOptions);
        const user = session.user;
        
        let courses = null;

        if(user.role === 'lecturer'){
            courses = await Course.find({author: user.id});
        }else if(user.role === 'student'){
            // find all course where user id is inside enrolled array
            // courses = await Course.find({enrolled: {$in: [user.id]}});
            courses = await Course.find({});
        }

        return NextResponse.json({
            error: false,
            data: courses
        })
    }catch(err){
        console.log(err);
        return NextResponse.json({
            error: true,
            message: "Something went wrong",
            serverMessage: err.message
        })
    }
}