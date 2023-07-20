const mongoose = require('mongoose');
const Joi = require('joi');

const caseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'uncompleted', 'inProgress'],
    default: 'uncompleted'
  },
  disease: [{
    type: String,
    required: true
  }],
  doctors: [{
    type: String,
    required: true
  }],
  patient: {
    type: String,
    required: true
  }
});

module.exports.Case = mongoose.model('Case', caseSchema);

const validateCase = (caseObj) => {
  const schema = Joi.object({
    name: Joi.string().required().label('name'),
    startDate: Joi.date().required().label('startDate'),
    endDate: Joi.date().required().label('endDate'),
    action: Joi.string().required().label('action'),
    status: Joi.string().required().valid('completed', 'uncompleted', 'inProgress').label('status'),
    disease: Joi.array().items(Joi.string().required()).required().label('disease'),
    doctors: Joi.array().items(Joi.string().required()).required().label('doctors'),
    patient: Joi.string().required().label('patient')
  });

  return schema.validate(caseObj);
};

module.exports.validateCase = validateCase;
