const express = require('express');
const router = express.Router();
const {
  createCase,
  getCaseById,
  getAllCase,
  updateCase,
  deleteCase
} = require('../controllers/caseController');

router.post('/case', createCase);
router.get('/case/:id', getCaseById);
router.get('/cases', getAllCase);
router.put('/case-update/:id', updateCase);
router.delete('/case/:id', deleteCase);

module.exports = router;
