import React from 'react'
import SideBar from './SideBar'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import CandidateViewModal from './CandidateViewModal';
import Tooltip from '@mui/material/Tooltip';

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

  // view modal
const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };
  
  // edit modal
const style3 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  // delete modal
const style4 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:600,
    height:150,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };

export default function CandidateDetails() {

    const [cand,setCand]=useState()
    const [getUser,setGetUser]=useState([])
    const [getCand,setGetCand]=useState([])
    const [selectedCand,setSelectedCand]=useState('')
    const [count,setCount]=useState(0)

    //modal states for creating election
    const [open, setOpen] = React.useState(false);
    const handleOpen = () =>  setOpen(true);
    const handleClose = () => setOpen(false);

    //view modal states
    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = (row) => {
      setOpen2(true);
      setSelectedCand(row)
      console.log(selectedCand,'selected election')
    }
    const handleClose2 = () => setOpen2(false);

    //edit modal states
    const [open3, setOpen3] = React.useState(false);
    const handleOpen3 = (row) => {
      setOpen3(true);
      setSelectedCand(row)
    }
    const handleClose3 = () => setOpen3(false);

    //delete modal states
    const [open4, setOpen4] = React.useState(false);
    const handleOpen4 = (row) => {
      setOpen4(true);
      setSelectedCand(row)
    } 
    const handleClose4 = () => setOpen4(false);


    useEffect(()=>{
        axios.get('http://localhost:7000/api/userreg/view')
        .then((res)=>{
            setGetUser(res.data)
        })
        .catch((err)=>{
            alert(err,"getuser in candidate")
        })
    },[])
    

    useEffect(()=>{
        axios.get('http://localhost:7000/api/candidate/view')
        .then((res)=>{
            setGetCand(res.data)
        })
        .catch((err)=>{
            alert(err)
        })
    },[count])
    console.log(getCand,'gc')

    const HandleChange=(e)=>{
        setCand({...cand,[e.target.name]:e.target.value})
    }
    // console.log(cand,"cand")

    const HandleSubmit=(e)=>{
        e.preventDefault()

        axios.post('http://localhost:7000/api/candidate/insert',cand)
        .then((res)=>{
            console.log(res.data)
            handleClose()
            setCount((prev)=>!prev)
        })
        .catch((err)=>{
            alert(err)
        })
    }

    const HandleDelete=()=>{
      axios.delete(`http://localhost:7000/api/candidate/delete/${selectedCand._id}`)
      .then((res)=>{
        console.log(res.data)
        handleClose4()
        setCount((prev)=>!prev)
      })
      .catch((err)=>{
        alert(err)
      })
    }

  return (
    <div className='bg-gray-900 min-h-screen'>
      <div className="p-4 sm:ml-64">

      <h1 className="font-bold text-2xl my-3 text-white">CANDIDATE DETAILS:</h1>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
              <div>
                  <div>
                  <button onClick={handleOpen} class="relative inline-flex items-center justify-center p-0.5 mb-1 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                    <span class="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        <AddIcon className='mb-0.5'/>
                        ADD CANDIDATE
                    </span>
                  </button>
                  </div>
                  <div id="dropdownRadio" className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style={{"position": "absolute", "inset": "auto auto 0px 0px", "margin": "0px", "transform": "translate3d(522.5px, 3847.5px, 0px)"}}>
                      <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                          <li>
                              <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                  <input id="filter-radio-example-1" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                  <label for="filter-radio-example-1" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last day</label>
                              </div>
                          </li>
                          <li>
                              <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                  <input checked="" id="filter-radio-example-2" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                  <label for="filter-radio-example-2" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 7 days</label>
                              </div>
                          </li>
                          <li>
                              <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                  <input id="filter-radio-example-3" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                  <label for="filter-radio-example-3" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 30 days</label>
                              </div>
                          </li>
                          <li>
                              <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                  <input id="filter-radio-example-4" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                  <label for="filter-radio-example-4" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last month</label>
                              </div>
                          </li>
                          <li>
                              <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                  <input id="filter-radio-example-5" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                  <label for="filter-radio-example-5" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last year</label>
                              </div>
                          </li>
                      </ul>
                  </div>
              </div>
              <label for="table-search" className="sr-only">Search</label>
              <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                  </div>
                  <input type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"/>
              </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="p-4">
                          <div className="flex items-center">
                              <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                              <label for="checkbox-all-search" className="sr-only">checkbox</label>
                          </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Candidate name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Manifesto
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Role
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                {getCand?.map((row)=>(
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="w-4 p-4">
                          <div className="flex items-center">
                              <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                              <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                          </div>
                      </td>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {row?.user_id?.userName}
                      </th>
                      <td className="px-6 py-4">
                          {row?.manifesto ? `${row.manifesto.split(' ').slice(0, 5).join(' ')}...` : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                          {row?.user_id?.role}
                      </td>
                      <td className="px-6 py-4">
                          {row?.status || ''}
                      </td>
                      <td className="px-6 py-4">
                            {/* <IconButton aria-label="edit" color='inherit'>
                                <EditIcon />
                            </IconButton> */}
                            <Tooltip title="view">
                              <IconButton onClick={()=>handleOpen2(row)} aria-label="view" color='inherit'>
                                  <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="delete">
                              <IconButton onClick={()=>handleOpen4(row)} aria-label="delete" color='inherit'>
                                  <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                      </td>
                  </tr>
                ))}
              </tbody>
          </table>
      </div>        

      {/* PAGINATION CODE: */}

      <div className='mt-5 '>
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-base h-10">
            <li>
              <a href="#" className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
            </li>
            <li>
              <a href="#" aria-current="page" className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
            </li>
          </ul>
        </nav>
      </div>

      </div>

      {/* add candidate modal */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="bg-gray-900 text-white rounded-lg">
            <Typography id="modal-modal-title" variant="h6" component="h2">
                <span className='font-bold text-2xl'>CHOOSE CANDIDATE</span>
            </Typography>
            <form className="mt-4" onSubmit={HandleSubmit}>
                
                {/* Dropdown to select user */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="select-user">
                        Select User
                    </label>
                    
                    <select 
                        name="userName" 
                        id="select-user" 
                        onChange={(e) => HandleChange(e)} 
                        className="block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                        required
                    >
                        <option value="">Choose a user</option>
                        {getUser.map((row)=>(
                            <>
                                <option key={row._id} value={row._id}>{row?.userName}</option>
                            </>
                        ))}
                        
                    </select>
                </div>

                {/* Manifesto textarea */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="manifesto">
                        Manifesto
                    </label>
                    <textarea
                        id="manifesto"
                        className="block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                        placeholder="Enter manifesto"
                        rows="4"
                        required
                        name='manifesto'
                        onChange={(e) => HandleChange(e)}
                    ></textarea>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </Box>
    </Modal>

    {/* view modal */}

    <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <CandidateViewModal selectedCand={selectedCand} handleClose2={handleClose2}/>
        </Box>
      </Modal>  

    {/* delete modal */}

    <Modal
        open={open4}
        onClose={handleClose4}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style4}>
          <h1 className='font-semibold text-2xl'>Do you want to delete this data?</h1>
          <div className='flex justify-end gap-4 mt-7'>
            <Button onClick={handleClose4} variant="contained" color="inherit">
              cancel
            </Button>
            <Button onClick={HandleDelete} variant="contained" color="error">
              Confirm
            </Button>
          </div>
        </Box>
      </Modal>

    </div>
  )
}
