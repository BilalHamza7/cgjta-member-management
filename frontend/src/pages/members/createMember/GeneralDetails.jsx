import React, { useState } from 'react'

import Profile from '../../../assets/profile-male.svg';

const GeneralDetails = ({ switchComponent, joinDate, fullName, email, nicNo, mobileNo, fileChange, onChange }) => {

    const [file, setFile] = useState(null);

    function handleFileChange(e) {
        console.log(e.target.files);
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(URL.createObjectURL(selectedFile));
        }
        fileChange(selectedFile);
    }

    const handleDateChange = (e) => {
        // convert value to iso format
        const date = new Date(e.target.value).toISOString().split("T")[0];
        onChange({ section: "member", field: "joinDate", value: date });
    }

    return (
        <div className='px-5 pb-5 flex justify-between gap-7'>
            <div className="flex flex-col">
                <div className="flex items-center gap-3">
                    <img src={file || Profile} alt="Uploaded preview" className="w-24 h-24 rounded-full object-cover border shadow-sm" />
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <label htmlFor="fileInput" className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded cursor-pointer transition">
                        {file ? "Change Photo" : "Upload Photo"}
                    </label>
                </div>
                {/* Info text */}
                <p className="text-gray-700 text-sm mt-1 w-72">
                    <span className="font-semibold">Important:</span> Please upload a photo that clearly shows your face. This will be used in a professional context.
                </p>
                <label htmlFor="joinDate" className='flex flex-col gap-1 text-lg mt-5'>
                    Join Date*
                    <input type="date" onChange={handleDateChange} value={joinDate} id='joinDate' className='input_style w-72' />
                </label>
                <label htmlFor="fullName" className='flex flex-col gap-1 text-lg mt-7'>
                    Full Name*
                    <input type="text" id='fullName' placeholder='Enter full Name' onChange={(e) => onChange({ section: "member", field: "fullName", value: e.target.value })} value={fullName} className='input_style w-72' />
                </label>
            </div>
            <div className="flex flex-col gap-7">
                {/* Form fields */}
                <label htmlFor="email" className='flex flex-col gap-1 text-lg'>
                    Email*
                    <input type="text" id='email' onChange={(e) => onChange({ section: "member", field: "email", value: e.target.value })} value={email} placeholder='Enter email' className='input_style w-72' />
                </label>
                <label htmlFor="nic" className='flex flex-col gap-1 text-lg'>
                    NIC Number
                    <input type="text" id='nic' onChange={(e) => onChange({ section: "member", field: "nicNumber", value: e.target.value })} value={nicNo} placeholder='Enter NIC number' className='input_style w-72' />
                </label>
                <label htmlFor="mobile" className='flex flex-col gap-1 text-lg'>
                    Mobile Number
                    <input type="text" id='mobile' onChange={(e) => onChange({ section: "member", field: "mobileNumber", value: e.target.value })} value={mobileNo} placeholder='Enter mobile number' className='input_style w-72' />
                </label>

                <button className='button_style' onClick={() => switchComponent('Personal')}>
                    Continue
                </button>
            </div>
        </div>
    )
}

export default GeneralDetails