import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { initializeWeb3 } from "../services/web3Service";
import VoteCasting from '../smart-contracts/build/contracts/VoteCasting.json'

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
    const [user,setUser]=useState({})

    const [isWeb3Ready, setIsWeb3Ready] = useState(false);
    const [account, setAccount] = useState(null);
    const [contract,setContract]=useState(null)
    const [voteCounts, setVoteCounts] = useState({});
    const [web3, setWeb3] = useState(null);

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem("User")))
    },[])
    // console.log(user._id,'user')

    useEffect(() => {
    const initialize = async () => {
        // Check if account exists in local storage
        const storedAccount = localStorage.getItem('account');
        
        if (storedAccount) {
            setAccount(storedAccount);
            setIsWeb3Ready(true);
            
            try {
                // Initialize web3 and get accounts
                const { web3: web3Instance } = await initializeWeb3();
                setWeb3(web3Instance); // Set the web3 instance in state

                // Initialize contract
                const contractAddress = "0xb8290418c6DbD6d185493D581F7b1cA7dAEa37C7";
                const contractInstance = new web3Instance.eth.Contract(VoteCasting.abi, contractAddress);
                setContract(contractInstance);
                console.log("Contract initialized:", contractInstance);
            } catch (error) {
                console.error("Error initializing web3 or contract:", error);
            }
        }
    };

    initialize();
}, []);


    // Connect to MetaMask using button
    const connectMetaMask = async () => {
        try {
            const { web3: web3Instance } = await initializeWeb3();
            const accounts = await web3Instance.eth.getAccounts();
            if (accounts.length > 0) {
                setAccount(accounts[0]);
                localStorage.setItem('account', accounts[0]);
                setIsWeb3Ready(true);
                setWeb3(web3Instance); // Store the web3 instance in state
            } else {
                console.error("No accounts found. Please connect MetaMask.");
            }
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
        }
    };

    // Create contract instance whenever web3 or account changes
    useEffect(() => {
        if (web3 && account) {
            const contractAddress = "0xb8290418c6DbD6d185493D581F7b1cA7dAEa37C7";
            const contractInstance = new web3.eth.Contract(VoteCasting.abi, contractAddress);
            setContract(contractInstance);
            console.log("Contract initialized:", contractInstance);
        }
    }, [web3, account]);


    useEffect(() => {
        axios.get('http://localhost:7000/api/election/view')
            .then((res) => {
                setGetElection(res.data);
    
                const ongoingElection = res.data.find((item) => item.status === 'ongoing');
                if (ongoingElection && account) {
                    axios.get(`http://localhost:7000/api/votes/check`, {
                        params: { electionID: ongoingElection._id, account }
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
    }, [account]);    
    console.log(getElection,'ge')

    useEffect(()=>{
        axios.get('http://localhost:7000/api/result/view')
        .then((res)=>{
            // console.log(res.data)
            setGetResult(res.data)
        })
        .catch((err)=>{
            alert(err)
        })
    },[])

    const filteredElection = getElection.find((item) => item.status === 'ongoing');
    // console.log(filteredElection, 'filtered election');

    const userID = JSON.parse(localStorage.getItem("User"))
    // console.log(userID._id,"userID")

    const filteredResult=getResult.filter(result=>result.status === 'display')
    console.log(filteredResult,'filteredResult')

    const handlechange = (e) => {
        setFeed({ ...feed, [e.target.name]: e.target.value });
    };
    // console.log(feed, "feed");

    const MatchingElectionResult = getElection.filter(election =>
        filteredResult.some(result => result.election_id._id === election._id)
    );
    console.log(MatchingElectionResult,'mch') 
    
    
    const HandleVoteSubmit = async (row) => {  
        if (!contract || !account) {
            console.error("Contract instance or account is missing.");
            return;
        }
        
        const candidateID = row._id;
        
        try {
            console.log("Attempting to cast vote...");
            await contract.methods.castVote(parseInt(filteredElection._id,16), parseInt(candidateID,16)).send({ from: account });
            console.log("Vote successfully cast");
    
            // Now update the database with the vote information
            axios.post('http://localhost:7000/api/votes/insert', { electionID: filteredElection._id, candidateID: candidateID, account: account })
                .then((res) => {
                    console.log("Vote recorded in the database:", res.data);
                })
                .catch((err) => {
                    console.error("Error recording vote in the database:", err);
                });
        } catch (error) {
            console.error("Error casting vote through the contract:", error);
        }
    };
    
    

    useEffect(() => {
        const fetchVoteCounts = async () => {
            if (!contract || !getElection.length) return;

            const ongoingElection = getElection.find((item) => item.status === 'ongoing');
            if (!ongoingElection) return;

            const counts = {};
            for (let candidate of ongoingElection.candidate_id) {
                try {
                    const count = await contract.methods.getCandidateVoteCount(parseInt(ongoingElection._id,16), parseInt(candidate._id,16)).call();
                    counts[candidate._id] = count;
                } catch (error) {
                    console.error(`Error fetching vote count for candidate ${candidate._id}:`, error);
                }
            }
            setVoteCounts(counts); // Store all counts in state
        };

        fetchVoteCounts();
    }, [contract, getElection]);
    

    //for feedback
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:7000/api/feedback/insert', {...feed,userID:user._id})
            .then((res) => {
                console.log(res.data);
                alert("feedback posted")
                window.location.reload();
            })
            .catch((err) => {
                alert(err);
            });
    };

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

                {/* Winner Section */}
                {filteredResult.length > 0 && (
                    <section className="flex justify-center items-center mt-12">
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-8 rounded-lg shadow-lg text-center max-w-lg mx-auto">
                            <h2 className="text-4xl font-extrabold mb-4">
                                🎉 Congratulations! 🎉
                            </h2>
                            <p className="text-lg font-medium">
                                The winner is:
                            </p>
                            <h3 className="mt-2 text-3xl font-bold">
                                {filteredResult[0]?.winner || "Winner Name"}
                            </h3>
                            <p className="mt-4 text-xl">
                                Total Votes: <span className="font-semibold">{filteredResult[0]?.totalVotes || 0}</span>
                            </p>
                            
                        </div>
                    </section>
                )}


                {/* Vote Tallies Section */}
                {filteredResult.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-3xl font-bold mb-6 text-center">Election Results</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {MatchingElectionResult[0]?.candidate_id?.map((candidate, index) => (
                                <div
                                    key={candidate._id}
                                    className="bg-white p-6 rounded-lg shadow-lg text-center"
                                >
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {candidate?.user_id?.userName || "Unknown Candidate"}
                                    </h3>
                                    <p
                                        className={`text-3xl p-3 mt-4 font-bold ${candidateColors[index % candidateColors.length]} text-black`}
                                    >
                                        <span className='text-black'>{candidate?.voteCount || 0}</span>
                                    </p>
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
