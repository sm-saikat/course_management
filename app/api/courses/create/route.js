import { NextResponse } from "next/server";
import fs from "fs/promises";
import Course from "@/models/Course";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
	try {
		const formData = await req.formData();
		const { name, syllabus, details, thumbnail, videos, language, parts, duration } =
			Object.fromEntries(formData);

        console.log(Object.fromEntries(formData));

		// Save thumbnail to uploads folder
        let thumbnailName = "";
		if (thumbnail) {
			const uploadDir = "public/uploads";
			thumbnailName = `${Date.now()}-${thumbnail.name}`;
			const thumbnailPath = `${uploadDir}/${thumbnailName}`;

            const bytes = await thumbnail.arrayBuffer();
            const buffer = Buffer.from(bytes);

			await fs.writeFile(thumbnailPath, buffer);
		}

        // Save course to database
        const session = await getServerSession(authOptions);
        const user = session.user;
        console.log(user);

        const course = new Course({
            name,
            syllabus,
            details,
            features: [duration, parts, language],
            thumbnail: thumbnailName,
            videos: JSON.parse(videos),
            author: user.id
        });

        await course.save();

		return NextResponse.json({
			error: false,
			message: "Course created successfully",
		});
	} catch (err) {
		console.log(err);
		return NextResponse.json({
			error: true,
			message: "Something went wrong",
		});
	}
}
