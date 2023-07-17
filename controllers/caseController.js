const {db} = require('../utils/database')
const { Case} = require("../models/caseSchema")
const {validateCase} = require("../models/caseSchema")


module.exports.createCase = () => {
    return async (req, res, next) => {
  
      const {error} = validateCase(req.body)
      if(error) return res.send(error.details[0].message)
    try {
       const caseobj = new Case({
          name: req.body.name,
          startDate:req.body.startDate,
          action:req.body.action,
          status: req.body.status,
         
        });
  
        await caseobj.save();
        res.send(caseobj).status(201);
      } catch (error) {
        console.error(error);
      }
    };
  };
  module.exports.getCaseById = () => {
    return async (req, res) => {
      console.log(req.params);
      try {
        const caseobj = await Case.findById(req.params._id);
        res.status(200).send(caseobj);
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  module.exports.getAllCase = () => {
    return async (req, res) => {
      try {
        const caseObj = await Case.find();
        return res.send(caseObj).status(200);
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  module.exports.updateCase= () => {
    return async (req, res) => {
     try {
       caseObj = await Case.findByIdAndUpdate(req.params._id, req.body);
       res.send("case updated").status(201);
     return await caseObj.save(); 
  
     } catch (error) {
      console.log(error);
     }
     
    };
  };
  
  module.exports.deleteCase = () => {
    return async (req, res) => {
      try {
        caseObj = await Case.findByIdAndDelete(req.params.id);
        return res.send("case deleted");
      } catch (error) {
        console.log(error);
      }
    };
  };
  