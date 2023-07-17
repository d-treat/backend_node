const Hospital = require('../models/hospitalSchema');
const validateHospital = require('../models/hospitalSchema');

// Save a new hospital
const saveHospital = async (req, res) => {
  try {
    const { error } = validateHospital(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const hospital = new Hospital(req.body);
    await hospital.save();

    return res.status(201).json({ hospital });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while saving the hospital' });
  }
};

// Update a hospital
const updateHospital = async (req, res) => {
  try {
    const { error } = validateHospital(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hospital) {
      return res.status(404).json({ error: 'Hospital not found' });
    }

    return res.status(200).json({ hospital });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while updating the hospital' });
  }
};

// Get a hospital by ID
const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ error: 'Hospital not found' });
    }

    return res.status(200).json({ hospital });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while retrieving the hospital' });
  }
};

// Get all hospitals
const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    return res.status(200).json({ hospitals });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while retrieving the hospitals' });
  }
};

// Delete a hospital by ID
const deleteHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) {
      return res.status(404).json({ error: 'Hospital not found' });
    }

    return res.status(200).json({ message: 'Hospital deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while deleting the hospital' });
  }
};

module.exports = {
  saveHospital,
  updateHospital,
  getHospitalById,
  getAllHospitals,
  deleteHospitalById
};
