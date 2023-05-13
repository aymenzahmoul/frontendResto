import axios from 'axios';
import { ERRORS, SET_USER } from '../types';
import jwt_decode from 'jwt-decode'
import { setAuth } from '../../util/setAuth';

export const Registration = (form, navigate)=>dispatch=>{
      axios.post('http://localhost:8080/authentication-management/register', form) 
      .then(res=>{
        navigate('/auth/login')
        dispatch({
            type: ERRORS,
            payload: {}
        })
      })
      .catch(err=>{
          dispatch({
              type: ERRORS,
              payload: err.response.data
          })
      })
}

export const LoginAction = (form)=>dispatch=>{
    axios.post('http://localhost:8080/authentication-management/login', form) 
    .then(res=>{
      const {token} = res.data
      const {id} = res.data
      localStorage.setItem('jwt', "Bearer_ "+ token)
      localStorage.setItem('id', id)
      const decode = jwt_decode("Bearer_ " +token)
      dispatch(setUser(decode))
      console.log(decode)
      
    })
    .catch(err=>{
        dispatch({
            type: ERRORS,
            payload: err.response.data
        })
    })
}


export const Logout = ()=>dispatch=>{
    localStorage.removeItem('jwt')
    localStorage.removeItem('id')
    dispatch({
        type: SET_USER,
        payload: {}
    })
}

export const setUser = (decode)=>({
    type: SET_USER,
    payload: decode
})