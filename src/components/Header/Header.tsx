"use client";
import React from "react";
import styles from "./header.module.css";
import { useAccount, useBalance, useReadContract } from "wagmi";
import { contractConfig } from "@/contracts";
import { formatEther } from "viem";
import '@fontsource/press-start-2p';

enum HeaderState {
    LoggedOut,
    LoggedIn,
}

function Header() {
    const [state, setState] = React.useState(HeaderState.LoggedOut);
    const [address, setAddress] = React.useState("");

    const account = useAccount();
    const balanceResult = useBalance(account);

    const CopeBal = useReadContract({
        address: contractConfig.CopeToken.address,
        abi: contractConfig.CopeToken.abi,
        functionName: 'balanceOf',
        args: [account.address],
    }) as any;    

    const slotsContractBalance = useBalance({
        address: contractConfig.SlotsGame.address,
    });

    

    React.useEffect(() => {
        if (account.address) {
            setState(HeaderState.LoggedIn);
            

        } else {
            setState(HeaderState.LoggedOut);
        }
    }, [account]);    

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Vice Roll Casino </h1>

            {state === HeaderState.LoggedIn && (
                <div className={styles.loggedIn}>
                    <div className={styles.balanceBlock}>
                        <p>Ether</p>
                        <p>{Number(balanceResult.data?.formatted).toFixed(4)} {balanceResult.data?.symbol}</p>
                    </div>

                    <div className={styles.balanceBlock}>
                        <p>Cope</p>
                        <span>
                            {formatEther(CopeBal?.data || 0)}
                        </span>
                    </div>

                    <div className={styles.balanceBlock}>
                        <p>Slots Balance</p>
                        <span>
                            {Number(slotsContractBalance.data?.formatted).toFixed(4)} {slotsContractBalance.data?.symbol}
                        </span>
                    </div>

                    {/* <p>Balance: {Number(balanceResult.data?.formatted).toFixed(4)} {balanceResult.data?.symbol}</p> */}
                </div>
            )}  
            
            <w3m-button />
        </header>
    )
}

export default Header;

