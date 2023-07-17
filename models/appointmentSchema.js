require('dotenv')
const mongoose  = require('mongoose')
const joi  = require('joi')

const appointmentSchema  = new  mongoose.Schema({
    appointmentName:{
        type:String,
        required:true,
    },
    appointmentTime:{
        type:Date,
        required:true
    },
    doctor1:{
        type:String,
        required:true
    },
    doctor2:{
        type:String,
        required:true
    }


});

module.exports.Appointment = mongoose.model('Appointment',appointmentSchema)

const validateAppointment = (appointment)=> {
    const Schema = joi.object({
        appointmentName:joi.string().required().label('appointmentName'),
        appointmentTime:joi.string().required().label('appointmentTime'),
        doctor1:joi.string().required().label('doctor1'),
        doctor2:joi.string().required().label('doctor2')
    })
    return Schema.validate(appointment);
}

module.exports.validateAppointment = validateAppointment;