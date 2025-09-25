import React from 'react'
import Dropdown from '../../../components/Dropdown'

const PersonalDetails = ({ switchComponent, address, city, postalCode, country, businessName, businessActivity, businessType, chinafort, onChange }) => {
  return (
    <div className='px-5 pb-5 '>
      <div className='flex justify-between gap-7'>
        <div className="flex flex-col gap-5">
          <label htmlFor="address" className='flex flex-col gap-1 text-lg'>
            Address*
            <textarea rows={2} id='address' onChange={(e) => onChange({ section: "member", field: "address", value: e.target.value })} value={address} placeholder='Enter address here' className='input_style w-72 resize-none' />
          </label>
          <label htmlFor="postalCode" className='flex flex-col gap-1 text-lg'>
            Postal Code
            <input type="text" id='postalCode' onChange={(e) => onChange({ section: "member", field: "postalCode", value: e.target.value })} value={postalCode} placeholder='Enter postal code' className='input_style w-72' />
          </label>
          <label htmlFor="businessName" className='flex flex-col gap-1 text-lg'>
            Business Name*
            <input type="text" id='businessName' onChange={(e) => onChange({ section: "member", field: "businessName", value: e.target.value })} value={businessName} placeholder='Enter business name' className='input_style w-72' />
          </label>
        </div>
        <div className="flex flex-col gap-5">
          {/* Form fields */}
          <label htmlFor="city" className='flex flex-col gap-1 text-lg'>
            City*
            <input type="text" id='city' onChange={(e) => onChange({ section: "member", field: "city", value: e.target.value })} value={city} placeholder='Enter member city' className='input_style w-72' />
          </label>
          <label htmlFor="country" className='flex flex-col gap-1 text-lg'>
            Country
            <input type="text" id='country' onChange={(e) => onChange({ section: "member", field: "country", value: e.target.value })} value={country} placeholder='Enter member country' className='input_style w-72' />
          </label>
          <label htmlFor="businessActivity" className='flex flex-col gap-1 text-lg'>
            Primary Business Activity*
            <select id="businessActivity" className='p-2 rounded w-72 bg-gray-200 text-lg shadow-sm' onChange={(e) => onChange({ section: "member", field: "businessActivity", value: e.target.value })} value={businessActivity}>
              <option value="export">EXPORT TRADING- Primarily involved in exporting goods purchased locally.</option>
              <option value="import">IMPORT TRADING- Primarily involved in importing goods from Africa/Other countries for local trading.</option>
              <option value="local">LOCAL TRADING- Primarily involved in buying & selling locally.</option>
              <option value="manufacturing">MANUFACTURING- Lapidary, mining, workshop (e.g. heating/goldsmith).</option>
              <option value="broker">BROKER- Primarily involved in Trading goods of others, Buyer/Seller handling agent.</option>
              <option value="support">SUPPORT INDUSTRY- Gemological service, tools & equipment, shipping/handling agent, landlord.</option>
              <option value="buyer">BUYER- International repeat visitor.</option>
            </select>
          </label>
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <div className="flex flex-col gap-2 text-lg">
          <span>Business Type</span>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              id="businessType1"
              name="businessType"
              defaultChecked
              className="w-5 h-5 rounded"
              value={businessType === "Proprietorship/Partnership"}
              onChange={() =>
                onChange({ section: "member", field: "businessType", value: "Proprietorship/Partnership" })
              }
            />
            Proprietorship/Partnership
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              id="businessType2"
              name="businessType"
              className="w-5 h-5 rounded"
              value={businessType === "Limited Liability/Public Limited"}
              onChange={() =>
                onChange({ section: "member", field: "businessType", value: "Limited Liability/Public Limited" })
              }
            />
            Limited Liability/Public Limited
          </label>
        </div>

        {/* Chinafort Radio */}
        <div className="flex flex-col gap-2 text-lg">
          <span>Chinafort?</span>
          <label className="flex items-center gap-2">
            <input type="radio" id="chinafortYes" defaultChecked value={chinafort} className="w-5 h-5 rounded" onChange={() => onChange({ section: "member", field: "chinafort", value: true })} name="chinafort" />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" id="chinafortNo" value={!chinafort} className="w-5 h-5 rounded" onChange={() => onChange({ section: "member", field: "chinafort", value: false })} name="chinafort" />
            No
          </label>
        </div>

        {/* Continue Button */}
        <button className="button_style mt-3" onClick={() => switchComponent("Register")}>
          Continue
        </button>
      </div>

    </div >

  )
}

export default PersonalDetails