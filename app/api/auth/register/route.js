import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import fs from "fs";

const { NextResponse } = require("next/server");


export async function POST(req){
    const formData = await req.formData();
    
    try{
        await connectDB();

        const { name, email, password, role } = Object.fromEntries(formData);

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return NextResponse.json({
                error: true,
                message: "User already exists"
            }, {
                status: 400
            })
        }

        // Upload profile picture to /public/uploads directory
        const profile_img = formData.get('profile_img');
        const profileImgName = `${Date.now()}-${profile_img.name}`;
        const profile_img_path = `${process.cwd()}/public/uploads/${profileImgName}`;
        
        console.log(profile_img, profile_img_path);
        // upload the file
        const profileImgBytes = await profile_img.arrayBuffer();
        const profileImgBuffer = Buffer.from(profileImgBytes);
        fs.writeFileSync(profile_img_path, profileImgBuffer);

        // Save user to database
        const user = new User({
            name,
            email,
            password,
            role,
            profile_img: profileImgName
        });

        await user.save();

        return NextResponse.json({
            error: false,
            message: "User registered successfully"
        })

    }catch(error){
        console.log(error);
        return NextResponse.json({
            error: true,
            message: "Something went wrong"
        }, {
            status: 500
        })
    }
}