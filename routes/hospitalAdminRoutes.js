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

router.post('/hospitalAdmin', createHospitalAdmin);
router.post('/send-invite',sendInvite);
router.get('/hospitalAdmin/:id', getHospitalAdminById);
router.get('/hospitalAdmins', getAllHospitalAdmins);
router.put('/hospitalAdmin-update/:id', updateHospitalAdmin);
router.delete('/hospitalAdmin/:id', deleteHospitalAdminById);

module.exports = router;
