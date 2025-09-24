import React from 'react'

import Dropdown from '../../components/Dropdown'
import MembersTable from '../../components/MembersTable'


const MembersHome = () => {

  const members = [
    { id: 1, name: "Bilal Hamza", email: "bilal@example.com", level: "Premier", payment: true, mobile: "0771234567" },
    { id: 2, name: "Ahamed Ali", email: "ahamed@example.com", level: "Standard", payment: false, mobile: "0719876543" },
    { id: 3, name: "Nadeem Khan", email: "nadeem@example.com", level: "Basic", payment: true, mobile: "0754567890" },
  ];

  return (
    <div className=''>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className='text-4xl font-semibold'>Members</h1>
          <h2 className='text-lg'>Manage your members here.</h2>
        </div>
        <button className='button_style' accessKey='n' onClick={() => alert('clicked this!')}> Add New Member <span className='font-light text-sm ml-1'>ctrl+N</span></button>
      </div>

      {/* Search filters */}
      <div className="mt-8 flex items-center gap-4">
        <input type="text" placeholder='Search member by ID' className='input_style' />
        <button type="button" aria-label='searchById' className="absolute top-33 left-130 text-3xl text-gray-700 cursor-pointer opacity-70" >&#x1F50D;</button>
        <input type="text" placeholder='Search member by name' className='input_style' />
        <button type="button" aria-label='searchByName' className="absolute top-33 left-205 text-3xl text-gray-700 cursor-pointer opacity-70" >&#x1F50D;</button>
        <Dropdown
          label="All Statuses"
          items={[
            { label: "All Statuses", onClick: () => console.log('dropdown clicked') },
            { label: "Active", onClick: () => console.log('dropdown clicked') },
            { label: "Inactive", onClick: () => console.log('dropdown clicked') },
            { label: "Terminated", onClick: () => console.log('dropdown clicked') },
          ]}
        />
        <Dropdown
          label="All Levels"
          items={[
            { label: "All Levels", onClick: () => console.log('dropdown clicked') },
            { label: "Premier", onClick: () => console.log('dropdown clicked') },
            { label: "Platinum", onClick: () => console.log('dropdown clicked') },
            { label: "Gold", onClick: () => console.log('dropdown clicked') },
            { label: "CGJTA Staff", onClick: () => console.log('dropdown clicked') },
            { label: "Honarary", onClick: () => console.log('dropdown clicked') },
            { label: "General", onClick: () => console.log('dropdown clicked') },
            { label: "Associate", onClick: () => console.log('dropdown clicked') },
          ]}
        />
      </div>

      {/* Members table */}
      <MembersTable members={members} />
    </div>
  )
}

export default MembersHome