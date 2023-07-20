const express = require('express');
const router = express.Router();
const {
  createDoctor,
  getDoctorById,
  getAllDoctors,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctorController');

router.post('/doctor', createDoctor);
router.get('/doctor/:id', getDoctorById);
router.get('/doctor', getAllDoctors);
router.put('/doctor/:id', updateDoctor);
router.delete('/doctor/:id', deleteDoctor);

module.exports = router;
