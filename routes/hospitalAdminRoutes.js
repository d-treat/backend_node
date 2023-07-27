const express = require('express');
const router = express.Router();
const {
  createHospitalAdmin,
  getHospitalAdminById,
  getAllHospitalAdmins,
  updateHospitalAdmin,
  deleteHospitalAdminById,
  sendInvite
} = require('../controllers/hospitalAdminController');

router.post('/hospital-admin', createHospitalAdmin);
router.post('/send-invite',sendInvite);
router.get('/hospital-admin/:id', getHospitalAdminById);
router.get('/hospital-admin', getAllHospitalAdmins);
router.put('/hospital-admin/:id', updateHospitalAdmin);
router.delete('/hospital-admin/:id', deleteHospitalAdminById);

module.exports = router;
