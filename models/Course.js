
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    syllabus: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    features: {
        type: [String],
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    videos: {
        type: [String],
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    enrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course;