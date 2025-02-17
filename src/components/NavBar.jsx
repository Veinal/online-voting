import React,{useEffect} from 'react'
import { Link,useLocation } from 'react-router-dom'
import logo from '../voteHub_logo.jpeg'
import { useState } from 'react';

export default function NavBar(props) {
    const location =useLocation();
    const path=location.pathname;
    const [userDetails,setUserDetails]=useState()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // const [count,setCount]=useState(0)
    
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("User"))
        setUserDetails(user)
    },[props.logoutCount])

    const handleLogout=(e)=>{
        e.preventDefault();

        localStorage.removeItem("User")
        localStorage.removeItem("UserToken")
        localStorage.removeItem("account")
        props.setLogoutCount((prev)=>!prev)
        setIsDropdownOpen(!isDropdownOpen)

        console.log("User logged out successfully...")
    }

  return (
    <div>
        <nav className="bg-gray-800">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span className="absolute -inset-0.5"></span>
            <span className="sr-only">Open main menu</span>
            
            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            
            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
        </div>
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
            <img className="h-9 w-auto rounded-full" src={logo} alt="Your Company"/>
            </div>
            <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">

                <Link
                    to="/"
                    className={`rounded-md px-3 py-2 text-sm font-medium ${
                      path === '/' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    aria-current={path === '/' ? 'page' : undefined}
                >
                Home
                </Link>
                {userDetails && 
                    <Link
                    to="/vote"
                    className={`rounded-md px-3 py-2 text-sm font-medium ${
                        path === '/vote' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    >
                    Voting
                    </Link>
                }
                {/* <Link
                to="/contactus"
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                    path === '/contactus' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                >
                Contact Us
                </Link> */}

                <Link
                to="/aboutus"
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                    path === '/aboutus' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                >
                About Us
                </Link>
            </div>
            </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <p className='text-white font-semibold'>
                {userDetails?.userName ? `Hi, ${userDetails?.userName}` : " "}
            </p>
            {userDetails &&
                <button 
                id="logout" 
                className="rounded-full flex items-center" 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <img 
                    src={`http://localhost:7000/uploads/users/${userDetails?.picture}`} 
                    className="rounded-full ml-2 h-10" 
                    alt="profile" 
                />
            </button>
            }
            
            {isDropdownOpen && (
                <div 
                    className="absolute top-full mt-2 right-0 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                >
                    {/* <a 
                        href="#" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleProfileClick}
                    >
                        Your Profile
                    </a>
                    <a 
                        href="#" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleSettingsClick}
                    >
                        Settings
                    </a> */}
                    <a 
                        href="#" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                    >
                        Logout
                    </a>
                </div>
            )}

            {/* <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="absolute -inset-1.5"></span>
            <span className="sr-only">View notifications</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            </button>

            <div className="relative ml-3">
            <div>
                <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                </button>
            </div>

            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</a>
            </div>
            </div> */}
        </div>
        </div>
    </div>

    <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
        <Link
            to="/"
            className={`rounded-md px-3 py-2 text-sm font-medium ${
            path === '/' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            aria-current={path === '/' ? 'page' : undefined}
        >
        Home
        </Link>
        <Link
        to="/vote"
        className={`rounded-md px-3 py-2 text-sm font-medium ${
            path === '/vote' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
        >
        Voting
        </Link>
        <Link
        to="/contactus"
        className={`rounded-md px-3 py-2 text-sm font-medium ${
            path === '/contactus' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
        >
        Contact Us
        </Link>
        <Link
        to="/aboutus"
        className={`rounded-md px-3 py-2 text-sm font-medium ${
            path === '/aboutus' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
        >
        About Us
        </Link>
        </div>
    </div>
    </nav>

    </div>
  )
}
