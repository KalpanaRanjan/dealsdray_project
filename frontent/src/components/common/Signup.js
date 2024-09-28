import React ,{useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    let navigate = useNavigate();
    const [Cred, setCred] = useState({username:"",email:"", password:""});

    const onChange = (e) => {
        setCred({ ...Cred, [e.target.name]: e.target.value })
        console.log(Cred);
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const url = 'http://localhost:4000/auth/signup';
    try {
      const response = await axios.post(url, Cred);
      console.log(response.data);
      if (response.status === 201) {
        navigate('/login');
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

    return (
        <div>
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
                        <Link className="nav-link" to="/login">Login</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              <div className="container-fluid">
                <h2 className='text-center'>Sign Up</h2>
              </div>
            <div className="container mt-5">
                <form className='col-md-6 m-auto' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">UserName</label>
                        <input type="text" className="form-control" id="username" name='username'  value={Cred.username} onChange={onChange} aria-describedby="emailHelp" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' value={Cred.email}  onChange={onChange} aria-describedby="emailHelp" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password"  value={Cred.password} onChange={onChange} name='password' required minLength={5}/>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
