const {db} = require('../utils/database')
const { Case } = require('../models/caseSchema');
const {validateCase} = require("../models/caseSchema")


module.exports.createCase = async (req, res, next) => {
  try {
    const { error } = validateCase(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const caseobj = new Case({
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      action: req.body.action,
      status: req.body.status,
      disease: req.body.disease,
      patient: req.body.patient,
      doctors: req.body.doctors
    });

    const savedCase = await caseobj.save();
    res.status(201).send(savedCase);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};



  module.exports.getCaseById = async (req,res) => {
    console.log(req.params);
    try {
      const caseObj = await Case.findById(req.params.id);
      res.status(200).send(caseObj);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  };
  
  module.exports.getAllCase = async(req,res) => {
    try {
      const caseObj = await Case.find();
      return res.status(200).send(caseObj);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
  };
  
  module.exports.updateCase= async(req,res) => {
    try {
      const caseObj = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!caseObj) {
        return res.status(404).send("case not found");
      }
      return res.send("case updated").status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  };
  
  module.exports.deleteCase = async(req,res) => {
    try {
      const caseObj = await Case.findByIdAndDelete(req.params.id);
      if (!caseObj) {
        return res.status(404).send("case not found");
      }
      return res.send("case deleted").status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  };
  