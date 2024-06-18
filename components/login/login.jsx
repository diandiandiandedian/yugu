"use client";


import {useEffect, useState,useRef} from "react";
import {UniPassPopupSDK} from "@unipasswallet/popup-sdk";
import Image from "next/image";
import {ethers} from "ethers";
import useUniPass, {hooks} from "../../web3/unipass";
import {UniPass} from "@unipasswallet/web3-react";
import {UniPassTheme} from "@unipasswallet/popup-types";
import erc721abi from "../../contract/erc721abi.json";
// import {useAccount, useContractRead, useContractWrite, useNetwork, useWaitForTransaction} from "wagmi";
import AlertComponent from "../common/AlertComponent";

export default function Login() {

    const [email, setEmail] = useState("");
    const [wallet, setWallet] = useState({});
    const [stakeLoading, setStakeLoading] = useState(false);
    const alertRef = useRef(null);

    useEffect(() => {
        // var privateKey = ethers.utils.randomBytes(32);
        // var wallet = new ethers.Wallet(privateKey);
        // console.log("账号地址: " + wallet.address,privateKey);
        // let keyNumber = ethers.utils.bigNumberify(privateKey);
        // console.log(keyNumber);

        // initWallet()
        fetchUsers()

    }, []);

    const fetchUsers = async () => {
        const res = await fetch('/api/users');
        const data = await res.json();
        // 使用 data
        console.log('fetchUsers', data)

    };

    const createUser = async (userData) => {
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
        });
        const data = await res.json();
        // 使用 data
    };


    async function initWallet() {
        // 创建钱包
        const wallet1 = ethers.Wallet.createRandom();
        console.log('aaa', wallet1.address, wallet1.privateKey)
        setWallet(wallet1)
        await createUser({
            email: email,
            password: "bbbb",
            address: wallet1.address,
            create_time: new Date().getTime()
        })
        // doCreateUser(wallet1.address)
    }

    async function mintNft() {
        setStakeLoading(true)
        try {
            const ALCHEMY_GOERLI_URL = 'https://rpc-testnet.morphl2.io';
            const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_GOERLI_URL);
            // 导入钱包
            // const privateKey = '0x5b6c99a9941e824eceb10820966e54241188e957a30dea7d3a773b51e52c9e90'
            // const wallet1 = new ethers.Wallet(privateKey, provider)

            const wallet1WithProvider = wallet.connect(provider)
            // const txCount1 = await provider.getTransactionCount(wallet1WithProvider)
            // console.log('txCount1', txCount1)
            const contract = new ethers.Contract('0x74a80370AeE10295Ff345d488A4E81d27D29F87e', erc721abi, wallet1WithProvider)
            const balanceWETH = await contract.balanceOf(wallet.address)
            console.log('balance', balanceWETH)
            const tx2 = await contract.safeMint(wallet.address)
            await tx2.wait()
            const balanceWETH2 = await contract.balanceOf(wallet.address)
            console.log('balance', balanceWETH2)
            setStakeLoading(false)
            alertRef.current.showSuccessAlert("Mint Success");
        }catch (e) {
            console.log(e)
            setStakeLoading(false)
            alertRef.current.showErrorAlert("Mint Error");
        }
    }

    const handleEmailChange = async (e) => {
        setEmail(e.target.value)

    };

    async function jump() {
        window.open('http://testh5.yugu.co.nz', '_self')
    }


    return (
        <>
            <div className="h-screen w-[100%] flex flex-col items-center justify-center bg-[url('/bg.svg')] bg-cover	">
                <Image src="/subtitle.svg" width="300" height="300" alt="sub"></Image>
                <Image src="/title.svg" width="300" height="300" alt="title" className="mt-[2rem]"></Image>
                <div className="my-[3rem] font-['Roboto-Regular']">Start earning for each order with DISHSOON:</div>
                <input type="text" className="border-[2px] rounded-[0.7rem] text-[#000000] border-[#000000] px-3 py-2 mb-3" placeholder="Email" onChange={handleEmailChange} value={email}/>

                <button onClick={initWallet} className="flex items-center border-[2px] rounded-[0.7rem] text-[#000000] border-[#000000] px-[1.1rem] py-[0.6rem] font-['Roboto-Regular']">
                    <Image src="/google.png" width="30" height="30" alt="google" className="mr-[1.5rem]"></Image>
                    Continue with Google
                </button>
                <div className='break-all'>
                    your address: {wallet.address} <br/>
                    your private key: {wallet.privateKey}
                </div>
                <button onClick={mintNft} className="flex items-center border-[2px] rounded-[0.7rem] text-[#000000] border-[#000000] px-[1.1rem] py-[0.6rem] font-['Roboto-Regular']">
                    {stakeLoading ? <span className="loading loading-spinner loading-sm"></span> : 'Mint'}
                </button>

                <button onClick={jump} className="text-[#B5B5B5] mt-[2rem] font-['Roboto-Regular'] flex items-center 	">
                    <span className='underline decoration-1 decoration-[#B5B5B5]'>I don’t want free money, just let me order</span>
                    <Image src="/right.svg" width="30" height="30" alt="right" className="ml-[0.5rem]"></Image>
                </button>
                <AlertComponent ref={alertRef}/>
            </div>
        </>
    );
}


//
// const { useProvider, useAccount } = hooks;
//
// const provider = useProvider();
// const account = useAccount();
//
// const connect = () => {
//
//     const uniPass =new UniPass({
//         options: {
//             chainId: 5,
//             returnEmail: true,
//             appSettings: {
//                 appName: "web3-react test for unipass",
//                 appIcon: "your icon url",
//                 theme: UniPassTheme.DARK,
//             },
//             rpcUrls: {
//                 mainnet: "your eth mainnet rpc url",
//                 polygon: "your polygon mainnet rpc url",
//                 bscMainnet: "your bsc mainnet rpc url",
//                 rangersMainnet: "your rangers mainnet rpc url",
//                 arbitrumMainnet: "your arbitrum mainnet rpc url",
//
//                 polygonMumbai: "your polygon testnet rpc url",
//                 goerli: "your goerli testnet rpc url",
//                 bscTestnet: "your bsc testnet rpc url",
//                 rangersRobin: "your rangers testnet rpc url",
//                 arbitrumTestnet: "your arbitrum testnet rpc url",
//             },
//         },
//     })
//     console.log('uniPass ', uniPass )
//
//     //
//     // return uniPassWallet.activate().catch((e) => {
//     //     console.error(e);
//     // });
// };
//
// const disconnect = () => {
//     return uniPassWallet.deactivate()
// };


// async function aaaaa() {
//     const upWallet = new UniPassPopupSDK({
//         chain: 11155111,
//         nodeRPC: 'https://sepolia.infura.io/v3/',
//         // env: "test",
//         // for polygon mumbai
//         // chainType: "eth",
//         // choose localStorage if you want to cache user account permanent
//         storageType: "sessionStorage",
//         appSettings: {
//             theme: 'light',
//             appName: "UniPass Wallet",
//             appIcon: "",
//         },
//     });
//     setUnipassWallet(upWallet)
//     try {
//         const account = await upWallet.login({
//             email: true,
//             eventListener: (event) => {
//                 console.log("event", event);
//                 const {type, body} = event;
//                 if (type === 'REGISTER') {
//                     console.log("account", body);
//                     // setAddress(body)
//                     // ElMessage.success("a user register");
//                 }
//             },
//             connectType: "google",
//         });
//         console.log('account', account)
//         const {address, email} = account;
//         setAddress(address)
//         console.log("account", address, email);
//         // window.open('http://testh5.yugu.co.nz', '_self')
//     } catch (err) {
//         console.log("connect err", err);
//     }
// }
//
// async function sendToken() {
//     try {
//         const tokenAddress = '0x5229cBE99c032db7030b84eD553684c8729b0622';
//         // const sellTicketAbi = ['function robustSwapNFTsForToken(tuple(tuple(address,uint256[],uint256[]),uint256)[],address,uint256) public payable returns (uint256)']
//         // const ezv2interface = new ethers.utils.Interface(sellTicketAbi)
//
//         // const aabbb =  new ethers()
//         // console.log('aaabbb', aabbb)
//         const provider = new ethers.providers.Web3Provider(window.ethereum)
//
//         // const ezv2interface = new ethers.utils.Interface(['function safeMint(address _to, uint256 _value)'])
//         const data = new ethers.utils.Interface(['function safeMint(address to)']).encodeFunctionData('safeMint', ['0x21C8e614CD5c37765411066D2ec09912020c846F']);
//         const tx = {
//             from: address,
//             to: tokenAddress,
//             value: "0x0",
//             data: data
//         };
//         const txHash = await unipassWallet.sendTransaction(tx);
//         console.log('txHash', txHash)
//         // txHash.value = await unipassWallet.sendTransaction(tx);
//         // if (await checkTxStatus(txHash)) {
//         //     console.log("send Token success", txHash);
//         // } else {
//         //     console.error(`send Token failed, tx hash = ${txHash}`);
//         // }
//     } catch (err) {
//         console.log("err", err);
//     }
// }
//
// async function loginOut() {
//     window.open('http://testh5.yugu.co.nz', '_self')
// }

// const sendTransaction = async () => {
//     if (provider) {
//         const data = new ethers.utils.Interface(['function safeMint(address to)']).encodeFunctionData('safeMint', ['0x21C8e614CD5c37765411066D2ec09912020c846F']);
//
//         const signer = provider.getSigner(account);
//         const txParams = {
//             from: account,
//             to: "0x5229cBE99c032db7030b84eD553684c8729b0622",
//             value: '0',
//             data: data,
//         };
//         try {
//             const txResp = await signer.sendTransaction(txParams);
//             const res = await txResp.wait();
//             console.log(res);
//             // setNativeHash(res.transactionHash);
//         } catch (e) {
//             console.log(e)
//             // message.error(
//             //     `send transaction error: ${e?.message || "unknown error"}`
//             // );
//         } finally {
//             // setSendNativeLoading(false);
//         }
//     }
// };


// const {provider, account, chainId, connect, connectEagerly, disconnect} = useUniPass();
// useEffect(() => {
//     if (account) {
//         getBalance(account);
//     }
// }, [account]);

// const getBalance = async () => {
//     const balance = await provider?.getBalance(account);
//     console.log(`balance: ${account + " " + balance}`);
//
//     // setBalance(weiToEther(balance ?? 0));
// };


// function loginV2() {
//
// }
