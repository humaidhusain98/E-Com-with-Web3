import detectEthereumProvider from '@metamask/detect-provider';
import React,{useState} from 'react'
import styled from 'styled-components';
import Bars from 'react-loader-spinner';
const Web3 = require('web3');

const usdtAddr = '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd';
const recipientAcc = '0x3b82e8071A4e66b5779208B16A025E13D1cA0f2c';
const usdtAbi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];




export const ConnectMetamask = async()=>{
    try{
        const provider = await detectEthereumProvider();
        if(provider){
            const chainId = await provider.request({
                method: 'eth_chainId'
              });
            const acc = await provider.request({
                method: 'eth_requestAccounts'
              });
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            let bal;
            await web3.eth.getBalance(accounts[0]).then((result) => {
                bal = web3.utils.fromWei(result, 'ether');
            });

            return [accounts[0], bal,parseInt(chainId),provider,web3];
        }
        else{
            return [null, null,null,null,null];
        }
    }
    catch(e){
            console.log("Error Occured "+e);
            return [null, null,null,null,null];
    }
}

const WalletContainer = styled.div`
  
    width: 250px;
    background: black;
    color: white;
    height: 50px;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    transition-duration: 250ms;
    margin-right: 15px;
    
`;

const Pay = styled.div`
    background: white;
    color: black;
    padding: 6px;
    border-radius: 10px;
    &:hover{
        opacity: 0.8;
    }
`;

const Disconnect = styled.div`
    background: red;
    color: white;
    padding: 6px;
    border-radius: 10px;

    &:hover{
        opacity: 0.8;
    }

`;

const ConnectedModal = styled.div`
    position: absolute;
    width: 400px;
    height: 400px;
    margin-left: -200px;
    margin-top: -200px;
    left: 50%;
    top: 50%;
    border: 1px solid grey;
    z-index: 5;
    background: white;
    border-radius: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .wallet-details{
        margin-left: 80px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        cursor: pointer;
        width: 90%;
    }

    .payment-div{
        height: 200px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
    }

    .signature-denied{
        color: red;
        font-size: 35px;
    }

    .confirmed{
        color: green;
        font-size: 25px;
        cursor: pointer;
    }

    .view{
        cursor: pointer;
        text-decoration: underline;
    }
`;

const Balance = styled.div`
    font-size: 35px;
    color: black;
`;

const PayButton = styled.div`
    background: black;
    color: white;
    padding: 10px;
    font-size: 35px;
    border-radius: 10px;
    cursor: pointer; 
    transition-duration: 250ms;

    &:hover{
        transform: scale(1.05);
    }


`;



export default function Wallet() {

  const [userWallet,setUserWallet] = useState(null);
  const [connectedModal,setModal] = useState(false);
  const [state,setState] = useState(0);
  const [transHash,setTransHash] = useState("");


  const handleConnectClick = async()=>{
    let data = await ConnectMetamask();
    console.log(data);
    setUserWallet(data);
    setModal(true);
    setState(0);
  }

  const handlepayClick = async(value)=>{
    try{
        if(userWallet){
            setState(1);
            let valueInWei  = value * 10**18;
            const web3 = new Web3(userWallet[3]);
            const usdtContract = await new web3.eth.Contract(usdtAbi,usdtAddr);
            console.log(usdtContract);
            let transactionHash = null;
            await usdtContract.methods.transfer(recipientAcc,valueInWei.toString()).send({
                from: userWallet[0]
            },(err,txHash)=>{
                if(!err){
                    console.log("Foundry Contract Transfer write Func" + txHash);
                    transactionHash = txHash;
                    

                }
                else{
                    console.log("Error Occured Transfer Contract" + err);
                    setState(-1);
                }
            })
            setTransHash(transactionHash);
            setState(2);

          }
          else{
              console.log("User Wallet not connected");
          }
    }
    catch(e){
        console.log(e);
     
    }

     




  } 

  const handleDisconnect = ()=>{
      setUserWallet(null);
      setModal(false);
  }



  return (
      <>
      { 
        !userWallet && (
            <WalletContainer onClick={handleConnectClick}>Connect Metamask</WalletContainer>
        )
      }

    { 
        userWallet && userWallet[0] && (

            <ConnectedModal>
                <div className="wallet-details">
                     {userWallet[0].substring(0,6)}...{userWallet[0].substring(userWallet[0].length-6)} Connected
                     
                     <Pay onClick={handleDisconnect}>x</Pay>
                </div>

                Balance 
                <Balance>{parseFloat(userWallet[1]).toFixed(3)} BNB</Balance>

                <div className="payment-div">
                    {
                        state==0 && (
                            <PayButton onClick={()=>{handlepayClick(2.5);}} >Pay 2.5 USDT</PayButton>
                        )
                    }

                    {
                        state==1 && (
                            <div className="loader">
                              <Bars heigth="100" width="100" color="grey" ariaLabel="loading-indicator" />
                            </div>
                        )
                    }

                    {
                        state==-1 && (
                            <div className="signature-denied"> Transaction Failed</div>
                        )
                    }

                    {
                        state==2 && (
                            <div className="confirmed"> Transaction Confirmed. </div>
                        )
                    }
                    {
                        state==2 && (
                            <div className="view" onClick={()=>{window.open(`https://testnet.bscscan.com/tx/${transHash}`)}} >View on Etherscan</div>
                        )
                    }
                </div>
               
            </ConnectedModal>

            )
      }

      </>
   
  )
}
