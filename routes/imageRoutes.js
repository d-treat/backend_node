const express = require('express');
const router = express.Router();
const {
  createImage,
  getAllImages,
  getImageById,
  updateImage,
  deleteImage
} = require('../controllers/imageController');

router.post('/image', createImage);
router.get('/image/:id', getImageById);
router.get('/images', getAllImages);
router.put('/image/:id', updateImage);
router.delete('/image/:id', deleteImage);

module.exports = router;
