const {db} = require('../utils/database')
const {Contact} = require("../models/contactSchema")
const {validateContact} = require("../models/contactSchema")


module.exports.createContact = () => {
    return async (req, res, next) => {
  
      const {error} = validateContact(req.body)
      if(error) return res.send(error.details[0].message)
    try {
       const contact = new Contact({
          firstName: req.body.firstName,
          lastName:req.body.lastName,
          email:req.body.email,
          phoneNumber: req.body.phoneNumber,
          message: req.body.message,
         
        });
  
        await contact.save();
        res.send(contact).status(201);
      } catch (error) {
        console.error(error);
      }
    };
  };
  module.exports.getContacttById = () => {
    return async (req, res) => {
      console.log(req.params);
      try {
        const contact = await Contact.findById(req.params._id);
        res.status(200).send(contact);
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  module.exports.getAllContact = () => {
    return async (req, res) => {
      try {
        const contact = await Contact.find();
        return res.send(contact).status(200);
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  module.exports.updateContact= () => {
    return async (req, res) => {
     try {
       contact = await Contact.findByIdAndUpdate(req.params._id, req.body);
       res.send("contact updated").status(201);
     return await contact.save(); 
  
     } catch (error) {
      console.log(error);
     }
     
    };
  };
  
  module.exports.deleteContact = () => {
    return async (req, res) => {
      try {
        contact = await Contact.findByIdAndDelete(req.params.id);
        return res.send("contact deleted");
      } catch (error) {
        console.log(error);
      }
    };
  };
  