const express = require('express');
const router = express.Router();
const {requireSignIn}=require("../Middleware/authmiddleware");
const {addnotes,getnotes,updatenotes,deletenotes}=require("../controller/notescontroller")



//route1
router.post("/addnote",requireSignIn,addnotes);

//route2
router.get("/getnotes",requireSignIn,getnotes);

//route3
router.put("/updatenote/:id",requireSignIn,updatenotes);

//route4
router.delete("/deletenote/:id",requireSignIn,deletenotes)





module.exports=router;