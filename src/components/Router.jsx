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

export default function Router() {

  const WithNavBar = ({ children }) => (
    <>
      <NavBar />
      {children}
    </>
  );

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WithNavBar><Home/></WithNavBar>}/>
                <Route path='/vote' element={<WithNavBar><Vote/></WithNavBar>}/>
                <Route path='/signin' element={<SignIn/>}/>
                <Route path='/signup' element={<SignUp/>}/>

                {/* Admin Routes */}
                <Route path='/admindashboard' element={<AdminDashboard/>}/>
                <Route path='/candidateDetails' element={<CandidateDetails/>}/>
                <Route path='/electionDetails' element={<ElectionDetails/>}/>
                <Route path='/feedbackDetails' element={<FeedbackDetails/>}/>
                <Route path='/resultDetails' element={<ResultDetails/>}/>
                <Route path='/userDetails' element={<UserDetails/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}
