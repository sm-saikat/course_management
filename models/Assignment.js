import mongoose from "mongoose";


const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    submissions: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        file: {
            type: String,
            required: true
        },
        note: {
            type: String,
        }
    }]
}, {
    timestamps: true
})

export default mongoose.models.Assignment || mongoose.model('Assignment', assignmentSchema);