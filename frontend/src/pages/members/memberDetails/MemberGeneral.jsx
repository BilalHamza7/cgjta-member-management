import React from 'react'

const MemberGeneral = ({ joinDate, fullName, email, nicNo, mobileNo, onChange }) => {
    return (
        <div className='border rounded-b-lg rounded-tr-lg w-full p-5'>
            <h1 className='text-3xl'>General Details</h1>
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <label htmlFor="joinDate" className='flex flex-col gap-1 text-lg mt-5'>
                        Join Date*
                        <input type="date" value={joinDate} id='joinDate' className='input_style w-72' />
                    </label>
                    <label htmlFor="fullName" className='flex flex-col gap-1 text-lg mt-5'>
                        Full Name*
                        <input type="text" id='fullName' placeholder='Enter full Name' onChange={(e) => onChange({ section: "member", field: "fullName", value: e.target.value })} value={fullName} className='input_style w-72' />
                    </label>
                    <label htmlFor="email" className='flex flex-col gap-1 text-lg mt-5'>
                        Email*
                        <input type="text" id='email' onChange={(e) => onChange({ section: "member", field: "email", value: e.target.value })} value={email} placeholder='Enter email' className='input_style w-72' />
                    </label>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="nic" className='flex flex-col gap-1 text-lg mt-5'>
                        NIC Number
                        <input type="text" id='nic' onChange={(e) => onChange({ section: "member", field: "nicNumber", value: e.target.value })} value={nicNo} placeholder='Enter NIC number' className='input_style w-72' />
                    </label>
                    <label htmlFor="mobile" className='flex flex-col gap-1 text-lg mt-5'>
                        Mobile Number
                        <input type="text" id='mobile' onChange={(e) => onChange({ section: "member", field: "mobileNumber", value: e.target.value })} value={mobileNo} placeholder='Enter mobile number' className='input_style w-72' />
                    </label>
                    <button className='button_style mt-12 opacity-50' onClick={() => alert('Update Feature Will Be Available Soon!')}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MemberGeneral