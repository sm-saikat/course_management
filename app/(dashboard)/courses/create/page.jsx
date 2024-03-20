'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { PlusCircle } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';

const CreateCourse = () => {
    const [error, setError] = useState(null);
    const [videoInputs, setVideoInputs] = useState([""]);
    const [submitting, setSubmitting] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        formData.append('videos', JSON.stringify(videoInputs));
        
        setSubmitting(true);
        const reponse = await fetch('/api/courses/create', {
            method: 'POST',
            body: formData
        })

        if(reponse.status === 200) {
            setSubmitting(false);
            toast.success('Course created successfully');
            router.push('/courses');
        }else{
            setError('Something went wrong');
            return;
        }
    }

    const handleAddVideoInput = ()=> {
        setVideoInputs([...videoInputs, ""]);
    }

    const handleRemoveVideoInput = (e) => {
        const index = e.currentTarget.dataset.index;
        const newInputs = videoInputs.filter((input, i) => i != index)
        setVideoInputs(newInputs);
    }

    const handleVideoInputChange = (e) => {
        const index = e.currentTarget.dataset.index;
        const newInputs = videoInputs.map((input, i) => {
            if(i == index) {
                return e.currentTarget.value;
            }
            return input;
        })
        setVideoInputs(newInputs);
    }

    return (
        <div>
            <div className="w-full m-auto max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Create new course</h5>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course name</label>
                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter course name" required />
                    </div>
                    <div>
                        <label htmlFor="syllabus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course syllabus</label>
                        <textarea name="syllabus" id="syllabus" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter syllabus details" rows="5" required></textarea>
                    </div>
                    <div>
                        <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About the course</label>
                        <textarea name="details" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter course details" rows="5" required></textarea>
                    </div>
                    <div className='grid md:grid-cols-3 gap-2'>
                    <div>
                        <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Duration</label>
                        <input name="duration" id="duration" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="eg. 7:14:30 minutes" required />
                    </div>
                    <div>
                        <label htmlFor="parts" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">How many parts?</label>
                        <input type='number' name="parts" id="parts" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="eg. 4" required />
                    </div>
                    <div>
                        <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Programming Lanugage</label>
                        <input name="language" id="language" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="eg. Javascript" required />
                    </div>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="thumbnail">Selece course thumbnail</label>
                        <input name='thumbnail' id="thumbnail" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" required />
                    </div>

                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course name</label>
                        <div >
                            {
                                videoInputs.map((input, index) => {
                                    return (
                                        <div className='flex items-center' key={index}>
                                            <input data-index={index} type="text" name="videos" id={`video-${index}`} className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter course name" value={input} onChange={handleVideoInputChange} required />
                                            {index > 0 && <button data-index={index} onClick={handleRemoveVideoInput} type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 ms-1 dark:focus:ring-yellow-900">Remove</button>}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <button onClick={handleAddVideoInput} type="button" className="flex gap-2 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add another <PlusCircle /></button>
                    </div>

                    {error && (
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {error}
                        </div>
                    )}

                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{ submitting ? 'Creating...' : 'Create course' }</button>
                </form>
            </div>
        </div>
    )
}

export default CreateCourse