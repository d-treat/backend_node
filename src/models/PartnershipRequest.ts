import mongoose = require("mongoose");


const PartnershipRequest = new mongoose.Schema({
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
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }
});

export default mongoose.model("PartnershipRequest", PartnershipRequest);