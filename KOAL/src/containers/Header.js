import { themeChange } from 'theme-change'
import React, {  useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BellIcon  from '@heroicons/react/24/outline/BellIcon'
import Bars3Icon  from '@heroicons/react/24/outline/Bars3Icon'
import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
import SunIcon from '@heroicons/react/24/outline/SunIcon'
import { openRightDrawer } from '../features/common/rightDrawerSlice';
import { RIGHT_DRAWER_TYPES } from '../utils/globalConstantUtil'

import { NavLink,  Routes, Link , useLocation} from 'react-router-dom'


function Header(){

    const dispatch = useDispatch()
    const {noOfNotifications, pageTitle} = useSelector(state => state.header)
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"))

    useEffect(() => {
        themeChange(false)
        if(currentTheme === null){
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ) {
                setCurrentTheme("dark")
            }else{
                setCurrentTheme("light")
            }
        }
        // 👆 false parameter is required for react project
      }, [])


    // Opening right sidebar for notification
    const openNotification = () => {
        dispatch(openRightDrawer({header : "Notifications", bodyType : RIGHT_DRAWER_TYPES.NOTIFICATION}))
    }


    function logoutUser(){
        localStorage.clear();
        window.location.href = '/'
    }

    return(
        <>
            <div className="navbar  flex justify-between bg-base-100  z-10 shadow-md ">


                {/* Menu toogle for mobile view or small screen */}
                <div className="">
                    <label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
                    <Bars3Icon className="h-5 inline-block w-5"/></label>
                    <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
                </div>

                

            <div className="order-last">

                {/* Multiple theme selection, uncomment this if you want to enable multiple themes selection, 
                also includes corporate and retro themes in tailwind.config file */}
                
                {/* <select className="select select-sm mr-4" data-choose-theme>
                    <option disabled selected>Theme</option>
                    <option value="light">Default</option>
                    <option value="dark">Dark</option>
                    <option value="corporate">Corporate</option>
                    <option value="retro">Retro</option>
                </select> */}


            {/* Light and dark theme selection toogle **/}
            <label className="swap ">
                <input type="checkbox"/>
                <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "+(currentTheme === "dark" ? "swap-on" : "swap-off")}/>
                <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "+(currentTheme === "light" ? "swap-on" : "swap-off")} />
            </label>


                {/* Notification icon */}
                <button className="btn btn-ghost ml-4  btn-circle" onClick={() => openNotification()}>
                    <div className="indicator">
                        <BellIcon className="h-6 w-6"/>
                        {noOfNotifications > 0 ? <span className="indicator-item badge badge-secondary badge-sm">{noOfNotifications}</span> : null }
                    </div>
                </button>


                {/* Profile icon, opening menu on click */}
                <div className="dropdown dropdown-end ml-4">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img src="data:image/png;base64,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" alt="profile" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li className="justify-between">
                        <Link to={'/app/settings-profile'}>
                            Profile Settings
                            <span className="badge">New</span>
                            </Link>
                        </li>
                        <li className=''><Link to={'/app/settings-billing'}>Order History</Link></li>
                        <div className="divider mt-0 mb-0"></div>
                        <li><a onClick={logoutUser}>Logout</a></li>
                    </ul>
                </div>
            </div>
            </div>

        </>
    )
}

export default Header