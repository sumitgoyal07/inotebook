const express = require('express');
const {requireSignIn}=require("../Middleware/authmiddleware")
const {signupcontrol,logincontroller, getuserdetailscontroller} = require("../controller/authcontrol")

const router = express.Router();

//route1
router.post("/signup",signupcontrol);

//route2
router.post("/login",logincontroller);

//route3
router.post("/getuser",requireSignIn, getuserdetailscontroller)




module.exports=router;