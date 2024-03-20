import Assignment from "@/models/Assignment";
import { NextResponse } from "next/server";


export async function POST(req){
    try{
        const formData = await req.formData();
        const { courseId, title, description } = Object.fromEntries(formData);

        const assignment = await new Assignment({
            course: courseId,
            title,
            description
        }).save();

        return NextResponse.json({
            error: false,
            message: 'Assignment created successfully'
        })
    }catch(e){
        console.error(e);
        return NextResponse.error({
            error: true,
            message: 'Something went wrong'
        })
    }
}