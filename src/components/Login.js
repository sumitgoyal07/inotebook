import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
const Login = () => {
    const host = "http://localhost:5000";
    const navigate=useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth,setAuth]=useAuth();
    
    const login =async(e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.post(`${host}/api/v1/auth/login`,{
                email,password,
            });
            if(data && data.success){
                alert(data.message);
                setAuth({...auth , user:data.user,token:data.token});
                localStorage.setItem('auth',JSON.stringify(data));
                navigate("/");
            }
            else{
                alert("Login Failed");
            }
        } catch (error) {
            console.log(error);
            alert("login failed")

        }
    }
  return (
    <div>
        <div className="row my-4">
      <form className='col-md-4 container'>
        <h1>Login Form</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" required />
        </div>
        <button type="submit" className="btn btn-success" onClick={login}>Login</button>
      </form>
    </div>
    </div>
  )
}

export default Login
