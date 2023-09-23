const Notesmodel = require("../Models/Notesmodel");

//addnotes
const addnotes = async (req, res) => {

    try {
        const { title, description, tag } = req.body
        //validation
        if (!title) {
            return res.send({ message: "title is Required" });
        }
        if (!description) {
            return res.send({ message: "description is Required" });
        }
        if (!tag) {
            return res.send({ message: "tag is Required" });
        }

        const notes = await Notesmodel.create({
            user:req.user._id,
            title,
            description,
            tag,
        });
        res.status(200).send({
            success: true,
            message: "Note add Successfully",
            notes
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Errro in adding note",
            error,
        });
    }
}
//getallnotes
const getnotes = async (req, res) => {
    try {
        const notes = await Notesmodel.find({ user: req.user._id })
        res.status(200).send({
            success: true,
            message: "All Notes Fetched Successfully",
            notes
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Errro in geting notes",
            error,
        });
    }
}

//updatenotes
const updatenotes = async (req, res) => {

    try {
        //validation
        const note = await Notesmodel.findById(req.params.id);

        if (note.user.toString() !== req.user._id) {
            return res.send({ message: "Please Authenicate With Valid Token" });
        }

        const { title, description, tag } = req.body;
        //validation
        if (!title) {
            return res.send({ message: "title is Required" });
        }
        if (!description) {
            return res.send({ message: "description is Required" });
        }
        if (!tag) {
            return res.send({ message: "tag is Required" });
        }
        const Newnote = await Notesmodel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
        res.status(200).send({
            success: true,
            message: " Note Updated Successfully",
            Newnote
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Errro in updating note",
            error,
        });
    }
}

//deleteenotes
const deletenotes = async (req, res) => {

    try {
        //validation
        const note = await Notesmodel.findById(req.params.id);
        if (note.user.toString() !== req.user._id) {
            return res.send({ message: "Please Authenicate With Valid Token" });
        }
        const Deletednote = await Notesmodel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            message: " Note Deleted Successfully",
            Deletednote
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Errro in Deleting note",
            error,
        });
    }
}


module.exports = { addnotes, getnotes, updatenotes, deletenotes }