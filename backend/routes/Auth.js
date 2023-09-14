const express = require('express');
const {signupcontrol,logincontroller} = require("../controller/authcontrol")

const router = express.Router();

//route1
router.post("/signup",signupcontrol);

//route2
router.post("/login",logincontroller)



module.exports=router;