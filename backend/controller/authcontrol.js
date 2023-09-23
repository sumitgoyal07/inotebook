const Usermodel = require("../Models/Usermodel");
const { hashPassword, comparePassword } = require("../Helpers/authHelper");
const JWT = require('jsonwebtoken');


const signupcontrol = async (req, res) => {

  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }

    //check user
    const exisitingUser = await Usermodel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(400).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await Usermodel.create({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    })

    res.status(200).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

const logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation;
    if (!email) {
      return res.send({ message: "Email is Required For Login" });
    }
    if (!password) {
      return res.send({ message: "Password is Required For Login" });
    }

    //check user;
    const user = await Usermodel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Firstly Need Registeration",
      });
    }
    //compare password;
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Incorrect Password , Try Again",
      });
    }

    //web token;
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }

};

//getuser
const getuserdetailscontroller = async (req, res) => {
  const { email, password } = req.body;
  //validations
  if (!email) {
    return res.send({ message: "Email is Required" });
  };
  if (!password) {
    return res.send({ message: "Password is Required" });
  };
  try {
    const user = await Usermodel.findById(req.user._id).select("-password");
    res.status(200).send({
      message: "user details",
      user,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Please Authnication Using a Valid Token",
      error,
    });
  }



}

module.exports = { signupcontrol, logincontroller, getuserdetailscontroller }
