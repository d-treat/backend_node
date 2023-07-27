import mongoose  from "mongoose"
const chatSchema = new mongoose.Schema(
    {
        members:{
            type:Array,

        },

    },{
        timestamps:true,
    }
)

module.exports.ChatSchema = mongoose.model("chat",chatSchema)
