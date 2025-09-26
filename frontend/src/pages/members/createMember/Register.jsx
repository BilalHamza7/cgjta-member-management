import React from 'react'

const Register = ({ levelName, paid, onChange, register }) => {

  const today = new Date();
  const joinDate = today.toISOString().split("T")[0];

  //set expiry as per level
  const levels = {
    "Premier": { price: 100000, validity: 5, from: joinDate, to: new Date(today.getFullYear() + 5, today.getMonth(), today.getDate()).toISOString().split("T")[0] },
    "Platinum": { price: 50000, validity: 3, from: joinDate, to: new Date(today.getFullYear() + 3, today.getMonth(), today.getDate()).toISOString().split("T")[0] },
    "Gold": { price: 25000, validity: 2, from: joinDate, to: new Date(today.getFullYear() + 2, today.getMonth(), today.getDate()).toISOString().split("T")[0] },
    "CGJTA Staff": { price: 0, validity: 1, from: joinDate, to: new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()).toISOString().split("T")[0] },
    "Honarary": { price: 0, validity: 1, from: joinDate, to: new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()).toISOString().split("T")[0] },
    "General": { price: 10000, validity: 1, from: joinDate, to: new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()).toISOString().split("T")[0] },
    "Associate": { price: 5000, validity: 1, from: joinDate, to: new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()).toISOString().split("T")[0] },
  };

  const handleLevelChange = (e) => {
    const selectedLevel = e.target.value;
    onChange({ section: "membership", field: "levelName", value: selectedLevel });
    // update renewal and expiry date lgd on level
    const expiryDate = levels[selectedLevel].to;
    const renewalDate = levels[selectedLevel].from;
    onChange({ section: "membership", field: "expiryDate", value: expiryDate });
    onChange({ section: "membership", field: "renewalDate", value: renewalDate });
  }

  return (
    <div className='px-32 pb-5 flex flex-col items-center'>
      <label htmlFor="membership" className='flex flex-col gap-1 text-lg'>
        Membership Level*
        <select name="" id="" className='p-2 rounded w-72 bg-gray-200 text-lg shadow-sm' onChange={handleLevelChange} value={levelName}>
          <option value="Premier">Premier</option>
          <option value="Platinum">Platinum</option>
          <option value="Gold">Gold</option>
          <option value="CGJTA Staff">CGJTA Staff</option>
          <option value="Honarary">Honarary</option>
          <option value="General">General</option>
          <option value="Associate">Associate</option>
        </select>
      </label>
      <div className="flex flex-col gap-2 mt-5 w-full">
        <label className='text-sm font-medium text-gray-600 flex gap-5 items-center'>Level:
          <span className='text-black font-black text-lg'>{levelName}</span>
        </label>
        <label className='text-sm font-medium text-gray-600 flex gap-5 items-center'>Amount:
          <span className='text-black font-black text-lg'>LKR. {levels[levelName].price || 0}</span>
        </label>
        <label className='text-sm font-medium text-gray-600 flex gap-5 items-center'>Validity:
          <span className='text-black font-black text-lg'>{levels[levelName].validity || 0} year(s)</span>
        </label>
        <label className='text-sm font-medium text-gray-600 flex gap-5 items-center'>Valid From:
          <span className='text-black font-black text-lg'>{levels[levelName].from}</span>
        </label>
        <label className='text-sm font-medium text-gray-600 flex gap-5 items-center'>To:
          <span className='text-black font-black text-lg'>{levels[levelName].to}</span>
        </label>
      </div>
      <p className='text-lg mt-3 w-full'>Paid?</p>
      <div className="flex gap-5 text-lg w-full">
        <label className="flex items-center gap-2">
          <input type="radio" id="paidYes" name="paid" defaultChecked value={paid && true} className="w-5 h-5 rounded" onChange={() => onChange({ section: "membership", field: "paid", value: true })} />
          Yes
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" id="paidNo" name="paid" value={paid && false} className="w-5 h-5 rounded" onChange={() => onChange({ section: "membership", field: "paid", value: false })} />
          No
        </label>
      </div>
      <button className='button_style w-full mt-5' onClick={register}>
        Register
      </button>
    </div>
  )
}

export default Register