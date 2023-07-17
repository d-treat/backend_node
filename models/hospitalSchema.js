const mongoose = require('mongoose');
const addressSchema = require('./addressSchema');

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return this.address.country === value;
      },
      message: 'The country must match the country from the address'
    }
  },
  doctorNumber: {
    type: Number,
    required: true
  }
});

hospitalSchema.add({ address: addressSchema });

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports.Hospital = hospitalSchema;

