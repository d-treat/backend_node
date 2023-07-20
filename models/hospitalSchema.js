// hospitalSchema.js

const mongoose = require('mongoose');
const Joi = require('joi');

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true,
  },
  doctorNumber: {
    type: Number,
    required: true
  }
});

const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports.Hospital = Hospital;

const validateHospital = (hospital) => {
  const schema = Joi.object({
    name: Joi.string().required().label('name'),
    country: Joi.string().required().label('country'),
    doctorNumber: Joi.number().required().label('doctorNumber'),
  });

  return schema.validate(hospital);
};


module.exports.validateHospital = validateHospital;
