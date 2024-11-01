import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { initializeWeb3 } from "../services/web3Service";

// For unique colors for each card
const candidateColors = [
    'bg-indigo-600 text-indigo-600',
    'bg-green-600 text-green-600',
    'bg-yellow-600 text-yellow-600',
    'bg-red-600 text-red-600',
];

export default function Vote() {
    const [getElection, setGetElection] = useState([]);
    const [getResult,setGetResult]=useState([])
    const [feed, setFeed] = useState({});
    const [hasVoted, setHasVoted] = useState(false);

    const [isWeb3Ready, setIsWeb3Ready] = useState(false);
    const [account, setAccount] = useState(null);

    // useEffect(() => {
    //     const initWeb3 = async () => {
    //         try {
    //             const { web3 } = await initializeWeb3();
    //             const accounts = await web3.eth.getAccounts();

    //             if (accounts.length > 0) {
    //                 setAccount(accounts[0]);
    //                 localStorage.setItem('account', accounts[0]); // Store account in local storage
    //                 setIsWeb3Ready(true);
    //                 console.log("Web3 and contract initialized!");
    //             } else {
    //                 setIsWeb3Ready(false);
    //             }
    //         } catch (error) {
    //             console.error("Failed to initialize Web3:", error);
    //         }
    //     };

    //     // Check for existing account in local storage
    //     const storedAccount = localStorage.getItem('account');
    //     if (storedAccount) {
    //         setAccount(storedAccount);
    //         setIsWeb3Ready(true);
    //     } else {
    //         initWeb3();
    //     }
    // }, []);

    //to check whether the account is present in the localstorage
    useEffect(() => {
        const storedAccount = localStorage.getItem('account');
        if (storedAccount) {
            setAccount(storedAccount);
            setIsWeb3Ready(true);
        }
    }, []);

    // Connect to MetaMask using button
    const connectMetaMask = async () => {
        try {
            const { web3 } = await initializeWeb3();
            const accounts = await web3.eth.getAccounts();
            if (accounts.length > 0) {
                setAccount(accounts[0]);
                localStorage.setItem('account', accounts[0]);
                setIsWeb3Ready(true);
                console.log("Wallet connected!");
            }
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:7000/api/election/view')
        .then((res) => {
            setGetElection(res.data);

            // Check if user has already voted in this election
            const userID = JSON.parse(localStorage.getItem("User"))._id;
            const ongoingElection = res.data.find((item) => item.status === 'ongoing');
            
            if (ongoingElection) {
                axios.get(`http://localhost:7000/api/votes/check`, {
                    params: { electionID: ongoingElection._id, userID }
                })
                .then((response) => {
                    setHasVoted(response.data.hasVoted);
                })
                .catch((err) => console.error("Error checking vote status:", err));
            }
        })
        .catch((err) => {
            alert(err);
        });
    }, []);

    useEffect(()=>{
        axios.get('http://localhost:7000/api/result/view')
        .then((res)=>{
            console.log(res.data)
            setGetResult(res.data)
        })
        .catch((err)=>{
            alert(err)
        })
    },[])

    const filteredElection = getElection.find((item) => item.status === 'ongoing');
    console.log(filteredElection, 'filtered election');

    const userID = JSON.parse(localStorage.getItem("User"))
    console.log(userID._id,"userID")

    const filteredResult=getResult.filter(result=>result.status === 'display')
    console.log(filteredResult,'filteredResult')

    const handlechange = (e) => {
        setFeed({ ...feed, [e.target.name]: e.target.value });
    };
    console.log(feed, "feed");
    
    
    const HandleVoteSubmit=(row)=>{  //row is the parameter passed(candidateID)
        const candidateID=row._id
        // console.log(candidateID,'cid')
        axios.post('http://localhost:7000/api/votes/insert',{electionID:filteredElection._id,candidateID:candidateID,userID:userID})
        .then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>{
            alert(err)
        })
    }

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

    // if (!isWeb3Ready) {
    //     return <div>Loading Web3, accounts, and contract...</div>;
    // }

    if (!isWeb3Ready) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-3xl font-bold mb-4 text-blue-600">Connect to MetaMask</h2>
                    <p className="text-gray-600 mb-6">To participate in the voting process, please connect your MetaMask wallet.</p>
                    <button 
                        onClick={connectMetaMask} 
                        className="flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-3 px-6 rounded-full hover:from-green-500 hover:to-blue-600 transition duration-300 shadow-lg transform hover:scale-105"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18" /></svg>
                        Connect Wallet
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-blue-900 text-white py-6 px-8 shadow-lg flex justify-between items-center">
            <h1 className="text-4xl font-extrabold uppercase">{filteredElection?.electionName || "Election"}</h1>
            <p>
                Connected Account: {account ? `${account.slice(0, 8)}.....${account.slice(-8)}` : ""}
            </p>
        </header>


            <main className="flex-1 py-10 px-6 md:px-10 lg:px-16">
                {hasVoted ? (
                    <div className="text-center text-2xl font-semibold text-gray-800 mt-20">
                        You have already voted in this election.
                    </div>
                ) : (
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                                <button onClick={() => HandleVoteSubmit(row)} className={`w-full mt-6 py-3 rounded-lg font-medium text-white hover:opacity-90 transition ${candidateColors[index % candidateColors.length]}`}>
                                    Vote
                                </button>
                            </div>
                        ))}
                    </section>
                )}

                {/* Vote Tallies Section */}
                {filteredResult.length > 0 && (
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
                )}

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
