'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SubmitAssignment = ({ searchParams, params }) => {
    const [error, setError] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const [assignment, setAssignment] = useState({})

    const { courseId } = searchParams;
    const { id } = params;

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        setSubmitting(true);
        const reponse = await fetch('/api/assignments/submit', {
            method: 'POST',
            body: formData
        })

        if (reponse.status === 200) {
            setSubmitting(false);
            toast.success('Assignment submitted successfully');
            router.push('/courses/' + courseId);
        } else {
            toast.error('Something went wrong');
            return;
        }
    }

    useEffect(()=> {
        const fetchAssignment = async () => {
            const response = await fetch(`/api/assignments/${id}`);
            const result = await response.json();
            setAssignment(result.data);
        }
        fetchAssignment();
    }, [])

    return (
        <div className='w-full pt-10 flex gap-2'>
            <div className="w-1/2">
                <h1 className="text-2xl font-medium">{assignment?.title}</h1>
                <p className="pt-2">{assignment?.description}</p>
            </div>

            <div className="m-auto w-1/2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Submit Assignment</h5>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="assignment_file">Upload assignment file</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="assignment_file" name="assignmentFile" type="file" />
                    </div>
                    <div>
                        <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note</label>
                        <textarea name="note" id="note" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" rows="5" placeholder="Write note"></textarea>
                    </div>

                    <input type="hidden" name="assignmentId" value={id} />

                    {error && (
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {error}
                        </div>
                    )}

                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{submitting ? 'Submitting...' : 'Submit assignment'}</button>
                </form>
            </div>
        </div>
    )
}

export default SubmitAssignment