const contractAddress = "0xF842b2A81a00EfD89BEd836b0D6860D4bbe6602F";

const abi = [

{
"inputs":[{"internalType":"string","name":"_name","type":"string"}],
"name":"addCandidate",
"outputs":[],
"stateMutability":"nonpayable",
"type":"function"
},

{
"inputs":[{"internalType":"uint256","name":"_candidateId","type":"uint256"}],
"name":"getVotes",
"outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
"stateMutability":"view",
"type":"function"
},

{
"inputs":[{"internalType":"uint256","name":"_candidateId","type":"uint256"}],
"name":"vote",
"outputs":[],
"stateMutability":"nonpayable",
"type":"function"
}

];

let contract;
let signer;

async function connectWallet(){

if(window.ethereum){

const provider = new ethers.BrowserProvider(window.ethereum);

await provider.send("eth_requestAccounts",[]);

signer = await provider.getSigner();

document.getElementById("walletAddress").innerHTML =
"Connected: " + await signer.getAddress();

contract = new ethers.Contract(contractAddress,abi,signer);

}

else{

alert("Install MetaMask");

}

}

async function vote(id){

try{

const tx = await contract.vote(id);

await tx.wait();

alert("Vote submitted successfully");

}

catch(error){

console.log(error);

alert("You already voted OR voting not started");

}

}

async function getVotes(id){

try{

const count = await contract.getVotes(id);

document.getElementById("result").innerHTML =
"Votes: " + count;

}

catch(error){

console.log(error);

alert("Error fetching votes");

}

}