const mongoose = require('mongoose');

const joi = require('joi');

const contactSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
})

module.exports.Contact = mongoose.model('Contact',contactSchema)


const validateContact = (contact) => {
    const Schema = joi.object({
        firstName:joi.string().required().label("firstName"),
        lastName:joi.string().required().label("lastName"),
        email:joi.string().required().label("email"),
        phoneNumber:joi.string().email().required().label("phoneNumber"),
        message:joi.string().required().label("message")
    })
    return Schema.validate(contact)
}

module.exports.validateContact = validateContact;