import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Modal } from 'antd';
import { useAuth } from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const host = "http://localhost:5000";
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [utag, setUtag] = useState("");
    const [utitle, setUtitle] = useState("");
    const [udescription, setUdescription] = useState("");
    const [tag, setTag] = useState("");
    const [id, setId] = useState("");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();




    //addnote
    const handleadd = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${host}/api/v2/note/addnote`, {
                title, description, tag,
            },

            );
            if (data?.success) {
                alert(data?.message)
                getall();
            }
            else {
                alert("Something Wrong")
            }
        } catch (error) {
            alert("failed add note")
            console.log(error);
        }
    }

    //getall notes
    const getall = async () => {
        try {
            const { data } = await axios.get(`${host}/api/v2/note/getnotes`,
            );
            if (data?.success) {
                setNotes(data?.notes);
            }
            else {
                alert("Something Wrong")
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            getall()
        }
        else {
            navigate('/login')
        }
        //eslint-disable-next-line
    }, []);

    //delete note
    const deletenote = async (_id) => {
        try {
            const { data } = await axios.delete(`${host}/api/v2/note/deletenote/${_id}`,
            );
            if (data?.success) {
                alert("Note Deleted Succesfully")
                getall();
            }
            else {
                alert("Something Wrong")
            }
        } catch (error) {
            console.log(error);
        }
    }

    //updated note
    const updatenote = async () => {
        try {

            const { data } = await axios.put(`${host}/api/v2/note/updatenote/${id}`, {
                title: utitle, description: udescription, tag: utag,
            },
            );
            if (data?.success) {
                alert("Note Updated Succesfully")
                getall();
                setOpen(false);
            }
            else {
                alert("Something Wrong")
            }
        } catch (error) {
            console.log(error);
        }
    }

    //modal button




    return (
        <div>
            <div className="my-3">
                <h1 style={{ position: "relative", right: "537px" }}>Add a Note</h1>
            </div>
            <form className='col-md-19 mx-1'>
                <div className="mb-3">
                    <input type="text" className="form-control" id="title" name='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Your Title' />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="description" name='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter Your Description' />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="tag" name='tag' value={tag} onChange={(e) => setTag(e.target.value)} placeholder='Enter Your Tag' />
                </div>
            </form>
            <button onClick={handleadd} type="button" className="btn btn-primary" style={{ position: "relative", right: "598px" }}>Add note</button>


            <div className="row ">

                <h1 className='my-3' style={{ position: "relative", right: "547px" }}>Your Notes</h1>
                <div className="d-flex my-2">
                    {notes.map((notes) => (
                        <div className="card mx-1" key={notes._id} style={{ width: "30rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">{notes.title}</h5>
                                <h3 className="card-title">{notes.tag}</h3>
                                <p className="card-text">{notes.description}</p>
                                <button className="btn btn-primary mx-2" onClick={() => { setOpen(true); setUdescription(notes.description); setUtag(notes.tag); setUtitle(notes.title); setId(notes._id) }}>Update</button>
                                <button className="btn btn-dark mx-2" onClick={() => deletenote(notes._id)}>Delete</button>
                                <Modal
                                    onCancel={() => { setOpen(false) }}
                                    footer={null}
                                    open={open}
                                >
                                    <form className='col-md-19 mx-1'>
                                        <div className="mb-3">
                                            <input type="text" className="form-control" id="title" name='title' value={utitle} onChange={(e) => setUtitle(e.target.value)} placeholder='Enter Your Title' />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="form-control" id="description" name='description' value={udescription} onChange={(e) => setUdescription(e.target.value)} placeholder='Enter Your Description' />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="form-control" id="tag" name='tag' value={utag} onChange={(e) => setUtag(e.target.value)} placeholder='Enter Your Tag' />
                                        </div>
                                    </form>
                                    <button onClick={updatenote} type="button" className="btn btn-primary">update note</button>
                                </Modal>
                            </div>
                        </div>
                    ))}
                </div>


            </div>

        </div>


    )
}

export default Notes
