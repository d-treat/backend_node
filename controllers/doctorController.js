const Doctor = require('../models/doctorSchema');
// const {validateDoctor} = require('../models/doctorSchema');
const cloudinary = require('cloudinary').v2; // Assuming you have cloudinary package installed

cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Api_Key,
  api_secret:process.env.Api_Secret
});

// Save a new doctor
// const createDoctor = async (req, res) => {
//   try {
//     const { error } = validateDoctor(req.body);
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     const { name, country, phoneNumber, organization, email, password, gender, speciality, description } = req.body;

//      // Assuming the CV file is uploaded using multer or similar middleware

//     // Upload the CV file to Cloudinary
//     const result = await cloudinary.uploader.upload(cvFile.path);

//     const cvLink = result.secure_url;

//     const doctor = new Doctor({
//       fullName,
//       country,
//       phoneNumber,
//       organization,
//       email,
//       password,
//       gender,
//       speciality,
//       description,
//       cv: cvLink
//     });

//     await doctor.save();

//     return res.status(201).json({ doctor });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };


const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder for storing the uploaded file
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${uuidv4()}`; // Add unique suffix to avoid file name conflicts
    const fileExtension = file.originalname.split('.').pop(); // Extract file extension
    const fileName = `${uniqueSuffix}.${fileExtension}`; // Construct the final file name
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

const createDoctor = async (req, res) => {
  try {
    // const { error } = validateDoctor(req.body);
    // if (error) {
    //   return res.status(400).json({ error: error.details[0].message });
    // }

    const { fullName, country, phoneNumber, organization, email, password, gender, speciality, description } = req.body;



    const cvFile = req.file;
    if (!cvFile) {
      console.log("req.file:", req.file); // Debug statement to check if req.file is present
      return res.status(400).json({ error: "CV file is missing in the request" });
    }

    // Upload the CV file to Cloudinary
    const result = await cloudinary.uploader.upload(cvFile.path);

    const cvLink = result.secure_url;

    const doctor = new Doctor({
      fullName,
      country,
      phoneNumber,
      organization,
      email,
      password,
      gender,
      speciality,
      description,
      cv: cvLink
    });

    await doctor.save();

    return res.status(201).json({ doctor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Route handler for creating a doctor
// router.post('/doctor', upload.single('cv'), createDoctor);

// Update a doctor
const updateDoctor = async (req, res) => {
  try {
    const { error } = validateDoctor(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, country, phoneNumber, organization, email, password, gender, speciality, description } = req.body;

    const cvFile = req.file; // Assuming the CV file is uploaded using multer or similar middleware

    const existingDoctor = await Doctor.findById(req.params.id);
    if (!existingDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // If a new CV file is uploaded, update the CV link
    if (cvFile) {
      // Delete the previous CV file from Cloudinary
      await cloudinary.uploader.destroy(existingDoctor.cv.publicId);

      // Upload the new CV file to Cloudinary
      const result = await cloudinary.uploader.upload(cvFile.path);

      const cvLink = result.secure_url;

      existingDoctor.cv.url = cvLink;
      existingDoctor.cv.publicId = result.public_id;
    }

    existingDoctor.name = name;
    existingDoctor.country = country;
    existingDoctor.phoneNumber = phoneNumber;
    existingDoctor.organization = organization;
    existingDoctor.email = email;
    existingDoctor.password = password;
    existingDoctor.gender = gender;
    existingDoctor.speciality = speciality;
    existingDoctor.description = description;

    await existingDoctor.save();

    return res.status(200).json({ doctor: existingDoctor });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while updating the doctor' });
  }
};

// Get a doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    return res.status(200).json({ doctor });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while retrieving the doctor' });
  }
};

// Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    return res.status(200).json({ doctors });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while retrieving the doctors' });
  }
};

// Delete a doctor by ID
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    return res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while deleting the doctor' });
  }
};

module.exports = {
  createDoctor,
  updateDoctor,
  getDoctorById,
  getAllDoctors,
  deleteDoctor
};
