import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginS } from 'src/Service/LoginService';
import images from '../../assets/images/logos/tests.png';
import './login.css';
import { Message } from 'primereact/message';
import { Alert } from 'react-bootstrap';
export default function SignInSide() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [test, setTest] = useState('true');
  const Navigate = useNavigate();


  const handleLogin = async () => {
    const response = await loginS(userName, password);

    if (userName === '' || password === '') {
      setErrorMessage('Please enter your username and password.');
      setTest('false')
    } else if (response.success === false) {
      setErrorMessage('wait for active');
      setTest('false')
    
    } else {
      await localStorage.setItem('isLoggedIn', 'true');
      await localStorage.setItem('userId', response.data.id.toString());
     
     
      Navigate('/dashboard');
    }
  };

  const onChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const onChangeHandlerr = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container">
      
      <div className="row">
        <div className="col-md-6 offset-md-3">
          
          <h2 className="text-center text-dark mt-5"> </h2>

          <div className="card my-5">
            <form className="card-body cardbody-color p-lg-5">
              <div className="text-center">
                <img src={images} className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3" width="200px" alt="profile" />
              </div>
         

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="Username"
                  aria-describedby="text"
                  name="username"
                  onChange={onChangeHandler}
                  placeholder="Username"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                  onChange={onChangeHandlerr}
                />
              </div>
              <div className="text-center">
                <button type="button" className="btn btn-color px-5 mb-5 w-100" onClick={handleLogin}>
                  Log In
                </button>
              </div>
              {(test=== 'false') ?(
      <Alert variant="warning">
      {errorMessage}
    </Alert>
              ) :(
                ''
              )}
        
              <div id="emailHelp" className="form-text text-center mb-5 text-dark">
                Not registered yet?{' '}
                <Link to="/auth/register" className="text-dark fw-bold">
                  Create an account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
