import {useEffect} from "react";
import MainMenu from "../interface/MainMenu.jsx";
import './style.css'
import useUser from "../stores/useUser.js";
import Loading from "../interface/Loading.jsx";
import Connecting from "../interface/Connecting.jsx";
import {Web3} from "web3";

export default function Connect() {
    const {
        login,
        isLogin,
        verify,
        isLoading,
        isConnecting,
        disconnectMetamask
    } = useUser((state) => state);


    useEffect(() => {
        const ethereum = window.ethereum;
        if (ethereum) {
            ethereum.on('accountsChanged', () => {
                disconnectMetamask();
            })
        }
        return () => {
            if (ethereum) {
                ethereum.removeListener('accountsChanged', () => {});
            }
        }
    }, []);

    useEffect(() => {
        verify();
    }, [verify])

    const connectWallet = async () => {
        try {
            await login();
        } catch (error) {
            console.log(error);
        }
    };
    console.log(isLoading, "isLoading")
    if (isConnecting) {
        return <Connecting/>
    }

    if (isLoading) {
        return <Loading/>
    }

    if (isLogin) {
        return <MainMenu/>
    }

    return (
        <div className="connect">
            <div className="connect-button" onClick={() => connectWallet()}>
                Login with wallet
            </div>
        </div>
    );
}
