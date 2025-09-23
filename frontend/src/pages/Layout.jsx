import React from 'react'
import { Outlet } from 'react-router'

import dashboardIcon from '../assets/dashboard.svg';
import MembersIcon from '../assets/member-filled.svg';
import LevelsIcon from '../assets/subscription-cashflow-solid.svg';
import SettingsIcon from '../assets/setting.svg';
import LogoutIcon from '../assets/logout-box-fill.svg';
import logo from '../assets/logo.png'

const Layout = () => {
  return (
    <div className='flex'>
      <div className="bg-[#DDE2C6] w-64 h-screen p-5 flex flex-col justify-between">
        <div className="flex flex-col">
          <img src={logo} className='h-10' />

          <button className='flex items-center gap-3 mt-12 w-full rounded-lg p-2 hover:bg-[#CFD6C2] transition-all ease-in duration-150 '>
            <img src={dashboardIcon} alt="" className='h-9' />
            <span className='text-2xl font-semibold'>Dashboard</span>
          </button>
          <button className='flex items-center gap-3 mt-8 w-full rounded-lg p-2 hover:bg-[#CFD6C2] transition-all ease-in duration-150 '>
            <img src={MembersIcon} alt="" className='h-9' />
            <span className='text-2xl font-semibold'>Members</span>
          </button>
          <button className='flex items-center gap-3 mt-8 w-full rounded-lg p-2 hover:bg-[#CFD6C2] transition-all ease-in duration-150 '>
            <img src={LevelsIcon} alt="" className='h-9' />
            <span className='text-2xl font-semibold'>Levels</span>
          </button>
        </div>
        <div className="flex flex-col">
          <button className='flex items-center gap-3 mt-12 w-full rounded-lg p-2 hover:bg-[#CFD6C2] transition-all ease-in duration-150 '>
            <img src={SettingsIcon} alt="" className='h-9' />
            <span className='text-2xl font-semibold'>Settings</span>
          </button>
          <button className='flex items-center gap-3 mt-8 w-full rounded-lg p-2 hover:bg-[#CFD6C2] transition-all ease-in duration-150 '>
            <img src={LogoutIcon} alt="" className='h-9' />
            <span className='text-2xl font-semibold'>Log Out</span>
          </button>
        </div>
      </div>

      <Outlet />
    </div>
  )
}

export default Layout