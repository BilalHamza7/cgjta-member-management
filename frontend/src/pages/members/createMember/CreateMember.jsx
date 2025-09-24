import React, { useState } from 'react'
import GeneralDetails from './GeneralDetails';
import PersonalDetails from './PersonalDetails';
import Register from './Register';

const CreateMember = ({ isOpen, onClose }) => {

    const [selectedForm, setSelectedForm] = useState('General');

    const handleClose = () => {
        setSelectedForm('General');
        onClose();
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            {/* White panel */}
            <div className="bg-white w-fit rounded-lg shadow-lg relative">
                {/* Close button */}
                <button onClick={handleClose} className="absolute top-3 right-3 cursor-pointer text-3xl">
                    ✕
                </button>

                {/* Panel header */}
                <h1 className="font-semibold text-3xl text-center mt-3">Add New Member</h1>
                <h3 className='font-light text-center mb-5'>Fill in the following information to complete the registration process</h3>
                <div className="flex">
                    <div className="w-36 bg-[#DDE2C6] flex py-3 flex-col items-center rounded-lg">
                        <button tabIndex={-1} className={`${selectedForm == 'General' ? 'bg-amber-200' : 'bg-[#acadaa]'} py-5 w-28 text-xl font-semibold mx-5 rounded-md cursor-pointer`} onClick={() => setSelectedForm('General')}>
                            General
                        </button>
                        <span className='text-4xl my-3'>&darr;</span>
                        <button tabIndex={-1} className={`${selectedForm == 'Personal' ? 'bg-red-200' : 'bg-[#acadaa]'} py-5 w-28 text-xl font-semibold mx-5 rounded-md cursor-pointer`} onClick={() => setSelectedForm('Personal')}>
                            Personal
                        </button>
                        <span className='text-4xl my-3'>&darr;</span>
                        <button tabIndex={-1} className={`${selectedForm == 'Register' ? 'bg-[#314cb6ee]' : 'bg-[#acadaa]'} py-5 w-28 text-xl font-semibold mx-5 rounded-md cursor-pointer`} onClick={() => setSelectedForm('Register')}>
                            Register
                        </button>
                    </div>

                    {selectedForm === 'General' ?
                        <GeneralDetails switchComponent={setSelectedForm} />
                        :
                        selectedForm === 'Personal' ?
                            <PersonalDetails switchComponent={setSelectedForm} />
                            :
                            <Register switchComponent={setSelectedForm} />}
                </div>

            </div>
        </div>
    )
}

export default CreateMember