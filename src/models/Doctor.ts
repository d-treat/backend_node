import mongoose = require('mongoose');
import { hashPassword } from '../utils/bcrypt';

const Doctor = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization"
    },
    bio: {
        type: String,
        default: "No Bio Yet!"
    },
    cv: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File"
    },
    specialization: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    password: {
        type: String,
        required: true
    },
},

    {
        timestamps: true
    }
);


Doctor.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await hashPassword(this.password);
    next();
});

export default mongoose.model("Doctor", Doctor);