import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import NavBar from './NavBar'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Vote from './Vote'
import AdminDashboard from './Admin/AdminDashboard'
import CandidateDetails from './Admin/CandidateDetails'
import ElectionDetails from './Admin/ElectionDetails'
import FeedbackDetails from './Admin/FeedbackDetails'
import ResultDetails from './Admin/ResultDetails'
import UserDetails from './Admin/UserDetails'
import SideBar from './Admin/SideBar'
import ContactUs from './ContactUs'
import AboutUs from './AboutUs'
import AdminLogin from './Admin/AdminLogin'
import AddUserDetails from './Admin/AddUserDetails'

export default function Router() {

  const WithNavBar = ({ children }) => (
    <>
      <NavBar />
      {children}
    </>
  );

  const WithSideBar=({children})=>(
    <>
      <SideBar/>
      {children}
    </>
  )

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WithNavBar><Home/></WithNavBar>}/>
                <Route path='/vote' element={<WithNavBar><Vote/></WithNavBar>}/>
                <Route path='/contactus' element={<WithNavBar><ContactUs/></WithNavBar>}/>
                <Route path='/aboutus' element={<WithNavBar><AboutUs/></WithNavBar>}/>

                <Route path='/signin' element={<SignIn/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/adminlogin' element={<AdminLogin/>}/>

                {/* Admin Routes */}
                <Route path='/admindashboard' element={<WithSideBar><AdminDashboard/></WithSideBar>}/>
                <Route path='/candidateDetails' element={<WithSideBar><CandidateDetails/></WithSideBar>}/>
                <Route path='/electionDetails' element={<WithSideBar><ElectionDetails/></WithSideBar>}/>
                <Route path='/feedbackDetails' element={<WithSideBar><FeedbackDetails/></WithSideBar>}/>
                <Route path='/resultDetails' element={<WithSideBar><ResultDetails/></WithSideBar>}/>
                <Route path='/userDetails' element={<WithSideBar><UserDetails/></WithSideBar>}/>

                <Route path='/adduserdetails' element={<WithSideBar><AddUserDetails/></WithSideBar>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}
