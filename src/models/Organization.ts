import mongoose = require("mongoose");
const Organization = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }
});

export default mongoose.model("Organization", Organization);
