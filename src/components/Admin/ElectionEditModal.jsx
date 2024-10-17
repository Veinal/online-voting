import React, { useEffect } from 'react'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  bgcolor: '#1F2937',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ElectionEditModal(props) {

  const [election,setElection]=useState()
  const [getElection,setGetElection]=useState([])

  useEffect(()=>{
    axios.get(`http://localhost/api/election/singleview/${props.selectedElect._id}`)
    .then((res)=>{
      console.log(res.data)
      setGetElection(res.data)
    })
    .catch((err)=>{
      alert(err)
    })
  },[])

  const HandleChange=()=>{

  }

  const HandleSubmit=()=>{

  }

  return (
    <div>
      <Box sx={style} className="bg-gray-900 text-white rounded-lg">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <span className='font-bold text-2xl'>CREATE ELECTION</span>
        </Typography>
        <form className="mt-4" onSubmit={HandleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="election-name">
              Election Name
            </label>
            <input
              type="text"
              id="election-name"
              className="block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
              placeholder="Enter election name"
              required
              name='electionName'
              onChange={(e)=>HandleChange(e)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
              placeholder="Enter description"
              rows="4"
              required
              name='description'
              onChange={(e)=>HandleChange(e)}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="start-date">
              Start Date
            </label>
            <input
              type="date"
              id="start-date"
              className="block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
              required
              name='startDate'
              onChange={(e)=>HandleChange(e)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="end-date">
              End Date
            </label>
            <input
              type="date"
              id="end-date"
              className="block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
              required
              name='endDate'
              onChange={(e)=>HandleChange(e)}
            />
          </div>

          <div className='mb-4'>
            <label className="block text-sm font-medium mb-2" htmlFor="choose-batch">
                Choose Batch
            </label>
            <select name="batch" id="choose-batch" onChange={(e)=>HandleChange(e)} className="block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white">
              <option value=" ">choose the batch</option>
              <option value="student">Students</option>
              <option value="teacher">Teachers</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </Box>
    </div>
  )
}
