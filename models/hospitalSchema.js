const mongoose = require('mongoose');


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

module.exports.Hospital = hospitalSchema;

