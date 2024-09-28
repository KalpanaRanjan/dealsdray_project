import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Home() {
  const[username, setusername] = useState(localStorage.getItem("username"));
  return (
    <> 
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand">
        <img src="https://www.dealsdray.com/wp-content/uploads/2023/11/logo_B2R.png" alt="Logo" width="80" height="50" className="d-inline-block align-text-top"/>
      </Link>
    </div>
  </nav>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <div className="navbar-collapse collapse show">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/employeelist" >Employees List</Link>
          </li>
        </ul>
      </div>
      <div className="d-flex">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" >{username}</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div className="container">
    <h1 className='text-center'>Welcome to Admin pannel</h1>
  </div>
    </>
  )
}

export default Home