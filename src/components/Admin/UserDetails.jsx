import React from 'react'
import SideBar from './SideBar'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import UserViewModal from './UserViewModal';

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
    // p: 2,
  };
  
  // edit modal
  // const style3 = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: 400,
  //   bgcolor: 'background.paper',
  //   border: '2px solid #000',
  //   boxShadow: 24,
  //   p: 4,
  // };
  
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

export default function UserDetails() {
    const [getUser,setGetUSer]=useState([]) 
    const [selectedUser,setSelectedUser]=useState('')
    const [count,setCount]=useState(0)

    //view modal states
    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = (row) => {
        setOpen2(true);
        setSelectedUser(row)
        console.log(selectedUser,'selected election')
    }
    const handleClose2 = () => setOpen2(false);

    //edit modal states
    const [open3, setOpen3] = React.useState(false);
    const handleOpen3 = (row) => {
        setOpen3(true);
        setSelectedUser(row)
    }
    const handleClose3 = () => setOpen3(false);

    //delete modal states
    const [open4, setOpen4] = React.useState(false);
    const handleOpen4 = (row) => {
        setOpen4(true);
        setSelectedUser(row)
    } 
    const handleClose4 = () => setOpen4(false);

    useEffect(()=>{
        axios.get('http://localhost:7000/api/userreg/view')
        .then((res)=>{
            console.log(res.data)
            setGetUSer(res.data)
        })
        .catch((err)=>{
            alert(err)
        })
    },[count])

    const HandleDelete=async()=>{
      axios.delete(`http://localhost:7000/api/userreg/delete/${selectedUser._id}`)
      .then((res)=>{
        console.log(res.data)
        handleClose4()
        setCount((prev)=>!prev)
      })
    }

  return (
    <div className='bg-gray-900 h-screen'>
      <div className="p-4 sm:ml-64">
        <h1 className="font-bold text-2xl mt-3 text-white">USER DETAILS:</h1>
        {/* <hr /> */}

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                <div>
                {/* <Link to='/adduserdetails'>
                    <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        <AddIcon className='mb-0.5'/>
                        ADD
                        </span>
                    </button>
                </Link> */}
                </div>
                <label for="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="text" id="table-search-users" className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"/>
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
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
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
                    {getUser?.map((row)=>(
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <img className="w-10 h-10 rounded-full" src={row.picture} alt="userPicture"/>
                            <div className="ps-3">
                                <div className="text-base font-semibold">{row.userName}</div>
                                <div className="font-normal text-gray-500">{row.email}</div>
                            </div>  
                        </th>
                        <td className="px-6 py-4">
                            {row.phone}
                        </td>
                        <td className="px-6 py-4">
                            {row.role}
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <Link to={`/edituserdetails/${row._id}`}>
                              <Tooltip title="edit">
                                <IconButton aria-label="edit" color='inherit'>
                                    <EditIcon />
                                </IconButton>
                              </Tooltip>
                            </Link>
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

      {/* view modal */}

    <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <UserViewModal selectedUser={selectedUser} handleClose2={handleClose2}/>
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
          <UserEditModal selectedUser={selectedUser} handleClose3={handleClose3} setCount={setCount}/>
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
