import React, {FC, useEffect, useMemo, useState} from 'react';
import {ConnectionProvider, useWallet, WalletProvider} from '@solana/wallet-adapter-react';
import {WalletAdapterNetwork} from '@solana/wallet-adapter-base';
import {UnsafeBurnerWalletAdapter} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import {clusterApiUrl, PublicKey} from '@solana/web3.js';
import bs58 from "bs58";
import '@solana/wallet-adapter-react-ui/styles.css';
import Logo from "../assets/cerb-logo.png";
import {removeLocalStorage} from "../stores/utils.js";
import {browserName} from "react-device-detect";
import useUser from "../stores/useUser.js";
import MainMenu from "../interface/MainMenu.jsx";
import {Payload, SIWS} from "@web3auth/sign-in-with-solana";

const browserLinksForAddPhantom = {
    Firefox: <a href="https://addons.mozilla.org/ru/firefox/addon/phantom-app/" target="_blank">Add Phantom</a>,
    Chrome: <a href="https://chromewebstore.google.com/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa" target="_blank">Add Phantom</a>,
    Brave: <a href="https://chromewebstore.google.com/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa" target="_blank">Add Phantom</a>,
    Default: <a href="https://chromewebstore.google.com/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa" target="_blank">Add Phantom</a>,
}
const isPhantomAvailable = typeof window['solana'] !== 'undefined';
const SendMessageComponent = ({setButtonText, loginSolana}) => {
    // Domain and origin
    const domain = window.location.host;
    const origin = window.location.origin;
    const {publicKey, signMessage, connected, disconnect} = useWallet();
    useEffect(() => {
        if (connected) {
            _signMessage()
        }
    }, [connected]);
    const _signMessage = async () => {
        try {
            removeLocalStorage('walletName');
            const payload = new Payload();
            payload.domain = domain;
            const statement = 'Authentication for AddictionBetCopy';
            payload.address = publicKey.toString();
            payload.uri = origin;
            payload.statement = statement;
            payload.version = "1";
            payload.chainId = 1;

            let message = new SIWS({ payload });
            const address = new PublicKey(publicKey).toString();
            const messageText = message.prepareMessage();
            const messageEncoded = new TextEncoder().encode(messageText);
            const signature = await signMessage(messageEncoded);
            loginSolana({address, sign: bs58.encode(signature), payload})
        } catch (error) {
            setButtonText('Login wallet')
            await disconnect()
        }
    };

    return <></>
}
export const ConnectSolana = () => {
    const {
        loginSolana,
        isLogin,
        verify,
    } = useUser((state) => state);
    const [buttonText, setButtonText] = useState('Login wallet')
    const network = WalletAdapterNetwork.Mainnet;

    console.log(isPhantomAvailable, 'isPhantomAvailable')

    useEffect(() => {
        verify();
    }, [verify])

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(
        () => [
            new UnsafeBurnerWalletAdapter(),
        ],
        [network]
    );
    const onClick = () => {
        setButtonText('Connecting')
    }

    if (!isPhantomAvailable) {
        return (
            <div className="connect">
                <div className="connect-button">
                    {browserLinksForAddPhantom[browserName]}
                </div>
            </div>
        )
    }

    if (isLogin) {
        return <MainMenu/>
    }

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect={true}>
                <WalletModalProvider>
                    <div className="connect">
                        <img className="connect-logo" src={Logo} alt="Cerb Coin Logo"/>
                        <WalletMultiButton
                            style={{backgroundColor: 'transparent'}}
                            children={
                                <div className="connect-button" onClick={() => onClick()}>
                                    {buttonText}
                                </div>
                            }
                            startIcon={<></>}
                        />
                    </div>
                    <SendMessageComponent setButtonText={setButtonText} loginSolana={loginSolana}/>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};