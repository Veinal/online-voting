import React from 'react'
import SideBar from './SideBar'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ResultViewModal from './ResultViewModal';

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

export default function ResultDetails() {

    const [getResult,setGetResult]=useState([])
    const [selectedResult,setSelectedResult]=useState('')
    const [count,setCount]=useState(0)

    //view modal states
    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = (row) => {
      setOpen2(true);
      setSelectedResult(row)
      console.log(selectedResult,'selected election')
    }
    const handleClose2 = () => setOpen2(false);

    // //edit modal states
    // const [open3, setOpen3] = React.useState(false);
    // const handleOpen3 = (row) => {
    //   setOpen3(true);
    //   setSelectedResult(row)
    // }
    // const handleClose3 = () => setOpen3(false);

    //delete modal states
    const [open4, setOpen4] = React.useState(false);
    const handleOpen4 = (row) => {
      setOpen4(true);
      setSelectedResult(row)
    } 
    const handleClose4 = () => setOpen4(false);


    useEffect(()=>{
        axios.get('http://localhost:7000/api/result/view')
        .then((res)=>{
            setGetResult(res.data)
            console.log(res.data)
        })
        .catch((err)=>{
            alert(err)
        })
    },[count])

    const HandleDelete=async(e)=>{
        e.preventDefault()

        axios.delete(`http://localhost:7000/api/result/delete/${selectedResult._id}`)
        .then((res)=>{
            console.log(res.data)
            setCount((prev)=>!prev)
            handleClose4()
        })
        .catch((err)=>{
            alert(err)
        })
    }

  return (
    <div className='bg-gray-900 h-screen'>
      <div className="p-4 sm:ml-64">

      <h1 className="font-bold text-2xl my-3 text-white">RESULT DETAILS:</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
              <div>
                  <button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <svg className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
                          </svg>
                      Last 30 days
                      <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                      </svg>
                  </button>
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
                      <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
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
                          ELECTION NAME
                      </th>
                      <th scope="col" className="px-6 py-3">
                          WINNER
                      </th>
                      <th scope="col" className="px-6 py-3">
                          TOTAL VOTE
                      </th>
                      {/* <th scope="col" className="px-6 py-3">
                          Price
                      </th> */}
                      <th scope="col" className="px-6 py-3">
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                {getResult.map((row)=>(
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="w-4 p-4">
                          <div className="flex items-center">
                              <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                              <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                          </div>
                      </td>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {row?.election_id?.electionName}
                      </th>
                      <td className="px-6 py-4">
                          {row?.winner}
                      </td>
                      <td className="px-6 py-4">
                          {row?.election_id?.candidate_id?.totalVote}
                      </td>
                      {/* <td className="px-6 py-4">
                          $2999
                      </td> */}
                      <td className="px-6 py-4">
                            {/* <IconButton aria-label="edit" color='inherit'>
                                <EditIcon />
                            </IconButton> */}
                            <IconButton onClick={()=>handleOpen2(row)} aria-label="view" color='inherit'>
                                <VisibilityIcon />
                            </IconButton>
                            <IconButton onClick={()=>handleOpen4(row)} aria-label="delete" color='inherit'>
                                <DeleteIcon />
                            </IconButton>
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

      {/* view modal */}

    <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <ResultViewModal selectedResult={selectedResult} handleClose2={handleClose2}/>
        </Box>
      </Modal>             

    {/* edit modal */}

    {/* <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ElectionEditModal selectedElect={selectedElect} handleClose3={handleClose3} setCount={setCount}/>
        </Box>
      </Modal>  */}

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
