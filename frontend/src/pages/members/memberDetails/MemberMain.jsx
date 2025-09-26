import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import MemberGeneral from './MemberGeneral';
import MemberPersonal from './MemberPersonal';
import MemberMembership from './MemberMembership';

const MemberMain = () => {

    const location = useLocation();
    const member = location.state?.member;
    const profile = location.state?.profiles;

    const [selectedForm, setSelectedForm] = useState('General');
    const [formData, setFormData] = useState({
        member: {
            memberId: member.memberId,
            profileUrl: member.profileUrl,
            fullName: member.fullName,
            joinDate: member.joinDate,
            email: member.email,
            nicNumber: member.nicNumber,
            mobileNumber: member.mobileNumber,
            address: member.address,
            city: member.city,
            postalCode: member.postalCode,
            country: member.country,
            businessName: member.businessName,
            businessActivity: member.businessActivity,
            businessType: member.businessType,
            chinafort: member.chinafort,
        },
        membership: {
            levelName: member.membership.levelName,
            paid: member.membership.paid,
            status: member.membership.status,
            renewalDate: member.membership.renewalDate,
            expiryDate: member.membership.expiryDate,
        }
    });


    const updateFields = ({ section, field, value }) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    return (
        <div>
            <div className="flex gap-10 items-end">
                <div className="flex flex-col gap-2">
                    <h1 className='text-4xl font-semibold'>Member Details</h1>
                    <h2 className='text-lg'>Update or check details of a member here.</h2>
                </div>
                <button className='py-1 px-3 mb-1 border rounded-lg bg-gray-200 hover:bg-[#edede9] transition' onClick={() => history.back()}>
                    Go Back
                </button>
            </div>
            <div className="my-10 flex gap-10">
                <div className="border rounded-md w-96 h-fit shrink-0 flex flex-col items-center justify-center gap-5 p-5">
                    <img src={profile[member.profileUrl]} alt="" className='w-40 h-40 rounded-full' />
                    <p className='text-2xl text-gray-600 flex gap-4'>ID: <span className='text-black'>CGJTA-{String(formData.member.memberId).padStart(4, "0")}</span></p>
                    <p className='text-2xl text-gray-600 flex gap-4'>Status:
                        <span className='text-black'>
                            {member.membership.status === "Active" ? (
                                <span className="px-2 py-1 text-green-900 bg-green-200 rounded font-medium">
                                    Active
                                </span>
                            ) : formData.membership.status === "Inactive" ? (
                                <span className="px-2 py-1 text-yellow-900 bg-yellow-200 rounded font-medium">
                                    Inactive
                                </span>
                            ) : (
                                <span className="px-2 py-1 text-red-900 bg-red-200 rounded font-medium">
                                    Terminated
                                </span>
                            )}
                        </span>
                    </p>
                </div>
                <div className="w-full">
                    <div className="w-fit">
                        <button className='bg-[#314cb6ee] hover:bg-[#314cb6] transition text-white py-2 px-9 text-2xl rounded-t-md cursor-pointer' onClick={() => setSelectedForm('General')}>
                            General
                        </button>
                        <button className='bg-[#314cb6ee] hover:bg-[#314cb6] transition text-white py-2 px-9 text-2xl rounded-t-md cursor-pointer' onClick={() => setSelectedForm('Personal')}>
                            Personal
                        </button>
                        <button className='bg-[#314cb6ee] hover:bg-[#314cb6] transition text-white py-2 px-9 text-2xl rounded-t-md cursor-pointer' onClick={() => setSelectedForm('Membership')}>
                            Membership
                        </button>
                    </div>
                    {selectedForm === 'General' ?
                        <MemberGeneral
                            joinDate={formData.member.joinDate}
                            fullName={formData.member.fullName}
                            email={formData.member.email}
                            nicNo={formData.member.nicNumber}
                            mobileNo={formData.member.mobileNumber}
                            // fileChange={setProfileFile}
                            onChange={updateFields}
                        />
                        :
                        selectedForm === 'Personal' ?
                            <MemberPersonal
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
                            <MemberMembership
                                levelName={formData.membership.levelName}
                                paid={formData.membership.paid}
                                status={formData.membership.status}
                                renewalDate={formData.membership.renewalDate}
                                expiryDate={formData.membership.expiryDate}
                                onChange={updateFields}
                            // register={handleRegister}
                            />}
                </div>
            </div>
        </div>
    )
}

export default MemberMain