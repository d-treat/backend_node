const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointmentById,
  getAllAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentController');
const { validateAppointment } = require('../models/appointmentSchema');

// Create a new appointment
router.post('/appointment', createAppointment);

// Get an appointment by ID
router.get('/appointment/:id', getAppointmentById);

// Get all appointments
router.get('/appointments', getAllAppointment);

// Update an appointment by ID
router.put('/appointment/:id', updateAppointment);

// Delete an appointment by ID
router.delete('/appointment/:id', deleteAppointment);

module.exports = router;
