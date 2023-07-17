const express = require('express');
const router = express.Router();
const {
  createHospitalAdmin,
  getHospitalAdminById,
  getAllHospitalAdmins,
  updateHospitalAdmin,
  deleteHospitalAdmin
} = require('../controllers/hospitalAdminController');
const { validateHospitalAdmin } = require('../models/hospitalAdminSchema');

// Create a new hospital admin
router.post('/hospital-admin', createHospitalAdmin);

// Get a hospital admin by ID
router.get('/hospital-admin/:id', getHospitalAdminById);

// Get all hospital admins
router.get('/hospital-admin', getAllHospitalAdmins);

// Update a hospital admin by ID
router.put('/hospital-admin/:id', updateHospitalAdmin);

// Delete a hospital admin by ID
router.delete('/hospital-admin/:id', deleteHospitalAdmin);

module.exports = router;
