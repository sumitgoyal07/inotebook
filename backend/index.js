const express = require('express');
const Auth=require("./routes/Auth");
const Notes=require("./routes/Notes");

const dotenv=require("dotenv");

const connectmongoose = require('./DB');


connectmongoose();

 dotenv.config();


const app = express();
const port =process.env.PORT;
app.use(express.json());

app.use("/api/v1/auth",Auth);
app.use("/api/v2/notes",Notes);


app.listen(port,()=>{
    console.log(`listen from server at ${port}`)
})