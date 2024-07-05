import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const RegisterPage = () => {
  const [registrationData, setRegistrationData] = useState({ 
    username: '',
    password: ''
  });

  const handleRegistrationChange  = (e) => {
    const {name, value} = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value
    }))
    
  }

  const handleRegistrationSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', registrationData);
      console.log(response.data);
    } catch (error) {
      console.error("Registration error:", error.response ? error.response.data : error.message);
    }
    setRegistrationData({
      username: '',
      password: '',
    })

  }

  return (
    <div className='container'>
      <h1>Register</h1>
      <form onSubmit={handleRegistrationSubmit}>
        <input type='text' placeholder='username' value={registrationData.username} name='username' required onChange={handleRegistrationChange}/>
        <input type='password' placeholder='password' value={registrationData.password} name='password' required onChange={handleRegistrationChange}/>
        <button type='submit'>Register</button>
        <p>
          already registered? <Link to='/login'>Login</Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
