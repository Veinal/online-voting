import Web3 from "web3";
import VoteCastingArtifact from "../smart-contracts/build/contracts/VoteCasting.json";

let web3;
let voteCasting;

export const initializeWeb3 = async () => {
  if (window.ethereum) {
    // MetaMask detected
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } else {
    // Fallback to local Ganache instance if MetaMask isn't available
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  }

  const contractAddress = "0xA1025259B009D2fFB61Fa886b730ceBB5CC149Ad";
  const contractABI = VoteCastingArtifact.abi; 
  voteCasting = new web3.eth.Contract(contractABI, contractAddress);

  return { web3, voteCasting }; // Returns the instance 
};

// Getters for use throughout the app
export const getVoteCasting = () => voteCasting;
export const getWeb3 = () => web3;
