
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CourseCard from "@/components/CourseCard";
import Course from "@/models/Course";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { PlusCircle } from "react-bootstrap-icons";

const Courses = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    const nextHeaders = headers();

    const response = await fetch(`${process.env.API_BASE_URL}/courses/my-courses`, {
        method: 'GET',
        headers: {
            cookie: nextHeaders.get('cookie')
        } 
    });
    const result = await response.json();
    const courses = result.data;

    return (
        <div>
            <h3 className="text-xl font-medium">Our Courses</h3>
            <hr className="my-4" />

            <div className="courses grid grid-cols-3 gap-4">
                {courses?.map((course) => {
                    return <CourseCard key={course._id} course={course} author={user.role === 'lecturer'} />;
                })}

                {
                    user.role === 'lecturer' &&
                    <div className="max-w-sm p-10 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center">
                        <PlusCircle className="mb-2 text-primary cursor-pointer" size={50} />
                        <p className="text-gray-700 font-medium dark:text-gray-400">
                            Create New
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Courses