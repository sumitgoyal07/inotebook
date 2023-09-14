const mongoose = require("mongoose");
const dotenv=require("dotenv");
dotenv.config();


const connectmongoose =async ()=>{

    try {
         await mongoose.connect(process.env.MONGO_DB_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log(`mongodb connected successfully`)
    
        
    } catch (error) {
        console.log(error)
    }

}

module.exports=connectmongoose;