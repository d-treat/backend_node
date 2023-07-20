const HospitalAdmin = require('../models/hospitalAdminSchema');
const validateHospitalAdmin = require('../models/hospitalAdminSchema');
const cloudinary = require('cloudinary').v2; // Assuming you have cloudinary package installed
const multer = require("multer");
const upload = multer({ dest: "./dtreat_images" });
const fs = require("fs");
const path = require("path");
const { result } = require("@hapi/joi/lib/base");
let streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Api_Key,
  api_secret:process.env.Api_Secret
});

let uploadFromBuffer = (req) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        folder: "PROOF",
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier
      .createReadStream(req.files.proof.data) // Change this line to req.files.cv.data
      .pipe(cld_upload_stream);
  });
};
// Save a new hospital admin
const createHospitalAdmin = async (req, res) => {
  try {
    const { error } = validateHospitalAdmin(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const result = await uploadFromBuffer(req);
    

    const hospitalAdmin = new HospitalAdmin({
      fullName:req.body.fullName,
      phoneNumber:req.body.phoneNumber,
      email:req.body.email,
      message:req.body.message,
      proof:result.url,
      organization:req.body.organization,
      password:req.body.password
    });

    await hospitalAdmin.save();

    return res.status(201).json({ hospitalAdmin });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while saving the hospital admin' });
  }
};

// Get all hospital admins
const getAllHospitalAdmins = async (req, res) => {
  try {
    const hospitalAdmins = await HospitalAdmin.find();
    return res.status(200).json({ hospitalAdmins });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while retrieving the hospital admins' });
  }
};

// Get a hospital admin by ID
const getHospitalAdminById = async (req, res) => {
  try {
    const hospitalAdmin = await HospitalAdmin.findById(req.params.id);
    if (!hospitalAdmin) {
      return res.status(404).json({ error: 'Hospital admin not found' });
    }

    return res.status(200).json({ hospitalAdmin });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while retrieving the hospital admin' });
  }
};

// Update hospital admin details
const updateHospitalAdmin = async (req, res) => {
  try {
    const { error } = validateHospitalAdmin(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { fullName, phoneNumber, email, message, organization, password } = req.body;

    const proofFile = req.file; // Assuming the proof file is uploaded using multer or similar middleware

    const existingHospitalAdmin = await HospitalAdmin.findById(req.params.id);
    if (!existingHospitalAdmin) {
      return res.status(404).json({ error: 'Hospital admin not found' });
    }

    let proof = existingHospitalAdmin.proof; // Preserve the existing proof if no new file is uploaded

    // Upload the new proof file to Cloudinary if provided
    if (proofFile) {
      const result = await cloudinary.uploader.upload(proofFile.path);

      proof = {
        url: result.secure_url,
        publicId: result.public_id
      };
    }

    existingHospitalAdmin.fullName = fullName;
    existingHospitalAdmin.phoneNumber = phoneNumber;
    existingHospitalAdmin.email = email;
    existingHospitalAdmin.message = message;
    existingHospitalAdmin.proof = proof;
    existingHospitalAdmin.organization = organization;
    existingHospitalAdmin.password = password;

    await existingHospitalAdmin.save();

    return res.status(200).json({ hospitalAdmin: existingHospitalAdmin });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while updating the hospital admin' });
  }
};

// Delete a hospital admin by ID
const deleteHospitalAdminById = async (req, res) => {
  try {
    const hospitalAdmin = await HospitalAdmin.findById(req.params.id);
    if (!hospitalAdmin) {
      return res.status(404).json({ error: 'Hospital admin not found' });
    }

    // Delete the proof file from Cloudinary
    await cloudinary.uploader.destroy(hospitalAdmin.proof.publicId);

    await hospitalAdmin.remove();

    return res.status(200).json({ message: 'Hospital admin deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while deleting the hospital admin' });
  }
};

module.exports = {
  createHospitalAdmin,
  getAllHospitalAdmins,
  getHospitalAdminById,
  updateHospitalAdmin,
  deleteHospitalAdminById
};
