import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import NavBar from './NavBar'

export default function Router() {
  return (
    <div>
        <BrowserRouter>
            <NavBar/>
            
            <Routes>
                <Route exact path='/' element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}
