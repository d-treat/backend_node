import mongoose = require("mongoose");
const Organization = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

export default mongoose.model("Organization", Organization);