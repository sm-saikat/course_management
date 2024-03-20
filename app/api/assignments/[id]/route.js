import Assignment from "@/models/Assignment";
import { NextResponse } from "next/server";


export async function GET(req, query) {
    try{
        const {id} = query.params;

        const assignment = await Assignment.findById(id);

        return NextResponse.json({
            error: false,
            data: assignment
        })
    }catch(err){
        console.log(err)
        return NextResponse.json({
            error: true,
            message: "Something went wrong"
        }, { status: 500});
    }
}