import axios from 'axios';
import React from 'react'
import { useState } from 'react';

// Example candidate data
const candidates = [
    { id: 1, name: 'Candidate 1', platform: 'Improve education', color: 'bg-indigo-600', textColor: 'text-indigo-600', votes: 0 },
    { id: 2, name: 'Candidate 2', platform: 'Improve healthcare', color: 'bg-green-600', textColor: 'text-green-600', votes: 0 },
    { id: 3, name: 'Candidate 3', platform: 'Improve infrastructure', color: 'bg-yellow-600', textColor: 'text-yellow-600', votes: 0 },
    { id: 4, name: 'Candidate 4', platform: 'Improve economy', color: 'bg-red-600', textColor: 'text-red-600', votes: 0 },
];

export default function Vote() {
    const [feed,setFeed]=useState()

    const handlechange=(e)=>{
        setFeed({...feed,[e.target.name]:e.target.value})
    }
    console.log(feed,"feed")

    const handleSubmit=(e)=>{
        e.preventDefault()

        axios.post('http://localhost:7000/api/feedback/insert',feed)
        .then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>{
            alert(err)
        })
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-blue-900 text-white py-6 px-8 shadow-lg">
                <h1 className="text-4xl font-extrabold">Election name</h1>
            </header>

            <main className="flex-1 py-10 px-6 md:px-10 lg:px-16">
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Render Candidates using map */}
                    {candidates.map((candidate) => (
                        <div key={candidate.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-4">
                                <img
                                    src="/placeholder.svg"
                                    alt={candidate.name}
                                    width="80"
                                    height="80"
                                    className={`rounded-full border-2 ${candidate.textColor}`}
                                    style={{ aspectRatio: '80 / 80', objectFit: 'cover' }}
                                />
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">{candidate.name}</h2>
                                    <p className="text-sm text-gray-500">Platform: {candidate.platform}</p>
                                </div>
                            </div>
                            <button className={`w-full mt-6 py-3 ${candidate.color} text-white rounded-lg font-medium hover:opacity-90 transition`}>
                                Vote
                            </button>
                        </div>
                    ))}
                </section>

                {/* Vote Tallies Section */}
                <section className="mt-12">
                    <h2 className="text-3xl font-bold mb-6">Vote Tallies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Render Vote Tallies using map */}
                        {candidates.map((candidate) => (
                            <div key={candidate.id} className="bg-white p-6 rounded-lg shadow-lg text-center">
                                <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
                                <p className={`text-5xl font-bold ${candidate.textColor}`}>{candidate.votes}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>


            <div className="mt-12 self-center mb-10 w-full max-w-2xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Give Us Your Feedback</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                <label className="block text-lg font-semibold mb-2" htmlFor="feedback">How was your voting experience?</label>
                <textarea
                id="feedback"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your feedback here"
                name="feedback"
                onChange={handlechange}
                ></textarea>
                <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition">
                Submit Feedback
                </button>
            </form>
            </div>



            <footer className="bg-gray-800 text-gray-400 py-4 px-6 text-center">
                <p>© 2024 Online Voting. All rights reserved.</p>
            </footer>

        </div>
    );
}
