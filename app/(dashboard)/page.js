import AssignmentCard from "@/components/AssignmentCard";
import CourseCard from "@/components/CourseCard";
import { getServerSession } from "next-auth";
import {PlusCircle } from "react-bootstrap-icons";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
	const response = await fetch(`${process.env.API_BASE_URL}/courses`, {
		method: "GET",
		headers: headers(),
        cache: "no-store"
	});
	const result = await response.json();
	const courses = result.data;


	const session = await getServerSession(authOptions);
    const user = session.user;

	return (
		<div>
			<h3 className="text-xl font-medium">All Courses</h3>
			<hr className="my-4" />

			<div className="courses grid grid-cols-3 gap-4">
				{courses.map((course) => {
					return <CourseCard key={course.id} course={course} />;
				})}

				
				{
                    user.role === "lecturer" && (
                        <div className="max-w-sm p-10 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center">
						<Link href="/courses/create"><PlusCircle className="mb-2 text-primary" size={50} /></Link>
						<p className="text-gray-700 font-medium dark:text-gray-400">
							Create New
						</p>
					</div>
                    )
                }
				
			</div>

		</div>
	);
}
