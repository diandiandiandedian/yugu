"use client";


import {useEffect, useState} from "react";
import {UniPassPopupSDK} from "@unipasswallet/popup-sdk";
import Image from "next/image";

export default function Login() {

    const [address, setAddress] = useState("");

    async function aaaaa () {
        const upWallet = new UniPassPopupSDK({
            env: "prod",
            // for polygon mumbai
            chainType: "polygon",
            // choose localStorage if you want to cache user account permanent
            storageType: "sessionStorage",
            appSettings: {
                theme: 'light',
                appName: "UniPass Wallet",
                appIcon: "",
            },
        });
        try {
            const account = await upWallet.login({
                email: true,
                eventListener: (event) => {
                    console.log("event", event);
                    const { type, body } = event;
                    if (type === 'REGISTER') {
                        console.log("account", body);
                        // setAddress(body)
                        // ElMessage.success("a user register");
                    }
                },
                connectType: "google",
            });
            const { address, email } = account;
            setAddress(address)
            console.log("account", address, email);
            window.open('http://testh5.yugu.co.nz','_self')
        } catch (err) {
            console.log("connect err", err);
        }
    }

    async function loginOut() {
        window.open('http://testh5.yugu.co.nz','_self')
    }

    useEffect(() => {

    }, []);

    return (
        <>
            <div className="h-screen w-[100%] flex flex-col items-center justify-center bg-[url('/bg.svg')] bg-cover	">
                <Image src="/subtitle.svg" width="300" height="300" alt="sub" ></Image>
                <Image src="/title.svg" width="300" height="300" alt="title" className="mt-[2rem]"></Image>
                <div className="my-[3rem] font-['Roboto-Regular']">Start earning for each order with DISHSOON:</div>
                <button  onClick={aaaaa} className="flex items-center border-[2px] rounded-[0.7rem] text-[#000000] border-[#000000] px-[1.1rem] py-[0.6rem] font-['Roboto-Regular']">
                    <Image src="/google.png" width="30" height="30" alt="google" className="mr-[1.5rem]"></Image>
                    Continue with Google
                </button>
                <button  onClick={loginOut} className="text-[#B5B5B5] mt-[2rem] font-['Roboto-Regular'] flex items-center 	">
                    <span className='underline decoration-1 decoration-[#B5B5B5]'>I don’t want free money, just let me order</span>
                    <Image src="/right.svg" width="30" height="30" alt="right" className="ml-[0.5rem]"></Image>
                </button>
                <div>{address}</div>

            </div>
        </>
    );
}
