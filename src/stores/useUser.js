import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import injectedModule from "@web3-onboard/injected-wallets";
import Onboard from "@web3-onboard/core";
import { Web3 } from "web3";
import { getLocalStorage, setLocalStorage, removeLocalStorage, myFetch } from "./utils";
import { levelsObj } from "./levels.js";

const infuraKey = 'a2678da8c71f4758bed859f82152f92c'
const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${infuraKey}`

const injected = injectedModule();

const onboard = Onboard({
    wallets: [injected],
    chains: [
        {
            id: "0x1", // chain ID must be in hexadecimel
            token: "ETH", // main chain token
            namespace: "evm",
            label: "Ethereum Mainnet",
            rpcUrl: MAINNET_RPC_URL
        },
    ],
});

const useUser = create(
    subscribeWithSelector((set, get) => ({
        isLogin: false,
        isLoading: false,
        walletAddress: null,
        level: null,
        isConnecting: false,
        disconnectMetamask: () => {
            removeLocalStorage('access_token');
            set({ isLogin: false, walletAddress: null, level: null })
        },
        verify: async () => {
            try {
                const token = getLocalStorage('access_token');

                if (token) {
                    const { user } = await myFetch('/user/verify', 'GET', token);
                    let walletAddress = '';
                    let isLogin = false;
                    let level = false;
                    if (user) {
                        walletAddress = user.walletAddress;
                        isLogin = true;
                        level = user.level;
                    } else {
                        removeLocalStorage('access_token');
                        walletAddress = '';
                        isLogin = false;
                        level = '';
                    }
                    set(() => {
                        return { walletAddress, isLogin, level, isLoading: false };
                    });
                }{
                    set(() => {
                        return { isLoading: false };
                    });
                }
            } catch (e) {
                removeLocalStorage('access_token');
                return { walletAddress: "" };
            }
        },
        login: async () => {
            try {
                const token = getLocalStorage('access_token');
                if (token) {
                    await this.verify();
                } else {
                    set(() => ({ isConnecting: true }))
                    const wallets = await onboard.connectWallet();
                    const { accounts, chains, provider } = wallets[0];
                    const message = 'Authentication for AddictionBetCopy';
                    const web3 = new Web3(provider);
                    const signature = await web3.eth.personal.sign(message, accounts[0].address, '');
                    if (web3) {
                        const [address] = await web3.eth.requestAccounts()
                        const message = 'Authentication for AddictionBetCopy';
                        const signature = await web3.eth.personal.sign(message, address, '');
                        const { token, user } = await myFetch('/user/login', 'POST', null, {message, address, signature});

                        if (token && user) {
                            setLocalStorage('access_token', token);
                            set(() => {
                                return { walletAddress: user.walletAddress, isLogin: true, level: user.level, isLoading: false, isConnecting: false };
                            });
                        }
                    }
                }
            } catch (e) {
                removeLocalStorage('access_token');
                set(() => ({ isConnecting: false, isLoading: false }))
            }
        },
        updateLevel: async () => {
            try {
                const level = levelsObj[get().level];
                const token = getLocalStorage('access_token');
                const { user } = await myFetch('/user', 'PUT', token, { level: level.nextLevel });

                if (token && user) {
                    set( (state) => {
                        return { level: user.level };
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    }))
);

export default useUser;