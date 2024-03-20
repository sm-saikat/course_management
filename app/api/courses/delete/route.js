import Course from "@/models/Course";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import fs from "fs/promises";


export async function POST(req){
    const {id} = await req.json();

    console.log(`Deleting course with id: ${id}`);

    try{
        const session = await getServerSession(authOptions);
        const user = session.user;

        const course = await Course.findById(id);

        if(!course){
            return NextResponse.json({
                error: true,
                message: "Course not found!"
            })
        }

        if(course.author != user.id){
            return NextResponse.json({
                error: true,
                message: "You are not authorized to delete this course!"
            })
        }

        // Delete course thumbnail
        await fs.unlink(`public/uploads/${course.thumbnail}`);

        await Course.findByIdAndDelete(id);
        console.log(`Course deleted successfully!`);

        return NextResponse.json({
            error: false,
            message: "Course deleted successfully!"
        })

    }catch(e){
        console.error(e);
        return NextResponse.json({
            error: true,
            message: "An error occurred while deleting course!"
        })
    }

    
}