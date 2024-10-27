import axios from 'axios';
import React, { useEffect, useState } from 'react';

// For unique colors for each card
const candidateColors = [
    'bg-indigo-600 text-indigo-600',
    'bg-green-600 text-green-600',
    'bg-yellow-600 text-yellow-600',
    'bg-red-600 text-red-600',
];

export default function Vote() {
    const [getElection, setGetElection] = useState([]);
    const [feed, setFeed] = useState({});

    useEffect(() => {
        axios.get('http://localhost:7000/api/election/view')
            .then((res) => {
                setGetElection(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    const filteredElection = getElection.find((item) => item.status === 'ongoing');
    console.log(filteredElection, 'filtered election');

    const handlechange = (e) => {
        setFeed({ ...feed, [e.target.name]: e.target.value });
    };
    console.log(feed, "feed");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:7000/api/feedback/insert', feed)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-blue-900 text-white py-6 px-8 shadow-lg">
                <h1 className="text-4xl font-extrabold">{filteredElection?.name || "Election"}</h1>
            </header>

            <main className="flex-1 py-10 px-6 md:px-10 lg:px-16">
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Render Candidates using map */}
                    {filteredElection?.candidate_id?.map((row, index) => (
                        <div key={row._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-4">
                                <img
                                    src="/placeholder.svg"
                                    alt={row?.user_id?.userName}
                                    width="80"
                                    height="80"
                                    className="rounded-full border-2"
                                    style={{ aspectRatio: '80 / 80', objectFit: 'cover' }}
                                />
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">{row?.user_id?.userName}</h2>
                                    <p className="text-sm text-gray-500">Manifesto: {row?.manifesto}</p>
                                </div>
                            </div>
                            <button className={`w-full mt-6 py-3 rounded-lg font-medium text-white hover:opacity-90 transition ${candidateColors[index % candidateColors.length]}`}>
                                Vote
                            </button>
                        </div>
                    ))}
                </section>

                {/* Vote Tallies Section */}
                <section className="mt-12">
                    <h2 className="text-3xl font-bold mb-6">Vote Tallies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredElection?.candidate_id?.map((candidate, index) => (
                            <div key={candidate._id} className="bg-white p-6 rounded-lg shadow-lg text-center">
                                <h3 className="text-xl font-semibold text-gray-900">{candidate?.user_id?.userName}</h3>
                                <p className={`text-5xl font-bold ${candidateColors[index % candidateColors.length]}`}>{candidate.votes || 0}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Feedback Section */}
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
        </div>
    );
}
