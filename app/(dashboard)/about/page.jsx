import Link from 'next/link'
import React from 'react'

const About = () => {
    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
            <section className="about p-8">
                <div className="row flex items-center">
                    <div className="image w-1/2">
                        <img src="images/AboutUs.jpg" alt="About Image" />
                    </div>
                    <div className="content w-1/2 ml-8">
                        <h3 className="text-3xl font-semibold mb-4  text-blue-500">
                            Why Choose Us?
                        </h3>
                        <p className="text-gray-700">
                            Our LMS is designed to provide a seamless and efficient online
                            learning experience for both educators and learners. With advanced
                            features and user-friendly interface, our platform aims to
                            revolutionize the way education is delivered and accessed.
                        </p>
                        <Link href={'/dashboard'} type="button" class="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center mt-6">Our courses</Link>
                    </div>
                </div>
                <div className="box-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <div className="box  p-6 rounded-lg shadow-md flex items-center">
                        <i className="fas fa-graduation-cap text-4xl text-blue-500" />
                        <div className="ml-4">
                            <h3 className="text-2xl font-semibold">+7k</h3>
                            <p className="text-gray-600">Online Courses</p>
                        </div>
                    </div>
                    <div className="box  p-6 rounded-lg shadow-md flex items-center">
                        <i className="fas fa-user-graduate text-4xl text-blue-500" />
                        <div className="ml-4">
                            <h3 className="text-2xl font-semibold">+23k</h3>
                            <p className="text-gray-600">Brilliant Students</p>
                        </div>
                    </div>
                    <div className="box  p-6 rounded-lg shadow-md flex items-center">
                        <i className="fas fa-chalkboard-user text-4xl text-blue-500" />
                        <div className="ml-4">
                            <h3 className="text-2xl font-semibold">+3k</h3>
                            <p className="text-gray-600">Expert Tutors</p>
                        </div>
                    </div>
                    <div className="box  p-6 rounded-lg shadow-md flex items-center">
                        <i className="fas fa-briefcase text-4xl text-blue-500" />
                        <div className="ml-4">
                            <h3 className="text-2xl font-semibold">100%</h3>
                            <p className="text-gray-600">Job Placement</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    )
}

export default About