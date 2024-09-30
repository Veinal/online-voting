import axios from 'axios';
import React from 'react'
import { useState } from 'react'

export default function AddElection() {
    const [electionState,setelectionState]=useState();

    const HandleChange=(e)=>{
        setelectionState({...electionState,[e.target.name]:e.target.value})
    }
    console.log(electionState,"electionState")

    const HandleSubmit=(e)=>{
        e.preventDefault();

        axios.post('http://localhost:7000/api/election/insert',electionState)
        .then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div>
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
                    <form onSubmit={HandleSubmit} className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="electionName">
                            Election Name
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="electionName"
                            placeholder="Enter Election name"
                            name='electionName'
                            onChange={(e)=>HandleChange(e)}
                        />
                        </div>
                        <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="description">
                            Description
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="description"
                            placeholder="Enter description"
                            type="email"
                            name='description'
                            onChange={(e)=>HandleChange(e)}
                        />
                        </div>
                        <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="startDate">
                            Start Date
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                            id="startDate"
                            placeholder="Enter start date"
                            type="datetime-local"
                            name='startDate'
                            onChange={(e)=>HandleChange(e)}
                        />
                        </div>
                        <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="endDate">
                            End Date
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="endDate"
                            placeholder="Enter end date"
                            type="datetime-local"
                            name='endDate'
                            onChange={(e)=>HandleChange(e)}
                        />
                        </div>
                        
                        <div id="submitButton" className="flex justify-end mt-3">
                        {/* <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Red</button> */}
                        <button type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Green</button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </main>
        </div>
        </div>
    </div>
  )
}
