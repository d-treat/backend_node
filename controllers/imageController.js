const cloudinary = require('cloudinary').v2;
const Image = require('../models/image');
const validateImage = require('../validation/imageValidation');

cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Api_Key,
    api_secret:process.env.Api_Secret
  });

// Create a new image
const createImage = async (req, res) => {
  try {
    const { error } = validateImage(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { imageName, image } = req.body;

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(image.path);

    const imageUrl = result.secure_url;

    const newImage = new Image({
      imageName,
      imageUrl
    });

    await newImage.save();

    return res.status(201).json({ image: newImage });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while creating the image' });
  }
};

// Get all images
const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    return res.status(200).json({ images });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while retrieving the images' });
  }
};

// Get an image by ID
const getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    return res.status(200).json({ image });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while retrieving the image' });
  }
};

// Update an image by ID
const updateImage = async (req, res) => {
  try {
    const { error } = validateImage(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { imageName, image } = req.body;

    const existingImage = await Image.findById(req.params.id);
    if (!existingImage) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // If a new image is uploaded, update the image URL in Cloudinary
    if (image) {
      const result = await cloudinary.uploader.upload(image.path);
      const imageUrl = result.secure_url;

      existingImage.imageUrl = imageUrl;
    }

    existingImage.imageName = imageName;

    await existingImage.save();

    return res.status(200).json({ image: existingImage });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while updating the image' });
  }
};

// Delete an image by ID
const deleteImage = async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    return res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while deleting the image' });
  }
};

module.exports = {
  createImage,
  getAllImages,
  getImageById,
  updateImage,
  deleteImage
};
