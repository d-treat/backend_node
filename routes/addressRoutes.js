const express = require('express');
const router = express.Router();
const {
  createAddress,
  getAddressById,
  getAllAddress,
  updateAddress,
  deleteAddress
} = require("../controllers/addressController");

router.post('/address', createAddress);
router.get('/address/:id', getAddressById);
router.get('/address', getAllAddress);
router.put('/address/:id', updateAddress);
router.delete('/address/:id', deleteAddress);

module.exports = router;
