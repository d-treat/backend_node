const mongoose = require('mongoose');
const joi = require('joi');
const Address = require('../models/appointmentSchema');

const doctorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return this.address.country === value;
      },
      message: 'The country must match the country from the address'
    }
  },
  phoneNumber: {
    type: String,
    required: true
  },
  organization: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  speciality: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cv: {
    data: Buffer,
    contentType: String
  }
});

doctorSchema.add({ address: addressSchema });
module.exports.Doctor = mongoose.model('Doctor',doctorSchema);

const validateDoctor = (doctor) => {
    const schema = Joi.object({
        fullName: Joi.string().required().label('fullName'),
      country: Joi.string().required().label('Country'),
      phoneNumber: Joi.string().required().label('Phone Number'),
      organization: Joi.string().label('Organization'),
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().required().label('Password'),
      gender: Joi.string().valid('male', 'female', 'other').required().label('Gender'),
      speciality: Joi.string().required().label('Speciality'),
      description: Joi.string().label('Description'),
      cv: Joi.object({
        data: Joi.binary().required().label('CV Data'),
        contentType: Joi.string().required().label('CV Content Type')
      }).required().label('CV')
    });
  
    return schema.validate(doctor);
  };
  module.exports.validateDoctor = validateDoctor;