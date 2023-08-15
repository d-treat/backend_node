const {db} = require('../utils/database')
const {Appointment} = require("../models/AppointmentSchema")
const {validateAppointment} = require("../models/AppointmentSchema")


module.exports.createAppointment = async (req,res,next) => {
    const {error} = validateAppointment(req.body)
    if (error) {
      console.error(error);
      return res.status(400).send(error.details[0].message);
    }
    try {
       const appointment = new Appointment({
          appointmentName: req.body.appointmentName,
          appointmentTime:req.body.appointmentTime,
          doctor1:req.body.doctor1,
          doctor2: req.body.doctor2,
         
        });
  
        await appointment.save();
        res.send(appointment).status(201);
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
  };
  module.exports.getAppointmentById = async (req, res) => {
    try {
      console.log("Request params:", req.params);
      const appointment = await Appointment.findById(req.params.id); // Use "appointmentId" instead of "id"
      console.log("Retrieved appointment:", appointment);
      res.status(200).send(appointment);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  
  
  
  module.exports.getAllAppointment = async (req, res) => {
    try {
      const appointments = await Appointment.find();
      return res.status(200).send(appointments);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
  };
  
  
  module.exports.updateAppointment= async (req,res) => {
    try {
      const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!appointment) {
        return res.status(404).send("appointment not found");
      }
      return res.send("appointment updated").status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  };
  
  module.exports.deleteAppointment =async (req,res) => {
    try {
      const appointment = await Appointment.findByIdAndDelete(req.params.id);
      if (!appointment) {
        return res.status(404).send("appointment not found");
      }
      return res.send("appointment deleted").status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  };
  