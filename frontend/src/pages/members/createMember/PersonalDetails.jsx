import React from 'react'
import Dropdown from '../../../components/Dropdown'

const PersonalDetails = ({ switchComponent }) => {
  return (
    <div className='px-5 pb-5 '>
      <div className='flex justify-between gap-7'>
        <div className="flex flex-col gap-5">
          <label htmlFor="address" className='flex flex-col gap-1 text-lg'>
            Address*
            <textarea rows={2} id='address' placeholder='Enter your email' className='input_style w-72 resize-none' />
          </label>
          <label htmlFor="postalCode" className='flex flex-col gap-1 text-lg'>
            Postal Code
            <input type="text" id='postalCode' placeholder='Enter full Name' className='input_style w-72' />
          </label>
          <label htmlFor="businessName" className='flex flex-col gap-1 text-lg'>
            Business Name*
            <input type="text" id='businessName' placeholder='Enter full Name' className='input_style w-72' />
          </label>
        </div>
        <div className="flex flex-col gap-5">
          {/* Form fields */}
          <label htmlFor="email" className='flex flex-col gap-1 text-lg'>
            Email*
            <input type="text" id='email' placeholder='Enter email' className='input_style w-72' />
          </label>
          <label htmlFor="nic" className='flex flex-col gap-1 text-lg'>
            NIC Number
            <input type="text" id='nic' placeholder='Enter NIC number' className='input_style w-72' />
          </label>
          <label htmlFor="address" className='flex flex-col gap-1 text-lg'>
            Primary Business Activity*
            <select name="" id="" className='p-2 rounded w-72 bg-gray-200 text-lg shadow-sm'>
              <option value="">EXPORT TRADING- Primarily involved in exporting goods purchased locally.</option>
              <option value="">IMPORT TRADING- Primarily involved in importing goods from Africa/Other countries for local trading.</option>
              <option value="">LOCAL TRADING- Primarily involved in buying & selling locally.</option>
              <option value="">MANUFACTURING- Lapidary, mining, workshop (e.g. heating/goldsmith).</option>
              <option value="">BROKER- Primarily involved in Trading goods of others, Buyer/Seller handling agent.</option>
              <option value="">SUPPORT INDUSTRY- Gemological service, tools & equipment, shipping/handling agent, landlord.</option>
              <option value="">BUYER- International repeat visitor.</option>
            </select>
          </label>
        </div>
      </div>
      <div className="flex justify-between mt-5">
        {/* Business Type Checkboxes */}
        <div className="flex flex-col gap-2 text-lg">
          <span>Business Type</span>
          <label className="flex items-center gap-2">
            <input type="checkbox" id="businessType1" name="businessType" className="w-5 h-5 rounded" />
            Proprietorship/Partnership
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" id="businessType2" name="businessType" className="w-5 h-5 rounded" />
            Limited Liability/Public Limited
          </label>
        </div>

        {/* Chinafort Radio */}
        <div className="flex flex-col gap-2 text-lg">
          <span>Chinafort?</span>
          <label className="flex items-center gap-2">
            <input type="radio" id="chinafortYes" name="chinafort" className="w-5 h-5 rounded" />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" id="chinafortNo" name="chinafort" className="w-5 h-5 rounded" />
            No
          </label>
        </div>

        {/* Continue Button */}
        <button
          className="button_style mt-3"
          onClick={() => switchComponent("Register")}
        >
          Continue
        </button>
      </div>

    </div>

  )
}

export default PersonalDetails