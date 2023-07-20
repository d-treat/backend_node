const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointmentById,
  getAllAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentController');

router.post('/appointment', createAppointment);
router.get('/appointment/:id', getAppointmentById);
router.get('/appointments', getAllAppointment);
router.put('/appointment/:id', updateAppointment);
router.delete('/appointment/:id', deleteAppointment);

module.exports = router;
