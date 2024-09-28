import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';


function EmployeeEdit() {
  const {f_id} =useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    f_name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_Gender: '',
    f_Course: ''
  });
  console.log(initialValues);
  // Fetch existing employee data to pre-fill the form
  useEffect(() => {
    console.log("your id:", f_id);
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/employee/${f_id}`);
        console.log(response.data);
        setInitialValues(response.data[0]);  // Set the form's initial values with the existing data
      } catch (error) {
        console.error('Failed to fetch employee data:', error);
      }
    };
 
    fetchEmployeeData();
  }, [f_id]);
  console.log(initialValues);
  // Validation schema
  const validationSchema = Yup.object({
    f_name: Yup.string().required('Name is required'),
    f_Email: Yup.string().email('Invalid email').required('Email is required'),
    f_Mobile: Yup.string().matches(/^[0-9]{10}$/, 'Must be exactly 10 digits').required('Mobile number is required'),
    f_Designation: Yup.string().required('Designation is required'),
    f_Gender: Yup.string().required('Gender is required'),
    f_Course: Yup.string().required('Course is required')
  });

  // Submit handler for updating data
  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      // Call the API to update the employee data
      const response = await axios.put(`http://localhost:4000/employee/updateemployee/${f_id}`, values);
      console.log('Update Response:', response.data);

      // Optional: Show success message to the user
      alert('Employee updated successfully!');
      navigate('/employeelist');
    } catch (error) {
      console.error('Error updating employee data:', error);
      alert('Failed to update employee. Please try again.');
    }

    setSubmitting(false);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className='container mt-5 '>
          <div className="mb-3">
            <label htmlFor="name"  className="form-label">Name</label>
            <Field className="form-control" type="text" id="f_name" name="f_name" />
            <ErrorMessage name="f_name" component="div" />
          </div>

          <div className="mb-3">
            <label htmlFor="email"  className="form-label">Email</label>
            <Field className="form-control" type="email" id="f_Email" name="f_Email" />
            <ErrorMessage name="f_Email" component="div" />
          </div>

          <div className="mb-3">
            <label  className="form-label" htmlFor="mobile">Mobile Number</label>
            <Field className="form-control"  type="text" id="f_Mobile" name="f_Mobile" />
            <ErrorMessage name="f_Mobile" component="div" />
          </div>

          <div className="mb-3">
            <label  className="form-label" htmlFor="designation">Designation</label>
            <Field className="form-select"  as="select" id="f_Designation" name="f_Designation">
              <option value="">Select Designation</option>
              <option value="Developer">Developer</option>
              <option value="Manager">Manager</option>
              <option value="Designer">Designer</option>
            </Field>
            <ErrorMessage name="f_Designation" component="div" />
          </div>

          <div mb-3>
            <label  className="form-label">Gender</label>
            <div role="group">
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

          <div className="mb-3">
            <label  className="form-label" htmlFor="course">Course</label>
            <Field  className="form-control" type="text" id="f_Course" name="f_Course" />
            <ErrorMessage name="f_Course" component="div" />
          </div>

          <button className='btn btn-primary' type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Employee'}
          </button>
          </div>
        </Form>
      )}
    </Formik>
        
    )
}

export default EmployeeEdit