const express = require('express');
const router = express.Router();
const {
  createHospital,
  getHospitalById,
  getAllHospitals,
  updateHospital,
  deleteHospitalById
} = require('../controllers/hospitalController');
const { validateHospital } = require('../models/hospitalSchema');

// Create a new hospital
router.post('/hospital', createHospital);

// Get a hospital by ID
router.get('/hospital/:id', getHospitalById);

// Get all hospitals
router.get('/hospital', getAllHospitals);

// Update a hospital by ID
router.put('/hospital/:id', updateHospital);

// Delete a hospital by ID
router.delete('/hospital/:id', deleteHospitalById);

module.exports = router;
