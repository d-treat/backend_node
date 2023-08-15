const {db} = require('../utils/database')
const {Address} = require("../models/AddressSchema")
const {validateAddress}  = require("../models/AddressSchema")

module.exports.createAddress = async (req, res, next) => {
  const { error } = validateAddress(req.body);
  if (error) {
    console.error(error);
    return res.status(400).send(error.details[0].message);
  }

  try {
    const address = new Address({
      street: req.body.street,
      city: req.body.city,
      postalCode: req.body.postalCode,
      country: req.body.country,
    });

    await address.save();
    // console.log("Address saved:", address);
    res.status(201).send(address);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.getAddressById = async (req, res) => {
  console.log(req.params);
  try {
    const address = await Address.findById(req.params.id);
    res.status(200).send(address);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};



module.exports.getAllAddress = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).send(addresses);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.updateAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!address) {
      return res.status(404).send("Address not found");
    }
    return res.send("Address updated").status(200);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};


  module.exports.deleteAddress = async (req, res) => {
    try {
      const address = await Address.findByIdAndDelete(req.params.id);
      if (!address) {
        return res.status(404).send("Address not found");
      }
      return res.send("Address deleted").status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  };
  