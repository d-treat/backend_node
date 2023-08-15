import GroupChatModel from '../models/GroupChatSchema.js';

import jwt from 'jsonwebtoken';
// Get a User
export const getGroup = async (req, res) => {
  const id = req.params.id;

  try {
    const group = await GroupChatModel.findById(id);
    if (group) {
      const { groupName, ...otherDetails } = group._doc;

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such group");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all users
export const getAllGroups = async (req, res) => {

  try {
    let groups = await GroupChatModel.find();
    groups = groups.map((group)=>{
      const {groupName, ...otherDetails} = group._doc
      return otherDetails
    })
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json(error);
  }
};

// udpate a user

export const updateGroup = async (req, res) => {
  const id = req.params.id;
  // console.log("Data Received", req.body)
  const { _id, groupName } = req.body;
  
  if (id === _id) {
    try {
      // if we also have to update password then password will be bcrypted again
     
      // have to change this
      const group = await GroupChatModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        { groupName: group.groupName, id: group._id },
        process.env.JWTKEY,
        { expiresIn: "1h" }
      );
      console.log({group, token})
      res.status(200).json({group, token});
    } catch (error) {
      console.log("Error agya hy")
      res.status(500).json(error);
    }
  } else {
    res
      .status(403)
      .json("Access Denied! You can update only your own Account.");
  }
};





