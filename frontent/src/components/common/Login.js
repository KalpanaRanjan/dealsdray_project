import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();

  const login = async (values) => {
    
    const url = 'http://localhost:4000/auth/login';
    try {
      const response = await axios.post(url, values);
      console.log(response.data);
      const { token, username } = response.data;

      if (response.status === 200) {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        navigate('/home');
      }
      else {
        return {
          error: true
        }
      }
    }
    catch (err) {
      return {
        error: true
      }
    }
  }

  useEffect(() => {
    localStorage.setItem('token', "");
    localStorage.setItem('username', "");
  }, [])

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
          </ul>
        </div>
        <div className="d-flex">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div className="container-fluid">
      <h2 className='text-center'>Login</h2>
    </div>
      <div className='row maincontent'>
        <div className='col-md-3 col-xs-12'>
        </div>
        <div className='col-md-6 col-xs-12'>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values, { resetForm }) => {
              const { error } = await login(values);
              if (!error) {
                resetForm();
              }else{
                alert("Invalid Credentials")
              };
            }}
          >
            <Form className='login-form'>
              <br></br>
              <div className='container mt-5'>
              <div data-mdb-input-init class="form-outline mb-4">
                <label className="col-sm-5 col-form-label form-label">Email</label>
                <div className='col-sm-7'>
                  <Field name="email" type="text" className="form-control" placeholder="" required />
                </div>
              </div>

              <div data-mdb-input-init class="form-outline mb-4">
                <label className="col-sm-5 col-form-label">Password</label>
                <div className='col-sm-7'>
                  <Field name="password" type="password" className="form-control" placeholder="" required />
                </div>
              </div>
              <br></br>
              <button type="submit" className='btn btn-primary'>Login</button>
              <br></br>
              </div>
            </Form>
          </Formik>

          
        </div>
      </div>
    </>
  )
}

export default Login
