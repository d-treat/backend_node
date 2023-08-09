const mongoose = require('mongoose');
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity');

const hospitalAdminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  message: {
    type: String,
    required: true
  },
  proof: {
    type: String,
    required: false
  },
  organization: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const HospitalAdmin = mongoose.model('HospitalAdmin', hospitalAdminSchema);

module.exports = HospitalAdmin;

const validateHospitalAdmin = (hospitalAdmin) => {

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

    const schema = Joi.object({
    fullName: Joi.string().required().label('Full Name'),
    phoneNumber: Joi.string().required().label('Phone Number'),
    email: Joi.string().email().required().label('Email'),
    message: Joi.string().label('Message'),
    organization: Joi.string().label('Organization'),
    password: passwordComplexity(passwordComplexityOptions)
      .required()
      .label('Password')
  });
  return schema.validate(hospitalAdmin);
};

module.exports.validateHospitalAdmin = validateHospitalAdmin;
