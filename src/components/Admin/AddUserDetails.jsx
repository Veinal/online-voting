import axios from 'axios';
import React from 'react';
import { useState } from 'react';

export default function AddUserDetails() {

  const [user,setUser]=useState();

  const HandleSubmit=(e)=>{
    e.preventDefault();

    axios.post('http://localhost:7000/api/userreg/register',user)
    .then((res)=>{
      console.log(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const HandleChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }
  console.log(user,user)

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-8">
      <div className='sm:ml-64'>
          <main className="w-full">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">User Information</h1>
                <p className="text-gray-400">Enter the details of the voter</p>
              </div>
              <div className="rounded-lg border bg-gray-800 text-gray-200 shadow-sm">
                <div className="p-6 space-y-6">
                  <form onSubmit={(e)=>HandleSubmit()} className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="firstName">
                        User Name
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="userName"
                        placeholder="Enter user name"
                        name='userName'
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
                        onChange={(e)=>HandleChange(e)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="district">
                        Role
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          className="flex h-10 w-full items-center justify-between rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <span>Select Role</span>
                        </button>
                        <select
                          className="absolute w-0 h-0 opacity-0"
                          aria-hidden="true"
                          defaultValue=""
                          name='role'
                          onChange={(e)=>HandleChange(e)}
                        >
                          <option value=""></option>
                          <option value="student">Student</option>
                          <option value="teacher">Teacher</option>
                        </select>
                      </div>
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
