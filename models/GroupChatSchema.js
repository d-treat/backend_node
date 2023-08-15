import mongoose from "mongoose";

const groupChatSchema = mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
    },
   
   
   
  },
  { timestamps: true }
);

const GroupChatModel = mongoose.model("Groups", groupChatSchema);
export default GroupChatModel;
