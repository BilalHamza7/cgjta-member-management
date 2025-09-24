import React, { useState } from 'react'

import Profile from '../../../assets/profile-male.svg';

const GeneralDetails = ({ switchComponent }) => {

    const [file, setFile] = useState(null);

    function handleChange(e) {
        console.log(e.target.files);
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(URL.createObjectURL(selectedFile));
        }
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
                        onChange={handleChange}
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
                    <input type="date" defaultValue={new Date().toISOString().split("T")[0]} onChange={(e) => alert(e.target.value)} id='joinDate' placeholder='Enter your email' className='input_style w-72' />
                </label>
                <label htmlFor="fullName" className='flex flex-col gap-1 text-lg mt-7'>
                    Full Name*
                    <input type="text" id='fullName' placeholder='Enter full Name' className='input_style w-72' />
                </label>
            </div>
            <div className="flex flex-col gap-7">
                {/* Form fields */}
                <label htmlFor="email" className='flex flex-col gap-1 text-lg'>
                    Email*
                    <input type="text" id='email' placeholder='Enter email' className='input_style w-72' />
                </label>
                <label htmlFor="nic" className='flex flex-col gap-1 text-lg'>
                    NIC Number
                    <input type="text" id='nic' placeholder='Enter NIC number' className='input_style w-72' />
                </label>
                <label htmlFor="mobile" className='flex flex-col gap-1 text-lg'>
                    Mobile Number
                    <input type="text" id='mobile' placeholder='Enter mobile number' className='input_style w-72' />
                </label>

                <button className='button_style' onClick={() => switchComponent('Personal')}>
                    Continue
                </button>
            </div>
        </div>
    )
}

export default GeneralDetails