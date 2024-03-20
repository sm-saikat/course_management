'use client';
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react"
import { toast } from "react-toastify";


const CreateAssignment = () => {
    const [error, setError] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    const params = useParams();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        setSubmitting(true);
        const reponse = await fetch('/api/assignments/create', {
            method: 'POST',
            body: formData
        })

        if(reponse.status === 200) {
            setSubmitting(false);
            toast.success('Assignment created successfully');
            router.push('/courses/' + params.courseId);
        }else{
            toast.error('Something went wrong');
            return;
        }
    }

    return (
        <div>
            <div className="w-full m-auto max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Create new assignment</h5>
                    <div>
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assignment title</label>
                        <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter course name" required />
                    </div>
                    <div>
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assignment description</label>
                        <textarea name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter syllabus details" rows="5" ></textarea>
                    </div>

                    <input type="hidden" name="courseId" value={params.courseId} />


                    {error && (
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {error}
                        </div>
                    )}

                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{submitting ? 'Creating...' : 'Create assignment'}</button>
                </form>
            </div>
        </div>
    )
}

export default CreateAssignment