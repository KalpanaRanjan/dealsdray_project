import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from "formik";
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
              <div className="form-outline mb-4">
                <label className="col-sm-5 col-form-label">Email</label>
                <div className='col-sm-7'>
                  <Field name="email" type="text" className="form-control" placeholder="" required />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-5 col-form-label">Password</label>
                <div className='col-sm-7'>
                  <Field name="password" type="password" className="form-control" placeholder="" required />
                </div>
              </div>
              <br></br>
              <button type="submit" className='btn btn-primary'>Login</button>
              <br></br>
            </Form>
          </Formik>

          
        </div>
      </div>
    </>
  )
}

export default Login
