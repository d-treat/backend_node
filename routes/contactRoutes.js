const express = require('express');
const router = express.Router();
const {
  createContact,
  getContactById,
  getAllContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');

router.post('/contact', createContact);
router.get('/contact/:id', getContactById);
router.get('/contacts', getAllContact);
router.put('/contact/:id', updateContact);
router.delete('/contact/:id', deleteContact);

module.exports = router;
