const express = require('express');
const router = express.Router();
const {
  createHospital,
  getHospitalById,
  getAllHospitals,
  updateHospital,
  deleteHospitalById
} = require('../controllers/hospitalController');

router.post('/hospital', createHospital);
router.get('/hospital/:id', getHospitalById);
router.get('/hospitals', getAllHospitals);
router.put('/hospital-update/:id', updateHospital);
router.delete('/hospital/:id', deleteHospitalById);

module.exports = router;
