import mongoose = require("mongoose");

const Admin = new mongoose.Schema({
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
    address: {
        type: String,
        required: true
    },
    proofOfOwnership: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File"
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization"
    }
},
    {
        timestamps: true
    });

export default mongoose.model("Admin", Admin);