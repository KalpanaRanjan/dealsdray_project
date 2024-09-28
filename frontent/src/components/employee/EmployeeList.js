import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EmployeeList() {
 
    const [employee , setEmployee]= useState([]);
    const [searchItem, setSearchItem] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])

    const fetchEmployeeList = async() =>{
        try {
          
            const response =  await axios.get("http://localhost:4000/employee/employeelist");
            console.log("hhii");
            console.log( JSON.stringify(response.data));
            setEmployee(response.data);
            setFilteredUsers(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

          const deleteProduct= async(f_id) => {
            try {
                const response = await axios.delete(`http://localhost:4000/employee/deletermployee/${f_id}`);
                
                fetchEmployeeList();
                
            }
            catch (error) {
                console.log(error);
            }

        }
    useEffect(() => {
      fetchEmployeeList();
    }, []);
  
    const handleInputChange = (e) => { 
      const searchTerm = e.target.value.toLowerCase();
      setSearchItem(searchTerm);

      const filteredItems = employee.filter((user) =>
        user.f_name.toLowerCase().includes(searchTerm)||
        user.f_Email.toLowerCase().includes(searchTerm)||
        user.f_Gender.toLowerCase().includes(searchTerm)||
        user.f_Mobile.toLowerCase().includes(searchTerm)||
        user.f_Designation.toLowerCase().includes(searchTerm)

      );
  
      setFilteredUsers(filteredItems);
    }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand">
        <img src="https://via.placeholder.com/50" alt="Logo" width="30" height="30" className="d-inline-block align-text-top"/>
      </Link>
    </div>
  </nav>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <div className="navbar-collapse collapse show">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" >Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/employeelist" >Employees List</Link>
          </li>
        </ul>
      </div>
      <div className="d-flex">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" >Username</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" >Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    <div className="container mt-5">
     <div className="row mb-3">
      <div className="col-md-4">
        <input type="text"  value={searchItem} onChange={handleInputChange} id="searchBar" className="form-control" placeholder="Search in table..."/>
      </div>
      <div className="col-md-2">
        <Link to='/employeeadd' className="btn btn-primary">Add Employee</Link>
      </div>
      <div className="col-md-6 text-end">
        <span id="fieldCount">Number of fields: {employee.length}</span>
      </div>
    </div>
    <div className="table-responsive">
      <table className="table table-bordered table-hover" id="myTable">
        <thead>
          <tr>
            <th>f_id </th>
            <th>f_name </th>
            <th>f_Email</th>
            <th>f_Mobile</th>
            <th>f_Designation</th>
            <th>f_Gender</th>
            <th>f_Course</th>
            <th>Action</th>
            
          </tr>
        </thead>
        <tbody>
        {
           filteredUsers.length===0 ?
           <tr>
            No Employee Found
           </tr>:
            filteredUsers.map((temp) => (
            <tr key={temp.f_id}>
                
                <td>{temp.f_id}</td>
                <td>{temp.f_name}</td>
                <td>{temp.f_Email}</td>
                <td>{temp.f_Mobile}</td>
                <td>{temp.f_Designation}</td>
                <td>{temp.f_Gender}</td>
                <td>{temp.f_Course}</td>
                <td>
                <Link className='btn btn-warning ' to={`/employeeedit/${temp.f_id}`}>Edit</Link>
                <button className='btn btn-danger'onClick={()=> deleteProduct(temp.f_id)} >Delete</button>
                </td>

            </tr>
           )) 
        }
        </tbody>
      </table>
    </div>
  </div>

    </>
  )
}

export default EmployeeList
