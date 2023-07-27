// const Doctor = require('../models/doctorSchema');
const {validateDoctor,Doctor} = require('../models/doctorSchema');
const cloudinary = require('cloudinary').v2; // Assuming you have cloudinary package installed
const multer = require("multer");
const upload = multer({ dest: "./dtreat_images" });
var type = upload.single("cv");
const fs = require("fs");
const path = require("path");
const { result } = require("@hapi/joi/lib/base");
let streamifier = require("streamifier");
const { log } = require('console');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken")
const cookie = require('cookie-parser')
cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Api_Key,
  api_secret:process.env.Api_Secret
});

let uploadFromBuffer = (req) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        folder: "CV",
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
      .createReadStream(req.files.cv.data) // Change this line to req.files.cv.data
      .pipe(cld_upload_stream);
  });
};



const createDoctor = async (req, res) => {
  // console.log(req);
  try {
    const { error } = validateDoctor(req.body); // Validate the doctor object
    if (error) {
      return res.status(400).json({ error: error.details[0].message }); // Return the validation error if present
    }
    const result = await uploadFromBuffer(req);
      // console.log(result);

    
const doctor = new Doctor({
      fullName:req.body.fullName,
      country:req.body.country,
      phoneNumber:req.body.phoneNumber,
      organization:req.body.organization,
      email:req.body.email,
      password:req.body.password,
      gender:req.body.gender,
      speciality:req.body.speciality,
      description:req.body.description,
      cv: result.url,
    });

     console.log("before token");
            let jwt = jwt.sign({_id:user_id},process.env.SECRET,{
                expiresIn:"1h"
            })

    const salt  = await bcryptjs.genSalt(10);
    doctor.password = await bcryptjs.hash(doctor.password,salt)

    await doctor.save();
    res.cookie('doctordat',doctor.email)

    
    

    return res.status(201).json({ doctor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


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
const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const doctor  = await Doctor.findOne({ email: email, password: password});
    if(!doctor) {
      return res.send("doctor not found");
    }
   const passwordMatch = await bcryptjs.compare(password,doctor.password);
   console.log(passwordMatch);
   if(!passwordMatch) {
    return  res.send("incorrect password");
   }
   let token = jwt.sign({
    _id: doctor._id },
    process.env.MY_TOKEN
    );
    res.cookie("doctor", user.email, {
      sameSite: true,
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000
    });
    return res.send(token);
  }catch(error) {
    console.log(error);
  }
  
}

module.exports = {
  createDoctor,
  updateDoctor,
  getDoctorById,
  getAllDoctors,
  deleteDoctor,
  login
};
