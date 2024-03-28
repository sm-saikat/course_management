import Course from "@/models/Course";
import { NextResponse } from "next/server";
import fs from "fs/promises";

export async function GET(req, query) {
	try {
		const { id } = query.params;

		const course = await Course.findById(id);

		return NextResponse.json({
			error: false,
			data: course,
		});
	} catch (e) {
		return NextResponse.json(
			{
				error: true,
				message: e.message,
			},
			{ status: 500 }
		);
	}
}

export async function PATCH(req, query) {
	try {
		const { id } = query.params;
		const formData = await req.formData();
		const {
			name,
			syllabus,
			details,
			thumbnail,
			videos,
			language,
			parts,
			duration,
		} = Object.fromEntries(formData);

		const updateObject = {
			name,
			syllabus,
			details,
			features: [language, parts, duration],
			videos: JSON.parse(videos),
		};

        console.log(thumbnail);

		const oldCourse = await Course.findById(id);

		if (thumbnail.size > 0) {
			const uploadDir = "public/uploads";

			// delete old thumbnail
			if (oldCourse.thumbnail) {
				fs.unlink(`${uploadDir}/${oldCourse.thumbnail}`);
			}

			const thumbnailName = `${Date.now()}-${thumbnail.name}`;
			const thumbnailPath = `${uploadDir}/${thumbnailName}`;
			const bytes = await thumbnail.arrayBuffer();
			const buffer = Buffer.from(bytes);
			await fs.writeFile(thumbnailPath, buffer);
			updateObject.thumbnail = thumbnailName;
		}

		await Course.findByIdAndUpdate(id, updateObject);

		return NextResponse.json({
			error: false,
			message: "Course updated successfully",
		});
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{
				error: true,
				message: e.message,
			},
			{ status: 500 }
		);
	}
}
