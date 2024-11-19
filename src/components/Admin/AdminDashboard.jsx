import React from 'react';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {

  const [getUser,setGetUser]=useState()
  const [getCand,setGetCand]=useState()
  const [getElec,setGetElec]=useState()
  const [getResult,setGetResult]=useState()
  const [getFeed,setGetFeed]=useState()
  const navigate=useNavigate()

  const adminAvail=JSON.parse(localStorage.getItem("Admin"))

    if(!adminAvail){
        navigate('/adminlogin')
    }

  useEffect(()=>{
    axios.get('http://localhost:7000/api/userreg/view')
    .then((res)=>{
      setGetUser( res.data.length)
    })
    .catch((err)=>{
      alert(err)
    })
  },[])

  useEffect(()=>{
    axios.get('http://localhost:7000/api/candidate/view')
    .then((res)=>{
      setGetCand( res.data.length)
    })
    .catch((err)=>{
      alert(err)
    })
  },[])

  useEffect(()=>{
    axios.get('http://localhost:7000/api/election/view')
    .then((res)=>{
      setGetElec( res.data.length)
    })
    .catch((err)=>{
      alert(err)
    })
  },[])

  useEffect(()=>{
    axios.get('http://localhost:7000/api/result/view')
    .then((res)=>{
      setGetResult( res.data.length)
    })
    .catch((err)=>{
      alert(err)
    })
  },[])

  useEffect(()=>{
    axios.get('http://localhost:7000/api/feedback/view')
    .then((res)=>{
      setGetFeed( res.data.length)
    })
    .catch((err)=>{
      alert(err)
    })
  },[])

  return (
    <div className='flex bg-gray-900 h-screen'>
      <div className="p-4 sm:ml-64 flex-1">
        <h1 className="text-white text-xl mb-5">Hello, {adminAvail?.adminName || ' '}</h1>
        <div className="flex flex-wrap justify-center items-center gap-5">
          <Paper 
            sx={{ bgcolor: 'white', width: { xs: '150px', sm: '200px' }, height: { xs: '120px', sm: '150px' } }} 
            elevation={5}
            className="flex-shrink-0 flex flex-col justify-center items-center"
          >
            <h1 className="text-gray-800 text-xl font-bold mb-3">USERS</h1>
            <p className="text-gray-600 text-lg font-semibold">Total: {getUser}</p>
          </Paper>
          <Paper 
            sx={{ bgcolor: 'white', width: { xs: '150px', sm: '200px' }, height: { xs: '120px', sm: '150px' } }} 
            elevation={5}
            className="flex-shrink-0 flex flex-col justify-center items-center"
          >
            <h1 className="text-gray-800 text-xl font-bold mb-3">CANDIDATES</h1>
            <p className="text-gray-600 text-lg font-semibold">Total: {getCand}</p>
          </Paper>
          <Paper 
            sx={{ bgcolor: 'white', width: { xs: '150px', sm: '200px' }, height: { xs: '120px', sm: '150px' } }} 
            elevation={5}
            className="flex-shrink-0 flex flex-col justify-center items-center"
          >
            <h1 className="text-gray-800 text-xl font-bold mb-3">ELECTIONS</h1>
            <p className="text-gray-600 text-lg font-semibold">Total: {getElec}</p>
          </Paper>
          <Paper 
            sx={{ bgcolor: 'white', width: { xs: '150px', sm: '200px' }, height: { xs: '120px', sm: '150px' } }} 
            elevation={5}
            className="flex-shrink-0 flex flex-col justify-center items-center"
          >
            <h1 className="text-gray-800 text-xl font-bold mb-3">RESULTS</h1>
            <p className="text-gray-600 text-lg font-semibold">Total: {getResult}</p>
          </Paper>
          <Paper 
            sx={{ bgcolor: 'white', width: { xs: '150px', sm: '200px' }, height: { xs: '120px', sm: '150px' } }} 
            elevation={5}
            className="flex-shrink-0 flex flex-col justify-center items-center"
          >
            <h1 className="text-gray-800 text-xl font-bold mb-3">FEEDBACKS</h1>
            <p className="text-gray-600 text-lg font-semibold">Total: {getFeed}</p>
          </Paper>
        </div>
        <div id="graph" className="mt-5">
          {/* <div className="border rounded"></div> */}
        </div>
      </div>
    </div>
  );
}
