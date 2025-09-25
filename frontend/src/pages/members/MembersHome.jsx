import React, { useEffect, useState } from 'react'
import axios from 'axios';

import Dropdown from '../../components/Dropdown'
import MembersTable from '../../components/MembersTable'
import CreateMember from './createMember/CreateMember'

const MembersHome = () => {

  const [openCreatePanel, setOpenCreatePanel] = useState(false);

  const [searchId, setSearchId] = useState();
  const [searchName, setSearchName] = useState('');
  const [searchStatus, setSearchStatus] = useState('0');
  const [searchLevel, setSearchLevel] = useState('0');
  // const [pageNo, setPageNo] = useState(1);

  const [members, setMembers] = useState({});

  const getMembers = async () => {
    try {
      const response = await axios.get('http://localhost:5276/api/members/getAllMembers', {
        params: {
          memberID: searchId || '',      // send empty string if 0
          fullName: searchName || '',
          status: searchStatus || '',
          level: searchLevel || '',
          page: 1
        }
      });
      if (response.data) {
        console.log(response.data);
        setMembers(response.data);
      }
      else
        console.log("No data found");
    } catch (error) {
      console.error('Error fetching members data:', error);
    }
  }

  useEffect(() => {
    // Fetch members data using axios from the backend API
    getMembers();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className='text-4xl font-semibold'>Members</h1>
          <h2 className='text-lg'>Manage your members here.</h2>
        </div>
        <button className='button_style' accessKey='n' onClick={() => setOpenCreatePanel(true)}> Add New Member <span className='font-light text-sm ml-1'>alt+N</span></button>
      </div>

      <CreateMember isOpen={openCreatePanel} onClose={() => setOpenCreatePanel(false)} />

      {/* Search filters */}
      <div className="mt-8 flex items-center gap-4">
        <input type="text" placeholder='Search member by ID' className='input_style w-72' onChange={(e) => setSearchId(e.target.value)} value={searchId} />
        <button type="button" aria-label='searchById' className="absolute top-33 left-130 text-3xl text-gray-700 cursor-pointer opacity-70" >&#x1F50D;</button>
        <input type="text" placeholder='Search member by name' className='input_style w-72' onChange={(e) => setSearchName(e.target.value)} value={searchName} />
        <button type="button" aria-label='searchByName' className="absolute top-33 left-205 text-3xl text-gray-700 cursor-pointer opacity-70" onClick={getMembers} >&#x1F50D;</button>
        <Dropdown
          label="All Statuses"
          items={[
            { label: "All Statuses", onClick: () => console.log('dropdown clicked') },
            { label: "Active", onClick: () => console.log('dropdown clicked') },
            { label: "Inactive", onClick: () => console.log('dropdown clicked') },
            { label: "Terminated", onClick: () => console.log('dropdown clicked') },
          ]}
          onChange={setSearchStatus}
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
          onChange={setSearchLevel}
        />
      </div>

      {/* Members table */}
      <MembersTable members={members} />
    </>
  )
}

export default MembersHome