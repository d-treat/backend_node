const mongoose = require('mongoose');
const joi = require('joi');

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
    data: Buffer,
    contentType: String
  }
});

module.exports.Doctor = mongoose.model('Doctor', doctorSchema);

const validateDoctor = (doctor) => {
  const schema = joi.object({
    fullName: joi.string().required().label('fullName'),
    country: joi.string().required().label('Country'),
    phoneNumber: joi.string().required().label('Phone Number'),
    organization: joi.string().label('Organization'),
    email: joi.string().email().required().label('Email'),
    password: joi.string().required().label('Password'),
    gender: joi.string().valid('male', 'female', 'other').required().label('Gender'),
    speciality: joi.string().required().label('Speciality'),
    description: joi.string().label('Description'),
    cv: joi.object({
      data: joi.binary().required().label('CV Data'),
      contentType: joi.string().required().label('CV Content Type')
    }).required().label('CV'),
    address: joi.string().required().label('Address')
  });

  return schema.validate(doctor);
};

module.exports.validateDoctor = validateDoctor;
