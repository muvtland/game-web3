import { useEffect } from "react";
import MainMenu from "../interface/MainMenu.jsx";
import useUser from "../stores/useUser.js";
import Loading from "../interface/Loading.jsx";
import Logo from "../assets/cerb-logo.png";

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

    if (isConnecting){
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
