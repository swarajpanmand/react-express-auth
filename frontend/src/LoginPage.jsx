import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


const LoginPage = () => {

  const [loginData, setLoginData] =useState({
    username: '',
    password: ''
  });

    const handleLoginChange = (e) => {
      const {name, value} = e.target;
      setLoginData((prevData) =>({
        ...prevData,
        [name]: value
      
      }))
    }

    //submit
    const handleLoginSubmit = async(e) =>{
      e.preventDefault();

      try {
        const response = await axios.post('http://localhost:3000/login', loginData);
        const {success, message} = response.data;
        if(success){
          console.log(message);
        } else {
          console.log(message);
        }
      } catch (error) {
        console.log(error);
      }
      setLoginData({
        username: '',
        password: ''
      })
    }

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <input type='text' placeholder='username' name='username'
        value={loginData.username}
        onChange={handleLoginChange}/>

        <input type='password' placeholder='password' name='password'
        value={loginData.password}
        onChange={handleLoginChange}/>

        <button type='submit'>Login</button>
        <p>
          Not registered? <a href='/register'>Register</a>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
