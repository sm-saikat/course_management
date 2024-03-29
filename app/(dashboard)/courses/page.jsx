'use client';

import CourseCard from "@/components/CourseCard";
import { PlusCircle } from "react-bootstrap-icons";
import {useSession} from "next-auth/react";
import { useEffect, useState } from "react";
import withSession from "@/components/HOC/withSession";

const Courses = () => {
    const [courses, setCourses] = useState(null);

    const { data: session, status } = useSession();
    console.log('Session', session);
    const user = session?.user;

    const fetchCourses = async () => {
        const response = await fetch('/api/courses/my-courses', {
            method: 'GET',
            credentials: 'include', 
        });
        
        if(response.status === 200) {
            const result = await response.json();
            console.log('Courses: ', result);
            setCourses(result.data);
        }
    }

    useEffect(()=> {
        fetchCourses();
    }, [])

    return (
        <div>
            <h3 className="text-xl font-medium">Our Courses</h3>
            <hr className="my-4" />

            <div className="courses grid grid-cols-3 gap-4">
                {courses?.map((course) => {
                    return <CourseCard key={course._id} course={course} author={user?.role === 'lecturer'} />;
                })}

                {
                    user?.role === 'lecturer' &&
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

export const dynamic = "force-dynamic";
export default withSession(Courses);