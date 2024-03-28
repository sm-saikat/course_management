'use client';

import Link from "next/link"
import { useRouter } from "next/navigation";
import { BookFill, ClockFill, CodeSlash } from "react-bootstrap-icons"
import { PencilSquare, Trash } from "react-bootstrap-icons/dist";
import { toast } from "react-toastify";

const CourseCard = ({ course, author }) => {
    const router = useRouter();

    const handleDelete = async(e)=>{
        const id = e.target.dataset.id;
        console.log(id);
        const response = await fetch(`/api/courses/delete`, {
            method: "POST",
            body: JSON.stringify({id}),
        });
        
        if(response.status == 200){
            const result = await response.json();
            if(result.error){
                toast.error(result.message);
                return;
            }

            toast.success("Course deleted successfully!");
            router.refresh();
        }else{
            console.log(response);
            toast.error("An error occurred while deleting course!");
        }
    }

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img
                    className="rounded-t-lg w-full h-[200px] object-cover"
                    src={`/uploads/${course.thumbnail}`}
                    alt={course.name}
                />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {course.name}
                    </h5>
                </a>
                <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    <p className="font-medium flex dark:text-gray-400 items-center gap-2"><ClockFill className="text-secondary" /> {course.features[0]}</p>
                    <p className="font-medium flex dark:text-gray-400 items-center gap-2"><BookFill className="text-secondary" /> {course.features[1]}</p>
                    <p className="font-medium flex dark:text-gray-400 items-center gap-2"><CodeSlash className="text-secondary" /> {course.features[2]}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <Link
                        href={`/courses/${course._id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        View course
                        <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </Link>
                    {
                        author && (
                            <div className="flex gap-2 items-center">
                                <button data-id={course._id} onClick={handleDelete} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><Trash /></button>

                                <Link href={`/courses/${course._id}/edit`} type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"><PencilSquare /></Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CourseCard