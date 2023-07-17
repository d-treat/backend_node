const express  = require("express")
const {createAddress,getAddressById,getAllAddress,updateAddress,deleteAddress} = require("../controllers/addressController")
const {validateAddress} = require("../models/addressSchema")
const  Address = require("../models/addressSchema")
// const registerDefinition  =  require  ('swaggify');



const router = express.Router();
// registerDefinition(router, { tags: 'Carts', mappedSchema: 'cartSchema', basePath: '/cart' });

router.post('/address',createAddress());
router.get('/address/:_id',getAddressById())
router.get('/address',getAllAddress())
router.put('/address/:_id',updateAddress())
router.delete('/address/:_id',deleteAddress())


module.exports.addressRoutes  = router