const {db} = require('../utils/database')
const {Appointment} = require("../models/appointmentSchema")
const {validateAppointment} = require("../models/appointmentSchema")


module.exports.createAppointment = () => {
    return async (req, res, next) => {
  
      const {error} = validateAppointment(req.body)
      if(error) return res.send(error.details[0].message)
    try {
       const appointment = new Appointment({
          appointmentName: req.body.appointmentName,
          appointmentTime:req.body.appointmentTime,
          doctor1:req.body.doctor1,
          doctor2: req.body.doctor2,
         
        });
  
        await appointment.save();
        res.send(appointment).status(201);
      } catch (error) {
        console.error(error);
      }
    };
  };
  module.exports.getAppointmentById = () => {
    return async (req, res) => {
      console.log(req.params);
      try {
        const appointment = await Appointment.findById(req.params._id);
        res.status(200).send(appointment);
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  module.exports.getAllAppointment = () => {
    return async (req, res) => {
      try {
        const appointment = await Appointment.find();
        return res.send(appointment).status(200);
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  module.exports.updateAppointment= () => {
    return async (req, res) => {
     try {
       appointment = await Appointment.findByIdAndUpdate(req.params._id, req.body);
       res.send("appointment updated").status(201);
     return await appointment.save(); 
  
     } catch (error) {
      console.log(error);
     }
     
    };
  };
  
  module.exports.deleteAppointment = () => {
    return async (req, res) => {
      try {
        appointment = await Appointment.findByIdAndDelete(req.params.id);
        return res.send("appointment deleted");
      } catch (error) {
        console.log(error);
      }
    };
  };
  