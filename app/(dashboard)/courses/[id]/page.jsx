import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AssignmentCard from '@/components/AssignmentCard';
import EnrollButton from '@/components/EnrollButton';
import Assignment from '@/models/Assignment';
import Course from '@/models/Course'
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { ArrowRight } from 'react-bootstrap-icons';

const CourseDetails = async ({ params }) => {
    const { id } = params;
    const session = await getServerSession(authOptions);
    const user = session.user;

    const course = await Course.findById(id);
    const assignments = await Assignment.find({ course: course._id }).populate('course');
    // console.log('From course details page', assignments)

    return (
        <div>
            <div>
                <h3 className="text-xl font-medium dark:text-gray-200">Course details</h3>
                <hr className="my-4" />

                <div className='flex max-sm:flex-col gap-6'>
                    <div className='w-1/2 max-sm:w-full'>
                        <img className='rounded-md w-full' src={`${process.env.HOST}/uploads/${course.thumbnail}`} alt="" />
                    </div>
                    <div className='w-1/2 max-sm:w-full'>
                        <h3 className='text-2xl font-medium dark:text-gray-200'>{course.name}</h3>
                        <p className='mt-4 dark:text-gray-400'>
                            {course.details}
                        </p>

                        <div className='mt-4'>
                            <Accordion>
                                <AccordionPanel>
                                    <AccordionTitle className='p-4'>See course syllabus</AccordionTitle>
                                    <AccordionContent>
                                        <p className="mb-2 py-4 text-gray-500 dark:text-gray-400">
                                            {course.syllabus}
                                        </p>
                                    </AccordionContent>
                                </AccordionPanel>
                            </Accordion>
                        </div>

                        <div className='mt-4'>
                            {
                                user.role === 'student' && (
                                    course.enrolled.includes(user.id) ? (

                                        <button type="button" className="text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled>Enrolled</button>

                                    ) : (
                                        <EnrollButton courseId={id} userId={user.id} />
                                    )
                                )
                            }
                        </div>
                        <div className='mt-4'>
                            <Link href={`/chat/${id}`} type="button" class="flex items-center justify-center gap-2 w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Go to course chat <ArrowRight /></Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='py-10'>
                <h3 className="text-xl font-medium dark:text-gray-200">Course Videos</h3>
                <hr className="my-4" />

                <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-4">
                    {course.videos.map((video, index) => {
                        return (
                            <div key={index} className="max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center">
                                <iframe width="100%" height="200" src={video.replace('youtu.be', 'www.youtube.com/embed')} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className='py-10'>
                <div className='flex gap-2 items-center'>
                    <h3 className="text-xl font-medium dark:text-gray-200">Course Assignments</h3>
                    {
                        user.role === 'lecturer' && (
                            <Link href={'/assignments/create/' + id} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create new</Link>
                        )
                    }
                </div>
                <hr className="my-4" />

                <div>
                    {assignments && assignments.map((assignment) => {
                        return (
                            <AssignmentCard
                                key={assignment.id}
                                assignment={assignment}
                                student={user.role === 'student'}
                            />
                        );
                    })}
                </div>
            </div>

        </div>
    )
}

export default CourseDetails