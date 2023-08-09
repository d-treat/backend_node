const HospitalAdmin = require('../models/hospitalAdminSchema');
const Doctor = require('../models/doctorSchema');
const validateHospitalAdmin = require('../models/hospitalAdminSchema');
const cloudinary = require('cloudinary').v2; // Assuming you have cloudinary package installed
const multer = require("multer");
const upload = multer({ dest: "./dtreat_images" });
const fs = require("fs");
const path = require("path");
const { result } = require("@hapi/joi/lib/base");
const nodemailer  = require("nodemailer");
let streamifier = require("streamifier");
const jwt = require("jsonwebtoken");
const bcryptjs = require('bcryptjs')
const cookie = require('cookie-parser');
const { log } = require('console');
var type = upload.single("proof");

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
      password:req.body.password,
    
    });
    console.log("before token");
    let token = jwt.sign({ _id: hospitalAdmin._id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    
    const salt  = await bcryptjs.genSalt(10)
    hospitalAdmin.password = await bcryptjs.hash(hospitalAdmin.password,salt)

    await hospitalAdmin.save();
    res.cookie('admindata',hospitalAdmin.email)

    return res.status(201).json({ hospitalAdmin,token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
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


;



// const nodemailer = require('nodemailer');

// ... other code ...

const sendInvite = async (req, res) => {
  try {
      // Retrieve the doctorId or email from the request body
      const { fullName, email } = req.body;

      // Ensure that either doctorId or email is provided in the request body
      if (!fullName && !email) {
        return res.status(400).json({ error: 'Doctor ID or email is required to send an invite' });
      }

    // Find the doctor in the database based on either doctorId or email
    const doctor = fullName ? await Doctor.findOne({ fullName: fullName }) : await Doctor.findOne({ email });


    // Check if the doctor exists and has a valid email (optional, depending on your schema design)
    if (!doctor || !doctor.email) {
      return res.status(404).json({ error: 'Doctor not found or does not have a valid email' });
    }

    // Generate a random token or use any unique identifier for the invitation link
    const invitationToken = "unique_token_here"; // Replace with actual token generation logic

    // Compose the invitation link
    const invitationLink = `https://your_organization/d_treat-invite-form?token=${invitationToken}`;

    // Create a Nodemailer transporter using the doctor's email configuration
    const transporter = nodemailer.createTransport({
      host: "", 
      service: 'Gmail',
      port: 465,
    secure: true,
      auth: {
        user: doctor.email, // Doctor's email address from the database
        pass: doctor.password, // Doctor's password from the database (assuming you store it; adjust as per your schema design)
      },
    });
    console.log("hddddddddddddddddddddd");
    console.log(doctor.password)
    console.log(doctor.email);

    const hospitalAdmin =  new HospitalAdmin()  ;
    // Compose the email
    const mailOptions = {
      from: hospitalAdmin.email, // Sender address as doctor's email from the database
      to: doctor.email, // Doctor's email address (you can adjust this if needed)
      subject: 'Invitation to join our organization on d_treat platform',
      text: `Hello ${doctor.fullName},\n\nYou have been invited to join our organization on the d_treat platform. Please follow the link below to accept the invitation and fill out the form:\n\n${invitationLink}\n\nBest regards,\nThe Doctor Admin`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.messageId);

    // Save the invitation token in the doctor's record in the database (Optional)
    doctor.invitationToken = invitationToken;
    await doctor.save();

    return res.status(200).json({ message: 'Invitation email sent successfully' });
  }  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while sending the invitation email' });
  }
};


const login = async (req, res) => {
  try {
  const {email,password} = req.body;
  const admin  = await  HospitalAdmin.findOne({ email: email, password: password});
  if(!admin) {
    return res.send("admin not found");
  }
  console.log(admin.password);
  const passwordMatch = await bcryptjs.compare(password, admin.password,admin.password);
  console.log(passwordMatch);
  if(!passwordMatch) {
    return res.send("incorrect password or email")
  }

  let token = jwt.sign({
    _id: admin._id },
    process.env.MY_TOKEN
    );
 res.cookie("userdata", admin.email, {
      sameSite: true,
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000
    });
    return res.send(token);
  }catch (error) {
    console.log(error);
  }
}

module.exports = {
  createHospitalAdmin,
  updateHospitalAdmin,
  getAllHospitalAdmins,
  getHospitalAdminById,
  deleteHospitalAdminById,
  sendInvite,
  login
};

