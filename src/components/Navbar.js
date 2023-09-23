import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../context/Authcontext'

const Navbar = () => {
  const location = useLocation();
  const [auth,setAuth]=useAuth();
  


  const logout=()=>{
    setAuth({
      ...auth,
      user:null,
      token:""
    })
    localStorage.removeItem('auth');
    alert("Logout successfully")

  }


    return (
      <div>
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
<div className="container-fluid">
  <Link className="navbar-brand" to="/"> 🗒️ INotebook</Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname === "/" ? "active" :" "} `} aria-current="page" to="/">Home</Link>
      </li>
      {
        !auth.user?(<>
        <li className="nav-item">
        <Link className={`nav-link ${location.pathname === "/signup" ? "active" :" "}`} to="/signup">Register</Link>
      </li>
      <li className="nav-item">
      <Link className={`nav-link ${location.pathname === "/Login" ? "active" :" "}`} to="/Login">Login</Link>
      </li>
        </>) :
        (<> 

<div className="navbar-nav ms-auto mb-2 mb-lg-0 dropdown ">
<button className="btn btn-secondary dropdown-toggle navbar-dark bg-dark mx-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
{auth?.user?.name}  </button>
<ul className="dropdown-menu navbar-dark bg-dark ">
<li className="nav-item navbar-dark bg-dark">
      <Link onClick={logout} className={`nav-link ${location.pathname === "/Login" ? "active" :" "}`} to="/Login">Logout</Link>
      </li> 
</ul>
</div>
      </>)
      }
    </ul>
  </div>
</div>

</nav>
    
  </div>
    )
}

export default Navbar