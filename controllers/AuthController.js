import jwt from "jsonwebtoken";
import GroupChatModel from '../models/GroupChatSchema.js';



export const registerGroupChat = async (req, res) => {
  const groupChat = new GroupChatModel(req.body);
  const { groupName } = req.body;

  try {
    const oldGroup = await GroupChatModel.findOne({ groupName });

    if (oldGroup)
      return res.status(400).json({ message: "Group already exists" });

    const group = await groupChat.save();
    const token = jwt.sign(
      { groupName: group.groupName, id: group._id }, // Fix this line
      process.env.JWTKEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ group, token }); // Fix this line
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
