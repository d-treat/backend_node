const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./dtreat_images" });

const {
  createDoctor,
  getDoctorById,
  getAllDoctors,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctorController');

router.post('/doctor', createDoctor);
router.get('/doctor/:id', getDoctorById);
router.get('/doctors', getAllDoctors);
router.put('/doctor/:id', updateDoctor);
router.delete('/doctor/:id', deleteDoctor);

module.exports = router;

