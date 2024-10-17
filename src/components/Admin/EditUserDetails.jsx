import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditUserDetails() {

  const [user,setUser]=useState();
  const params=useParams()
  const navigate=useNavigate()
  
  let userId=params.id;

  useEffect(()=>{
    axios.get(`http://localhost:7000/api/userreg/singleview/${userId}`)
    .then((res)=>{
      console.log(res.data)
      setUser(res.data)
    })
    .catch((err)=>{
      alert(err)
    })
  },[])
  
  const HandleChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }
  console.log(user,user)

  const HandleSubmit=async(e)=>{
    e.preventDefault();

    axios.put(`http://localhost:7000/api/userreg/update/${userId}`,user)  //here the userId is the params id 
    .then((res)=>{
      console.log(res.data)
      navigate('/userdetails')
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-8">
      <div className='sm:ml-64'>
          <main className="w-full">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Edit User Information</h1>
                <p className="text-gray-400">Enter the details of the voter</p>
              </div>
              <div className="rounded-lg border bg-gray-800 text-gray-200 shadow-sm">
                <div className="p-6 space-y-6">
                  <form onSubmit={HandleSubmit} className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="firstName">
                        User Name
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="userName"
                        placeholder="Enter user name"
                        name='userName'
                        value={user?.userName}
                        onChange={(e)=>HandleChange(e)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="email"
                        placeholder="Enter email"
                        type="email"
                        name='email'
                        value={user?.email}
                        onChange={(e)=>HandleChange(e)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="phone">
                        Phone
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                        id="phone"
                        placeholder="Enter phone number"
                        // type="number"
                        name='phone'
                        value={user?.phone}
                        onChange={(e)=>HandleChange(e)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="phone">
                        Age
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="age"
                        placeholder="Enter age"
                        type="number"
                        name='age'
                        value={user?.age}
                        onChange={(e)=>HandleChange(e)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="phone">
                        Picture
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="picture"
                        placeholder="Choose a file"
                        type="file"
                        name='picture'
                        // value={user.picture}
                        onChange={(e)=>HandleChange(e)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="role">
                        Role
                      </label>
                      <select
                        className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="role"
                        name="role"
                        value={user?.role}
                        onChange={(e) => HandleChange(e)}
                      >
                        <option value="">Select Role</option>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                      </select>
                    </div>
                    <div id="submitButton" className="flex justify-end mt-3">
                      {/* <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Red</button> */}
                      <button type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
      </div>
    </div>
  );
}
