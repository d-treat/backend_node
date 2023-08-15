import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    members: {
      type: [{ type: String }],
      default: [], // Set a default empty array for members
    },
  },
  {
    timestamps: true,
  }
);

const ChatModel = mongoose.model("Chat", ChatSchema);
export default ChatModel;
