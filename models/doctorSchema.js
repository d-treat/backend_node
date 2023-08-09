const mongoose = require('mongoose');
const joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const doctorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true,
  
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
    type:String,
    required:true
  }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;

const validateDoctor = (doctor) => {


  const passwordComplexityOptions = {
    min: 8,                  // Minimum password length
    max: 30,                 // Maximum password length
    lowerCase: 1,            // Require at least 1 lowercase letter
    upperCase: 1,            // Require at least 1 uppercase letter
    numeric: 1,              // Require at least 1 numeric digit
    symbol: 1,               // Require at least 1 special character
    requirementCount: 4,     // Total number of requirements to satisfy
    // Additional options, if needed
  };

  const schema = joi.object({
    fullName: joi.string().required().label('fullName'),
    country: joi.string().required().label('country'),
    phoneNumber: joi.string().required().label('phoneNumber'),
    organization: joi.string().label('organization'),
    email: joi.string().email().required().label('email'),
    password: passwordComplexity(passwordComplexityOptions)
      .required()
      .label('password'),
    gender: joi.string().valid('male', 'female', 'other').required().label('gender'),
    speciality: joi.string().required().label('speciality'),
    description: joi.string().label('description'),
  });

  return schema.validate(doctor);
};

module.exports.validateDoctor = validateDoctor;
