import React, { useEffect } from 'react'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

// const style2 = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 750,
//   bgcolor: '#1F2937',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

export default function ElectionEditModal(props) {

  const [getElection,setGetElection]=useState([])
  const navigate=useNavigate()

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  

  useEffect(()=>{
    axios.get(`http://localhost:7000/api/election/singleview/${props.selectedElect._id}`)
      .then((res) => {
        const electionData = res.data;
        // Format dates to 'YYYY-MM-DD' for date input compatibility
        if (electionData.startDate) {
          electionData.startDate = formatDate(electionData.startDate);
        }
        if (electionData.endDate) {
          electionData.endDate = formatDate(electionData.endDate);
        }
        setGetElection(electionData);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Format date as 'YYYY-MM-DD'
    return date.toISOString().split('T')[0];
  };


  const HandleChange=(e)=>{
    setGetElection({...getElection,[e.target.name]:e.target.value})
  }

  const HandleSubmit=async(e)=>{
    e.preventDefault();

    await axios.put(`http://localhost:7000/api/election/update/${props.selectedElect._id}`,getElection)
    .then((res)=>{
      console.log(res.data,'res')
      props.setCount((prev)=>!prev)
      navigate(props.handleClose3())
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleResultSubmit=async(e)=>{
    e.preventDefault()

    axios.post('http://localhost:7000/api/result/insert',{electionId:props.selectedElect._id})
    .then((res)=>{
      console.log(res.data)
    })
    .catch((err)=>{
      alert(err)
    })
  }

  return (
    <div>
      <Box sx={style} className="bg-gray-900 text-white rounded-lg">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <span className='font-bold text-2xl'>EDIT ELECTION</span>
        </Typography>
        <form className="mt-4" onSubmit={HandleSubmit}async>
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
              value={getElection?.electionName}
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
              value={getElection?.description}
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
              value={getElection?.startDate}
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
              value={getElection?.endDate}
            />
          </div>

          <div className='mb-4'>
            <label className="block text-sm font-medium mb-2" htmlFor="choose-batch">
                Choose Batch
            </label>
            <select name="batch" id="choose-batch" value={getElection?.batch} onChange={(e)=>HandleChange(e)} className="block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white">
              <option value=" ">choose the batch</option>
              <option value="student">Students</option>
              <option value="teacher">Teachers</option>
            </select>
          </div>

          <div className='mb-4'>
            <label className="block text-sm font-medium mb-2" htmlFor="change-status">
                Change status
            </label>
            <select name="status" id="change-status" value={getElection?.status} onChange={(e)=>HandleChange(e)} className="block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white">
              <option value="pending">pending</option>
              <option value="ongoing">ongoing</option>
              <option value="closed">closed</option>
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

      {/* confirm election end */}

      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you want to end this election?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button color='inherit' onClick={handleClose}>Cancel</Button>
            <Button color='success' onClick={handleResultSubmit}>Confirm</Button>
          </Typography>
        </Box>
      </Modal> */}
    </div>
  )
}
