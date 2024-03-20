import Assignment from "@/models/Assignment";



const AssignmentDetails = async ({params}) => {
    const { id } = params;

    const assignment = await Assignment.findById(id).populate('course').populate('submissions.student');
    console.log(assignment);

    return (
        <div>
            <h1 className="text-2xl font-medium">{assignment.title}</h1>
            <p className="pt-4">{assignment.description}</p>

            <div className="py-10">
                <h2 className="text-xl font-medium">Submissions</h2>
                <div className="mt-4">
                    {assignment.submissions.map(submission => (
                        <div key={submission._id} className="flex items-center justify-between py-2 px-4 bg-gray-100 rounded-lg mt-2">
                            <div>
                                <p className="text-lg font-medium">{submission.student.name}</p>
                                <p className="text-sm">{submission.student.email}</p>
                                <p className="text-sm">Note: {submission.note}</p>
                            </div>
                            <a href={process.env.HOST + '/uploads/' + submission.file} target="_blank" className="text-blue-500">Download</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AssignmentDetails