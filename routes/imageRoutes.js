const express = require('express');
const router = express.Router();
const {
  createImage,
  getAllImages,
  getImageById,
  updateImage,
  deleteImage
} = require('../controllers/imageController');
const { validateImage } = require('../models/ImageSchema');

// Create a new hospital
router.post('/hospital', createImage);

// Get a hospital by ID
router.get('/hospital/:id', getImageById);

// Get all hospitals
router.get('/hospital', getAllImages);

// Update a hospital by ID
router.put('/hospital/:id', updateImage);

// Delete a hospital by ID
router.delete('/hospital/:id', deleteImage);

module.exports = router;
