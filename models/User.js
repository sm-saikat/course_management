import mongoose from "mongoose";


const useSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    profile_img: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'lecturer'],
    },
});

const User =  mongoose.models.User || mongoose.model('User', useSchema);

export default User;