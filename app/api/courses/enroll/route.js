import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		const { courseId, userId } = await req.json();
        
        // Enroll the user to the course
        const course = await Course.findById(courseId);
        course.enrolled.push(userId);
        await course.save();

        return NextResponse.json({
            success: true,
            message: "Enrolled successfully!",
        });
	} catch (e) {
		console.log(e);
		return NextResponse.json({
			error: true,
			message: "Something went wrong!",
		});
	}
}
