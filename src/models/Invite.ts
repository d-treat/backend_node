import mongoose = require("mongoose");

const Invite = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    invitedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },
    organization:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization"
    }
}, {
    timestamps: true
});


export default mongoose.model("Invite", Invite);