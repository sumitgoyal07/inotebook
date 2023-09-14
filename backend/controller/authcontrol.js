const Usermodel = require("../Models/Usermodel");
const { hashPassword,comparePassword } = require("../Helpers/authHelper");
const JWT = require('jsonwebtoken');


const signupcontrol = async (req, res) => {

  try {
    const { name, email, password, } = req.body;
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

    //check user
    const exisitingUser = await Usermodel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(400).send({
        success: false,
        message: "Already Register please login",
      });
    }

    //hashing password
    const hashpassword = await hashPassword(password);

    //register user
    //save
    const user = await Usermodel.create({
      name,
      email,
      password: hashpassword,
    })

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(200).send({
      success: true,
      message: "User Register Successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
}

const logincontroller =async(req,res)=>{
  try {
    const {email,password}=req.body;

    //validations
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }

    //check user email
    const user= await Usermodel.findOne({email});
    if(!user){
      res.status(400).send({
        message:"Firstly Need Registration"
       });
      };
       //compare password
       const match = await comparePassword(password,user.password)
       if(!match){
        res.status(400).send({
          message:"Enter Password Again"
         });
       };

       const token = JWT.sign({_id:user._id},process.env.JWT_SECRET);
       res.status(200).send({
        success: true,
        message: "Login Sucessfully",
        token,
        user
      });
  } catch (error) {
    
  }

}

module.exports = { signupcontrol,logincontroller }
