import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import injectedModule, {ProviderLabel} from "@web3-onboard/injected-wallets";
import Onboard from "@web3-onboard/core";
import { Web3 } from "web3";
import { getLocalStorage, setLocalStorage, removeLocalStorage, myFetch } from "./utils";
import { levelsObj } from "./levels.js";

const infuraKey = 'a2678da8c71f4758bed859f82152f92c'
const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${infuraKey}`

const injected = injectedModule({
    // displayUnavailable: [],
    // filter: {
    //     [ProviderLabel.Binance]: 'unavailable',
    //     [ProviderLabel.Bitski]: 'unavailable'
    // },
    sort: wallets => {
        const metaMask = wallets.find(
            ({ label }) => label === ProviderLabel.MetaMask
        )
        const coinbase = wallets.find(
            ({ label }) => label === ProviderLabel.Coinbase
        )

        return (
            [
                // metaMask,
                coinbase,
                ...wallets,
                ...wallets.filter(
                    ({ label }) =>
                        label !== ProviderLabel.MetaMask
                )
            ]
                // remove undefined values
                .filter(wallet => wallet)
        )
    },
});

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
        {
            id: "101", // chain ID must be in hexadecimel
            token: "Solana", // main chain token
            namespace: "evm",
            label: "Solana Mainnet",
            // rpcUrl: MAINNET_RPC_URL
        },

    ],
    accountCenter: {
        desktop: {
            position: 'topLeft',
            enabled: false,
            // minimal: true
        },
        mobile: {
            position: 'topLeft',
            enabled: false,
            // minimal: true
        }
    },
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
                    set(() => ({ isConnecting: true }));
                    console.log('yes')
                    console.log(onboard.state.select('notifications'), 'onboard.state')
                    const wallets = await onboard.connectWallet();
                    console.log(wallets, "wallets")
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
                console.log('opna')
                removeLocalStorage('access_token');
                set(() => ({ isConnecting: false, isLoading: false }))
            }
        },
        loginSolana: async ({address, sign, payload}) => {
            try {
                const token = getLocalStorage('access_token');
                if (token) {
                    await this.verify();
                } else {
                    set(() => ({ isConnecting: true }));
                    console.log(sign, "signature")
                    const { token, user } = await myFetch('/user/login-solana', 'POST', null, {payload, address, sign});
                    console.log(token, "token")
                    console.log(user, "user")
                    if (token && user) {
                        setLocalStorage('access_token', token);
                        set(() => {
                            return { walletAddress: user.walletAddress, isLogin: true, level: user.level, isLoading: false, isConnecting: false };
                        });
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
                const { user } = await myFetch('/api/user', 'PUT', token, { level: level.nextLevel });

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