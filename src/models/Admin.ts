import mongoose = require("mongoose");
import { hashPassword } from "../utils/bcrypt";
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
    },
    password: {
        type: String,
    }
},
    {
        timestamps: true
    }
);

Admin.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    if (this.password) {
        this.password = await hashPassword(this.password);
    }
    next();
});

export default mongoose.model("Admin", Admin);