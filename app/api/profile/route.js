import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/models/User";
import { NextResponse } from "next/server";


export async function PATCH(req){
    try{
        const session = await getServerSession(authOptions);
        const user = session.user;

        const formData = await req.formData();
        const data = Object.fromEntries(formData);

        const updatedUser = await User.findByIdAndUpdate(user.id, {
            ...data
        }, { new: true });

        return NextResponse.json({
            error: false,
            data: updatedUser
        });
    }catch(e){
        console.log(e);
        return NextResponse.json({
            error: true,
            message: e.message
        });
    }
}