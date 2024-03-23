import {useEffect} from "react";
import {browserName} from 'react-device-detect';
import MainMenu from "../interface/MainMenu.jsx";
import useUser from "../stores/useUser.js";
import Loading from "../interface/Loading.jsx";
import Logo from "../assets/cerb-logo.png";

const browserLinksForAddPhantom = {
    Firefox: <a href="https://addons.mozilla.org/ru/firefox/addon/phantom-app/" target="_blank">Add Phantom</a>,
    Chrome: <a href="https://chromewebstore.google.com/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa" target="_blank">Add Phantom</a>,
    Brave: <a href="https://chromewebstore.google.com/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa" target="_blank">Add Phantom</a>,
    Default: <a href="https://chromewebstore.google.com/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa" target="_blank">Add Phantom</a>,
}
const isMetaMaskAvailable = typeof window['ethereum'] !== 'undefined';

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

    // return <MainMenu/>
    console.log(isMetaMaskAvailable, "isMetaMaskAvailable")
    if (!isMetaMaskAvailable) {
        return (
            <div className="connect">
                <div className="connect-button">
                    {browserLinksForAddPhantom[browserName]}
                </div>
            </div>
        )
    }


    if (isConnecting) {
        return <Loading type={'connection'}/>
    }

    if (isLoading) {
        return <Loading type={'loading'}/>
    }

    if (isLogin) {
        return <MainMenu/>
    }

    return (
        <div className="connect">
            <img className="connect-logo" src={Logo} alt="Cerb Coin Logo"/>
            <div className="connect-button" onClick={() => connectWallet()}>
                Login wallet
            </div>
        </div>
    );
}
