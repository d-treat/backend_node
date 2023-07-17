const {db} = require('../utils/database')
const {Address} = require("../models/addressSchema")
const {validateProduct}  = require("/models/addressSchema")

module.exports.createAddress = () =>{
    return async(req,res,next) =>{
        const {error} = validateProduct(req.body)
        if(error) return res.send(error.details[0].message)

        try {
            const address = new addressSchema({
                street : req.body.street,
                city: req.body.city,
                state: req.body.state,
                postalCode: req.body.postalCode,
                country: req.body.country

            });

            await address.save();
            res.send(address).status(201);
        } catch(err) {
            console.error(err);
        }
    };
};

module.exports.getAddressById = () => {
    return async (req, res) => {
      console.log(req.params);
      try {
        const address = await Address.findById(req.params._id);
        res.status(200).send(address);
      } catch (error) {
        console.log(error);
      }
    };
  };
  module.exports.getAllAddress = () => {
    return async (req, res) => {
      try {
        const address = await Address.find();
        return res.send(address).status(200);
      } catch (error) {
        console.log(error);
      }
    };
  };

  module.exports.updateAddress= () => {
    return async (req, res) => {
     try {
       address = await Address.findByIdAndUpdate(req.params._id, req.body);
       res.send("address updated").status(201);
     return await address.save(); 
  
     } catch (error) {
      console.log(error);
     }
     
    };
  };

  module.exports.deleteAddress = () => {
    return async (req, res) => {
      try {
        address = await Address.findByIdAndDelete(req.params.id);
        return res.send("address deleted");
      } catch (error) {
        console.log(error);
      }
    };
  };