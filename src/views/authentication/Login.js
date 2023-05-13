import React ,{useState} from 'react';
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
import axios from 'axios';
import './login.css';
import photo from '../../assets/images/logos/Serious.gif'
import { useNavigate } from 'react-router';
import { login } from 'src/Service/LoginService';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from 'src/redux/actions/authActions';
import images from '../../assets/images/logos/login.png'
export default function SignInSide() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }
  
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  
  function handleErrorMessage(error) {
    setErrorMsg(error);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
  
    login( username , password
    )
    navigate('/')
    
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      handleErrorMessage(error.response.data.message);
    });
  }
  const [form, setForm] = useState({})
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
  dispatch(LoginAction(form))
  }
  
  return (
    
   /*<MDBContainer fluid>

    <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
      <MDBCardBody>
        <MDBRow>
          <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

            <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

            <div className="d-flex flex-row align-items-center mb-4 ">
              <MDBIcon fas icon="user me-3" size='lg'/>
              <MDBInput label='Your Name' id='username' name='username'  type='text' className='w-100' value={username} 
                onChange={handleUsernameChange}/>
            </div>

           

            <div className="d-flex flex-row align-items-center mb-4">
              <MDBIcon fas icon="lock me-3" size='lg'/>
              <MDBInput label='Password' id='password' type='password' name='password'  value={password} 
                onChange={handlePasswordChange}/>
            </div>

           

            <div className='mb-4'>
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
            </div>

            <MDBBtn className='mb-4' size='lg' onClick={handleSubmit}>login</MDBBtn>

          </MDBCol>

          <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
            <MDBCardImage src={photo} fluid/>
          </MDBCol>

        </MDBRow>
      </MDBCardBody>
    </MDBCard>

  </MDBContainer>*/
  <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h2 className="text-center text-dark mt-5"> </h2>
       
        <div className="card my-5">

          <form className="card-body cardbody-color p-lg-5" onSubmit={onSubmit}>

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
            <div className="text-center"><button type="submit" class="btn btn-color px-5 mb-5 w-100" >Login</button></div>
            <div id="emailHelp" class="form-text text-center mb-5 text-dark">Not
              Registered?     <Link to="/auth/register" className="text-dark fw-bold">
      Create an Account
    </Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
  
  );
}