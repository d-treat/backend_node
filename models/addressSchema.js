const mongoose = require('mongoose');
const  joi = require('joi');

const addressSchema = new mongoose.Schema({
    street:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
    postalCode:{
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    }

});
module.exports.Address = mongoose.model('Address',addressSchema);

const validateAddress = (address) => {
    const Schema = joi.object ({
        street:joi.string().required().label('street'),	
        city:joi.string().required().label('city'),
        state:joi.string().required().label('state'),
        postalCode:joi.string().required().label('postalCode'),
        country:joi.string().required().label('country')

    })
    return Schema.validate(address)
}
module.exports.validateAddress = validateAddress