const express = require('express');
const router = express.Router();
const {
  createDoctor,
  getDoctorById,
  getAllDoctors,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctorController');
const { validateDoctor } = require('../models/doctorSchema');

// Create a new doctor
router.post('/doctor', createDoctor);

// Get a doctor by ID
router.get('/doctor/:id', getDoctorById);

// Get all doctors
router.get('/doctor', getAllDoctors);

// Update a doctor by ID
router.put('/doctor/:id', updateDoctor);

// Delete a doctor by ID
router.delete('/doctor/:id', deleteDoctor);

module.exports = router;
