'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const EnrollButton = ({courseId, userId}) => {
    const [submitting, setSubmitting] = useState(false);

    const router = useRouter();

    const handleEnroll = async(e)=>{
        setSubmitting(true);
        const response = await fetch('/api/courses/enroll', {
            method: 'POST',
            body: JSON.stringify({courseId, userId}),
        })

        setSubmitting(false);
        if(response.status === 200){
            toast.success('Enrolled successfully!')
            router.refresh('/courses/', + courseId)
        }else{
            toast.error('Something went wrong!')
        }
    }

  return (
    <>
        <button data-courseId={courseId} onClick={handleEnroll} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{ submitting ? 'Enrolling...' : 'Enroll now'}</button>
    </>
  )
}

export default EnrollButton