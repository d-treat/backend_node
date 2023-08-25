import mongoose = require('mongoose');

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
    }
},

    {
        timestamps: true
    });


export default mongoose.model("Doctor", Doctor);