const express = require('express');
const router = express.Router();
const {
  createContact,
  getContactById,
  getAllContacts,
  updateContact,
  deleteContact
} = require('../controllers/contactController');
const { validateContact } = require('../models/contactSchema');

// Create a new contact
router.post('/contact', createContact);

// Get a contact by ID
router.get('/contact/:id', getContactById);

// Get all contacts
router.get('/contact', getAllContacts);

// Update a contact by ID
router.put('/contact/:id', updateContact);

// Delete a contact by ID
router.delete('/contact/:id', deleteContact);

module.exports = router;
