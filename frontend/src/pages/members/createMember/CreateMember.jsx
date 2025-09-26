import React, { useState } from 'react'

import axios from 'axios';

import GeneralDetails from './GeneralDetails';
import PersonalDetails from './PersonalDetails';
import Register from './Register';
import { supabase } from '../../../supabaseClient';

const CreateMember = ({ isOpen, onClose }) => {

    const token = localStorage.getItem("authToken");

    const [selectedForm, setSelectedForm] = useState('General');
    const [formData, setFormData] = useState({
        member: {
            profileUrl: "",
            fullName: "",
            joinDate: new Date().toISOString().split("T")[0],
            email: "",
            nicNumber: "",
            mobileNumber: "",
            address: "",
            city: "",
            postalCode: "",
            country: "",
            businessName: "",
            businessActivity: "",
            businessType: "Proprietorship/Partnership",
            chinafort: true,
        },
        membership: {
            levelName: "Premier",
            paid: true,
            status: "Active",
            renewalDate: new Date().toISOString().split("T")[0],
            expiryDate: new Date().toISOString().split("T")[0],
        }
    });
    const [profileFile, setProfileFile] = useState(null);

    const handleRegister = async () => {
        console.log("FILELIST", profileFile);
        const safeFullName = formData.member.fullName.replace(/\s+/g, "_");
        const safeFileName = profileFile.name.replace(/\s+/g, "_").replace(/[^\w.-]/g, "");
        const fileName = `profiles/member_${safeFullName}_${safeFileName}`;
        const response = await supabase.storage
            .from("profile-images")
            .upload(fileName, profileFile, {
                cacheControl: "3600",
                upsert: true,
            });

        if (response.error) {
            console.error("Upload failed:", response.error.message);
            return;
        }


        try {
            console.log(formData);
            updateFields({ section: "member", field: "profileUrl", value: fileName });
            if (formData.member?.profileUrl) {
                const response = await axios.post('http://localhost:5276/api/members/registerMember', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response) {
                    handleClose();
                }
            }
        } catch (error) {
            console.error('Error creating member:', error);
        }
    }

    const handleClose = () => {
        setSelectedForm('General');
        onClose();
        window.location.reload();
    }

    const updateFields = ({ section, field, value }) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

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
                    <div className="w-36 bg-[#DDE2C6] flex py-3 flex-col items-center justify-center rounded-lg">
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
                        <GeneralDetails
                            switchComponent={setSelectedForm}
                            joinDate={formData.member.joinDate}
                            fullName={formData.member.fullName}
                            email={formData.member.email}
                            nicNo={formData.member.nicNumber}
                            mobileNo={formData.member.mobileNumber}
                            fileChange={setProfileFile}
                            onChange={updateFields}
                        />
                        :
                        selectedForm === 'Personal' ?
                            <PersonalDetails
                                switchComponent={setSelectedForm}
                                address={formData.member.address}
                                city={formData.member.city}
                                postalCode={formData.member.postalCode}
                                country={formData.member.country}
                                businessName={formData.member.businessName}
                                businessActivity={formData.member.businessActivity}
                                businessType={formData.member.businessType}
                                chinafort={formData.member.chinafort}
                                onChange={updateFields}
                            />
                            :
                            <Register
                                levelName={formData.membership.levelName}
                                paid={formData.membership.paid}
                                onChange={updateFields}
                                register={handleRegister}
                            />}
                </div>
            </div>
        </div>
    )
}

export default CreateMember