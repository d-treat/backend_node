const {db} = require('../utils/database')
const {Contact} = require("../models/ContactSchema")
const {validateContact} = require("../models/ContactSchema")


module.exports.createContact = async(req,res) => {
 
  
    try {
      const { error } = validateContact(req.body);
      if (error) {
        throw new Error(error.details[0].message);
      }

       const contact = new Contact({
          firstName: req.body.firstName,
          lastName:req.body.lastName,
          email:req.body.email,
          phoneNumber: req.body.phoneNumber,
          message: req.body.message,
         
        });
  
        await contact.save();
        res.send(contact).status(201);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    };
  
  
module.exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.status(200).send(contact);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
  
  
  module.exports.getAllContact = async(req,res) => {
    try {
      const contact = await Contact.find();
      return res.status(200).send(contact);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
  };
  
  module.exports.updateContact= async(req,res) => {
    try {
      const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!contact) {
        return res.status(404).send("contact not found");
      }
      return res.send("contact updated").status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  };
  
  module.exports.deleteContact = async(req,res) => {
    try {
      const contact = await Contact.findByIdAndDelete(req.params.id);
      if (!contact) {
        return res.status(404).send("contact not found");
      }
      return res.send("contact deleted").status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  };
  