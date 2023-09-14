const mongoose =require("mongoose");

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        reuired:true
    },
    email:{
        type:String,
        reuired:true,
        unquie:true,
    },
    password:{
        type:String,
        reuired:true
    },
    date:{
        type:Date,
        default:Date.now
    },
})

module.exports=mongoose.model("user",UserSchema)