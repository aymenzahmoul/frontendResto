import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import photo from './../../assets/images/logos/delivery.gif'

import { Wizard } from "react-wizardry";
import "react-wizardry/dist/react-wizardry.css";
import './login.css';
import { useDispatch,useSelector  } from 'react-redux';
import { Registration } from 'src/redux/actions/authActions';
import images from '../../assets/images/logos/login.png'
export default function SignUp() {
  
  const [user, setUser] = useState({
    username: '',
    password: '',
    authority:'RESTAURANT_AUTHORITY',
    
  });
  const {  username, password ,authority} = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit1 = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/authentication-management/register", user);
   
  };
  const [form, setForm] = useState({
  username: '',
  password: '',
  authority:'RESTAURANT_AUTHORITY',})
  const errors = useSelector(state=>state.errors)
  const dispatch=useDispatch()
  const Navigate = useNavigate()
  const onChangeHandler = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e)=>{
  e.preventDefault();
dispatch(Registration(form,Navigate))
  }
  
  return (
   /* <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h2 className="text-center text-dark mt-5"> </h2>
       
        <div className="card my-5">

        <div className="App">
       

    <Wizard
      onFinish={(val) => console.log(val)}
      strict={false}
      pages={[
        {
          title: "register",
          fields: [
            {
              label: "First Name",
              name: "firstName",
              type: "text",
              isRequired: true
            },
            {
              label: "Last Name",
              name: "lastName",
              type: "text"
            },
        
            {
              label: "Email",
              name: "email",
              type: "email",
              value:{username} ,
              onChange:{onInputChange},
              isRequired: true
            },
            {
              name: "Phone number",
              label: "Phone",
              type: "phone"
            }
          ]
        },
        {
          title: "Employment",
          fields: [
            {
              label: "Company Name",
              name: "companyName",
              type: "text"
            },
            {
              label: "Designation",
              name: "designation",
              type: "text"
            }
          ]
        }, 
      ]}
    />
  </div>
        </div>

      </div>
    </div>
  </div>*/
  <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h2 className="text-center text-dark mt-5"> </h2>
       
        <div className="card my-5">

          <form className="card-body cardbody-color p-lg-4" onSubmit={onSubmit}>

            <div className="text-center">
              <img src={images} class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px" alt="profile"/>
            </div>

            <div className="mb-3">
              <input type="text" class="form-control" id="Username" aria-describedby="text" name='username'
                onChange={onChangeHandler}
                placeholder="User Name"/>
            </div>
            <div className="mb-3">
              
              <input type="password" class="form-control" id="password" placeholder="password" name='password' 
                onChange={onChangeHandler}/>
            </div>
            <div className="mb-3">
              
              <input type="password" class="form-control" id="password" placeholder="password" name='password' 
                onChange={onChangeHandler}/>
            </div>
            <div className="text-center">
              <button type="submit" class="btn btn-color px-5 mb-5 w-100" >register</button>
              </div>
            <div id="emailHelp" class="form-text text-center mb-5 text-dark">   <Link to="/auth/login" className="text-dark fw-bold">
            have a compte
    </Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
  );
}