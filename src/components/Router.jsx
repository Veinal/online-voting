import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import NavBar from './NavBar'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Vote from './Vote'

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
            </Routes>
        </BrowserRouter>
    </div>
  )
}
