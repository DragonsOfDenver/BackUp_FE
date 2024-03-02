"use client";
import React, { useState, useEffect } from "react";
import { useAccount, useSimulateContract, usePrepareTransactionRequest, useReadContract, useWriteContract, useWatchContractEvent, useWaitForTransactionReceipt } from "wagmi";
import { contractConfig } from "@/contracts";
import { sepolia } from "viem/chains";
import { parseEther } from "viem";
import styles from "./SlotsGame.module.css";

const SymbolMapping: any = {
    0: "🐸",
    1: "🦊",
    2: "🐍",
    3: "🏆",
    4: "🎁",
};

const defaultSpin = [0, 1, 2, 3, 4].map((i) => SymbolMapping[i]);

const SlotsGame = () => {
    const { address, isConnected } = useAccount();
    const [spinWinOrLose, setSpinWinOrLose] = useState(false); // ['win', 'lose']
    const [slotsResults, setSlotsResults] = useState(defaultSpin);
    const [spinning, setSpinning] = useState(false);

    const {writeContract} = useWriteContract();
    
    useWatchContractEvent({
        address: contractConfig.SlotsGame.address,
        abi: contractConfig.SlotsGame.abi,
        eventName: 'GamePlayed',
        chainId: sepolia.id,
        onLogs(logs: any) {
            setSpinning(false);
            setSlotsResults(logs[0].args.slotsResults);
            setSpinWinOrLose(logs[0].args.isWinner);
        }
    });


    const handleSpin = () => {
        if (isConnected) {
                writeContract({
                    address: contractConfig.SlotsGame.address,
                    abi: contractConfig.SlotsGame.abi,
                    functionName: 'playSlots',
                    value: parseEther('0.0001'),
                })
            setSpinning(true);
        }
    };


    console.log("Results:", slotsResults);
    console.log("Win or Lose:", spinWinOrLose);
    console.log("Spinning:", spinning);

    return (
        <div>
            {!isConnected ? (
                <span>Please connect your wallet</span>
            ) : (
                <div>
                    <h1>Welcome to the Slots Game!</h1>
                    <button onClick={handleSpin} disabled={spinning}>
                        {spinning ? 'Spinning...' : 'Spin'}
                    </button>
                    <p>{spinWinOrLose ? 'Congratulations, you win!' : 'Try again!'}</p>
                    <div className={styles.slotsContainer}>
                        {slotsResults.map((emoji, index) => (
                            <div key={index} className={spinning ? styles.spinAnimation : styles.slot}>
                                {emoji}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SlotsGame;
