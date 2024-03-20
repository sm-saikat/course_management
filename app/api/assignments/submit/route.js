import { NextResponse } from "next/server";
import fs from "fs/promises";
import Assignment from "@/models/Assignment";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
	try {
		const formData = await req.formData();
		const { assignmentId, assignmentFile, note } =
			Object.fromEntries(formData);

        console.log(assignmentId, assignmentFile, note)

		const session = await getServerSession(authOptions);
		const user = session.user;

		// Save assignmentFile to uploads folder
		const uploadDir = "public/uploads";
		const fileName = `${Date.now()}-${assignmentFile.name}`;
		const filePath = `${uploadDir}/${fileName}`;

		const bytes = await assignmentFile.arrayBuffer();
		const buffer = Buffer.from(bytes);

		await fs.writeFile(filePath, buffer);

		// Save assignment to database
        const newSubmission = { student: user.id, file: fileName, note };
		const assignment = await Assignment.findById(assignmentId);
        assignment.submissions.push(newSubmission);
        await assignment.save();

		return NextResponse.json({
			error: false,
			message: "Assignment submitted successfully",
		});
	} catch (err) {
        console.log(err)
		return NextResponse.json({
			error: true,
			message: "Something went wrong",
		}, { status: 500});
	}
}
