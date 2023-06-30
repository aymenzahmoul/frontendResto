import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './login.css'
import Alert from '@mui/material/Alert';
import images from '../../assets/images/logos/tests.png'
import { useNavigate } from "react-router";


export default function SignUp() {
 
  const [user, setUser] = useState({
    
    LastName: '',
    username: '',
    Email: '',
    password: '',
    authority: 'RESTAURANT_AUTHORITY',
  });
  let navigate = useNavigate();
 
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
 
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/authentication-management/register", user);
      navigate('/')
    } catch (error) {
      
      console.error(error);
    }
  };

  return (

     <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-dark mt-5"> </h2>
          <div className="card my-5"></div>
        <form className="card-body cardbody-color p-lg-4" onSubmit={onSubmit}>
        <div className="text-center">
          <img
            src={images}
            className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
            width="200px"
            alt="profile"
          />
        </div>
   
        <div className="mb-3">
  <input
    type="text"
    className="form-control"
    id="FirstName"
    placeholder="First Name"
    name="firstName"
    onChange={onInputChange}
  />
</div>
<div className="mb-3">
  <input
    type="text"
    className="form-control"
    id="LastName"
    placeholder="Last Name"
    name="lastName"
    onChange={onInputChange}
  />
</div>

<div className="mb-3">
  <input
    type="email"
    className="form-control"
    id="email"
    placeholder="Email"
    name="email"
    onChange={onInputChange}
  />
</div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="Username"
            aria-describedby="text"
            name="username"
            onChange={onInputChange}
            placeholder="User Name"
          />
        </div>
    
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            name="password"
            onChange={onInputChange}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-color px-5 mb-5 w-100" >
            Register
          </button>
        </div>
        <div id="emailHelp" className="form-text text-center mb-5 text-dark">
          <Link to="/auth/login" className="text-dark fw-bold">
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
        </div>
  );
}
