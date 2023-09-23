import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const host = "http://localhost:5000";
    const navigate=useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

   //signup function
    const Signup =async(e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.post(`${host}/api/v1/auth/signup`,{
                name,email,password,
            });
            if(data && data.success){
                alert(data.message);
                
                navigate("/login");
            }
            else{
                alert("Login Failed");
            }
        } catch (error) {
            console.log(error);
            alert("signup failed")
        }
    }
  return (
    <div>
        <div className="row my-4">
      <form className='col-md-4 container'>
        <h1>Register Form</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputname" className="form-label">Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="exampleInputname" required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" required />
        </div>
        <button type="submit" className="btn btn-success" onClick={Signup}>Login</button>
      </form>
    </div>
    </div>
  )
}

export default Signup
