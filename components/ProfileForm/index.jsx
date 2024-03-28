'use client';

import { useState } from "react";
import Link from "next/link";
import { PencilSquare } from "react-bootstrap-icons";
import { toast } from "react-toastify";

const ProfileForm = ({ data }) => {
    const [error, setError] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const [edit, setEdit] = useState(false)
    const [formData, setFormData] = useState(data)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        const formData = new FormData(e.target);
        const response = await fetch('/api/profile', {
            method: 'PATCH',
            body: formData
        });

        if(response.status === 200){
            const result = await response.json();
            if(result.error){
                setError(result.message);
                return;
            }

            setSubmitting(false);
            setEdit(false);
            setFormData(result.data);
            toast.success('Profile updated successfully');
        }
    }

    const handleEditClick = (e) => {
        e.preventDefault();
        setEdit(true);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">Profile details</h5>
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                {
                    edit ? (
                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={handleInputChange} value={formData?.name} required disabled={!edit} />
                    ) : (
                        <p className="font-medium">{formData?.name}</p>
                    )
                }
            </div>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                {
                    edit ? (
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={handleInputChange} value={formData?.email} required disabled={!edit} />
                    ) : (
                        <p className="font-medium">{formData?.email}</p>
                    )
                }
            </div>

            {error && (
                <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                >
                    {error}
                </div>
            )}

            {
                edit ? (
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{submitting ? 'Updating...' : 'Update profile'}</button>
                ) : (
                    <button onClick={handleEditClick} type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><PencilSquare /></button>
                )
            }
        </form>
    )
}

export default ProfileForm