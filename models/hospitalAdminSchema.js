const mongoose = require('mongoose');
const Joi = require('joi');

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
  const schema = Joi.object({
    fullName: Joi.string().required().label('Full Name'),
    phoneNumber: Joi.string().required().label('Phone Number'),
    email: Joi.string().email().required().label('Email'),
    message: Joi.string().label('Message'),
    proof: Joi.object({
      data: Joi.binary().required().label('Proof Data'),
      contentType: Joi.string().required().label('Proof Content Type')
    }).label('Proof'),
    organization: Joi.string().label('Organization'),
    password: Joi.string().required().label('Password')
  });

  return schema.validate(hospitalAdmin);
};

module.exports.validateHospitalAdmin = validateHospitalAdmin;
