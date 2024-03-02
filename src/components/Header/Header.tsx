"use client";
import React from "react";
import styles from "./header.module.css";
import { useAccount, useBalance, useReadContract } from "wagmi";
import { contractConfig } from "@/contracts";
import { formatEther } from "viem";

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
    
    React.useEffect(() => {
        if (account.address) {
            setState(HeaderState.LoggedIn);
            

        } else {
            setState(HeaderState.LoggedOut);
        }
    }, [account]);    

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Header</h1>

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

                    {/* <p>Balance: {Number(balanceResult.data?.formatted).toFixed(4)} {balanceResult.data?.symbol}</p> */}
                </div>
            )}  
            
            <w3m-button />
        </header>
    )
}

export default Header;

