import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  }

  return (
    <div className='h-screen bg-[#DDE2C6] flex flex-col items-center relative'>
      <img src={logo} className='absolute top-5 left-5 h-10' />

      <div className="bg-white mt-24 w-2/5 px-3 py-8 rounded shadow-lg flex justify-center">
        <form onSubmit={handleSubmit} className='flex flex-col items-center'>
          <h1 className='font-semibold text-3xl text-center '>Login</h1>
          <h3 className='font-light mt-1'>Enter your credentials to login!</h3>
          <label htmlFor="email" className='flex flex-col gap-1 text-xl mt-5'>
            Email
            <input type="text" id='email' placeholder='Enter you email' className='p-2 text-lg bg-gray-300 rounded w-72' />
          </label>
          <label htmlFor="password" className="flex flex-col gap-1 text-xl relative mt-3">
            Password
            <input type={showPassword ? "text" : "password"} id="password" className="p-2 text-lg bg-gray-300 rounded w-72"/>
            <button type="button" tabIndex="-1" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-11 text-sm text-gray-700" >
              {showPassword ? "Hide" : "Show"}
            </button>
          </label>
          <button type='submit' className='bg-[#314CB6] text-white py-2 px-9 text-2xl rounded w-full mt-5'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login