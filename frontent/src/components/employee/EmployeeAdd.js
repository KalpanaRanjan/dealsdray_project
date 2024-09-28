import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function EmployeeAdd() {
    const navigate = useNavigate();
    const validationSchema = Yup.object({
      f_name: Yup.string().required('Name is required'),
      f_Email: Yup.string().email('Invalid email').required('Email is required'),
      f_Mobile: Yup.string().matches(/^[0-9]{10}$/, 'Must be exactly 10 digits').required('Mobile number is required'),
      f_Designation: Yup.string().required('Designation is required'),
      f_Gender: Yup.string().required('Gender is required'),
      f_Course: Yup.string().required('Course is required')
    });
  
    // Initial values
    const initialValues = {
      f_name: '',
      f_Email: '',
      f_Mobile: '',
      f_Designation: '',
      f_Gender: '',
      f_Course: ''
    };
  
    // Submit handler
    const onSubmit = async (values, { setSubmitting, resetForm }) => {
      try {
        // Call the API to add the employee data
        const response = await axios.post('http://localhost:4000/employee/addemployee', values);
        console.log('API Response:', response.data);
  
        // Optional: Reset the form after successful submission
        resetForm();
  
        // Optional: Show success message to user
        alert('Employee added successfully!');
        navigate('/employeelist');
      } catch (error) {
        console.error('Error submitting the form:', error);
        alert('Failed to add employee. Please try again.');
      }
  
      setSubmitting(false);
    };
  
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
        <Form>
          <div className='container mt-5'>
          <div className="mb-3">
            <label  className="form-label" htmlFor="name">Name</label>
            <Field className="form-control" type="text" id="f_name" name="f_name" />
            <ErrorMessage name="f_name" component="div" />
          </div>
  
          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email</label>
            <Field className="form-control" type="email" id="f_Email" name="f_Email" />
            <ErrorMessage name="f_Email" component="div" />
          </div>
  
          <div className="mb-3">
            <label className="form-label" htmlFor="mobile">Mobile Number</label>
            <Field className="form-control" type="text" id="f_Mobile" name="f_Mobile" />
            <ErrorMessage name="f_Mobile" component="div" />
          </div>
  
          <div className='mb-3'>
            <label  className="form-label" htmlFor="designation">Designation</label>
            <Field className="form-select"  as="select" id="f_Designation" name="f_Designation">
              <option value="">Select Designation</option>
              <option value="Developer">Developer</option>
              <option value="Manager">Manager</option>
              <option value="Designer">Designer</option>
            </Field>
            <ErrorMessage name="designation" component="div" />
          </div>
  
          <div className="mb-3">
            <label  className="form-label">Gender</label>
            <div role="group" >
              <label>
                <Field  className="form-check-input" type="radio" name="f_Gender" value="male" />
                Male
              </label>
              <label>
                <Field className="form-check-input" type="radio" name="f_Gender" value="female" />
                Female
              </label>
            </div>
            <ErrorMessage name="f_Gender" component="div" />
          </div>
  
          <div mb-3>
            <label  className="form-label" htmlFor="course">Course</label>
            <Field className="form-control" type="text" id="f_Course" name="f_Course" />
            <ErrorMessage name="f_Course" component="div" />
          </div>
  
          <button className='btn btn-primary' type="submit">Submit</button>
          </div>
        </Form>
        )}
      </Formik>
  );
};

export default EmployeeAdd