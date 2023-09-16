const mongoose =require("mongoose");

const NotesSchema = new mongoose.Schema({

    user:{
        type:mongoose.ObjectId,
        ref:"user"
    },
    title:{
        type:String,
        reuired:true
    },
    description:{
        type:String,
        reuired:true,
        unquie:true,
    },
    tag:{
        type:String,
        reuired:true
    },
    date:{
        type:Date,
        default:Date.now
    },
})

module.exports=mongoose.model("notes",NotesSchema)