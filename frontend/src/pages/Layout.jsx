import React from 'react'
import { NavLink, Outlet } from 'react-router'

import DashboardIcon from '../assets/dashboard.svg';
import MembersIcon from '../assets/member-filled.svg';
import LevelsIcon from '../assets/subscription-cashflow-solid.svg';
import SettingsIcon from '../assets/setting.svg';
import LogoutIcon from '../assets/logout-box-fill.svg';
import logo from '../assets/logo.png'

const Layout = () => {

  const linkClasses = "flex items-center gap-3 w-full rounded-lg p-2 transition-all ease-in duration-150";

  return (
    <div className='flex'>
      <div className="bg-[#DDE2C6] w-64 h-screen p-5 flex flex-col justify-between">
        <div className="flex flex-col">
          <img src={logo} className='h-10' />

          <NavLink to='/dashboard' className={({ isActive }) => `${linkClasses} mt-12 ${isActive ? 'bg-[#CFD6C2]' : 'hover:bg-[#CFD6C2]'}`}>
            <img src={DashboardIcon} alt="" className='h-8 opacity-80' />
            <span className='text-2xl'>Dashboard</span>
          </NavLink>
          <NavLink to='/members' className={({ isActive }) => `${linkClasses} mt-8 ${isActive ? 'bg-[#CFD6C2]' : 'hover:bg-[#CFD6C2]'}`}>
            <img src={MembersIcon} alt="" className='h-8 opacity-80' />
            <span className='text-2xl'>Members</span>
          </NavLink>
          <NavLink to='/levels' className={({ isActive }) => `${linkClasses} mt-8 ${isActive ? 'bg-[#CFD6C2]' : 'hover:bg-[#CFD6C2]'}`}>
            <img src={LevelsIcon} alt="" className='h-8 opacity-80' />
            <span className='text-2xl'>Levels</span>
          </NavLink>
        </div>

        <div className="flex flex-col">
          <NavLink to='/settings' className={({ isActive }) => `${linkClasses} ${isActive ? 'bg-[#CFD6C2]' : 'hover:bg-[#CFD6C2]'}`}>
            <img src={SettingsIcon} alt="" className='h-8 opacity-80' />
            <span className='text-2xl'>Settings</span>
          </NavLink>
          <NavLink to='/' className={({ isActive }) => `${linkClasses} mt-8 ${isActive ? 'bg-[#CFD6C2]' : 'hover:bg-[#CFD6C2]'}`}>
            <img src={LogoutIcon} alt="" className='h-8 opacity-80' />
            <span className='text-2xl'>Log Out</span>
          </NavLink>
        </div>
      </div>

      <div className="flex-1 p-5 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout