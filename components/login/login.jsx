"use client";


import {useEffect, useState} from "react";
import {UniPassPopupSDK} from "@unipasswallet/popup-sdk";

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
                connectType: "both",
            });
            const { address, email } = account;
            setAddress(address)
            console.log("account", address, email);
            window.open('https://baidu.com','_blank')
        } catch (err) {
            console.log("connect err", err);
        }
    }

    async function loginOut() {
        const upWallet = new UniPassPopupSDK({
            env: "test",
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
        await upWallet.logout(true);


    }

    useEffect(() => {

    }, []);

    return (
        <>
            <div className="h-screen w-[100%]">
                <button  onClick={aaaaa} className={`text-xl hover:text-white duration-150  text-[#444] px-[1rem] py-[0.25rem] rounded-[0.25rem] text-[1rem]`}>
                    Login
                </button>
                <button  onClick={loginOut} className={`text-xl hover:text-white duration-150  text-[#444] px-[1rem] py-[0.25rem] rounded-[0.25rem] text-[1rem]`}>
                    Login out
                </button>
                <div>{address}</div>

            </div>
        </>
    );
}
