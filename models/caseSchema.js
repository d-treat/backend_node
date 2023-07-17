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
  action: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'uncompleted', 'inProgress'],
    default: 'uncompleted'
  }
});

module.exports.Case = mongoose.model('Case', caseSchema);

const validateCase = (caseObj) => {
  const schema = Joi.object({
    name: Joi.string().required().label('name'),
    startDate: Joi.date().required().label('startDate'),
    action: Joi.string().required().label('action'),
    status: Joi.string().required().valid('completed', 'uncompleted', 'inProgress').label('status'),
  });

  return schema.validate(caseObj);
};

module.exports.validateCase = validateCase;
