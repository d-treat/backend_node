const mongoose = require('mongoose')
const Joi = require('joi')


const imageSchema = new mongoose.Schema({
    imageName: {
      type: String,
      required: true
    },
    image: {
      type: Buffer,
      required: true
    }
  });

  module.exports.Image  =  mongoose.model('Image', imageSchema)
 

const validateImage = (image) => {
  const schema = Joi.object({
    imageName: Joi.string().required().label('Image Name'),
    image: Joi.any().required().label('Image')
  });

  return schema.validate(image);
};

module.exports.validateImage = validateImage;

