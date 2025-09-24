import React from 'react'

const Register = () => {

  //set expiry as per level
  
  return (
    <div className='px-32 pb-5 flex flex-col items-center'>
      <label htmlFor="membership" className='flex flex-col gap-1 text-lg'>
        Membership Level*
        <select name="" id="" className='p-2 rounded w-72 bg-gray-200 text-lg shadow-sm'>
          <option value="premier">Premier</option>
          <option value="platinum">Platinum</option>
          <option value="gold">Gold</option>
          <option value="staff">CGJTA Staff</option>
          <option value="honarary">Honarary</option>
          <option value="general">General</option>
          <option value="associate">Associate</option>
        </select>

      </label>
    </div>
  )
}

export default Register