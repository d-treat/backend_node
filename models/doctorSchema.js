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
    type:String,
    required:true
  }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;

const validateDoctor = (doctor) => {
  const schema = joi.object({
    fullName: joi.string().required().label('fullName'),
    country: joi.string().required().label('country'),
    phoneNumber: joi.string().required().label('phoneNumber'),
    organization: joi.string().label('organization'),
    email: joi.string().email().required().label('email'),
    password: joi.string().required().label('password'),
    gender: joi.string().valid('male', 'female', 'other').required().label('gender'),
    speciality: joi.string().required().label('speciality'),
    description: joi.string().label('description'),
  
  });

  return schema.validate(doctor);
};

module.exports.validateDoctor = validateDoctor;
