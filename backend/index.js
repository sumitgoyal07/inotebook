const express = require('express');
const Auth=require("./routes/Auth");
const dotenv=require("dotenv");

const connectmongoose = require('./DB');


connectmongoose();

 dotenv.config();


const app = express();
const port =process.env.PORT;
app.use(express.json());

app.use("/api/v1/auth",Auth)

app.listen(port,()=>{
    console.log(`listen from server at ${port}`)
})