const express = require('express');
const router = express.Router();
const {
  createCase,
  getCaseById,
  getAllCase,
  updateCase,
  deleteCase
} = require('../controllers/caseController');
const { validateCase } = require('../models/caseSchema');

// Create a new case
router.post('/case', createCase);

// Get a case by ID
router.get('/case/:id', getCaseById);

// Get all cases
router.get('/cases', getAllCase);

// Update a case by ID
router.put('/case/:id', updateCase);

// Delete a case by ID
router.delete('/case/:id', deleteCase);

module.exports = router;
