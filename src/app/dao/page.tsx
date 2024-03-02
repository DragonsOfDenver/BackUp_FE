"use client";
import React, { useState, useEffect, useCallback } from "react";
import styles from "./DAOpage.module.css";
import { useAccount, useWriteContract, useReadContract, useWalletClient, usePublicClient } from "wagmi";
import { contractConfig } from "@/contracts";
import { ethers } from "ethers";
import { sepolia } from "viem/chains";


type Proposal = {
    id: number;
    title: string;
    description: string;
    endBlock: number;
    votesFor: number;
    votesAgainst: number;
    executed: boolean;
};

enum PageState {
    ViewProposals,
    CreateProposal,
}

function DAOPage() {
    const [state, setState] = useState(PageState.ViewProposals);
    const { address, isConnected } = useAccount();
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [newProposalTitle, setNewProposalTitle] = useState('');
    const [newProposalDescription, setNewProposalDescription] = useState('');
    const [endBlock, setEndBlock] = useState('');
    const [loading, setLoading] = useState(false);
    const { data: walletClient } = useWalletClient();
    const publicClient = usePublicClient();


    const proposalCount = useReadContract({
        abi: contractConfig.ViceCasinoDao.abi,
        address: contractConfig.ViceCasinoDao.address,
        functionName: 'proposalCount',
    }) as any;

    const proposalCountNumber = Number(proposalCount?.data)

    // Function to fetch proposals
    useEffect(() => {
        const fetchAllProposals = async () => {
            if (proposalCountNumber > 0 && isConnected && publicClient) {
                let proposalsTemp = [];
                for (let i = 1; i <= proposalCountNumber; i++) {
                    const proposal: any = await publicClient.readContract({
                        abi: contractConfig.ViceCasinoDao.abi,
                        address: contractConfig.ViceCasinoDao.address,
                        functionName: 'proposals',
                        args: [i],
                    });
                    console.log("proposal", proposal);  // Assuming proposal is an array [id, proposer, title, description, votesFor, votesAgainst, startBlock, endBlock, state]
                    proposalsTemp.push({
                        id: Number(proposal[0]), // Assuming the first item is the ID
                        title: proposal[2],
                        description: proposal[3],
                        endBlock: Number(proposal[7]),
                        votesFor: Number(proposal[4]),
                        votesAgainst: Number(proposal[5]),
                        executed: proposal[8] === 3,
                    });
                    
                }
                setProposals(proposalsTemp);
            }
        };
    
        fetchAllProposals();
    }, [proposalCountNumber, isConnected, publicClient]);
    
    
    console.log("Prop state", proposals);
    

    // Read the total count of proposals
    const { writeContract } = useWriteContract();
    return (
        <div className={styles.container}>
            <h1>DAO Voting Page</h1>
            <button onClick={() => setState(PageState.ViewProposals)}>View Proposals</button>
            <button onClick={() => setState(PageState.CreateProposal)}>Create Proposal</button>

            {isConnected ? (
                <>
                    {state === PageState.ViewProposals && (
                        <div>
                            <h2>Proposals</h2>
                            <p>Total Proposals: {proposalCountNumber}</p>

                            <div className={styles.proposals}>
                            {proposals.map((proposal, index) => (
                                <div key={index} className={styles.proposal}>
                                    <h2>{proposal.title}</h2>
                                    <p>{proposal.description}</p>
                                    {/* Add Vote Buttons here */}
                                    <button onClick={() => { 
                                        writeContract({
                                            abi: contractConfig.ViceCasinoDao.abi,
                                            address: contractConfig.ViceCasinoDao.address,
                                            functionName: 'voteOnProposal',
                                            args: [proposal.id, 1], // 1 for 'For'
                                        });
                                    }}>Vote For</button>
                                    <button onClick={() => { 
                                        writeContract({
                                            abi: contractConfig.ViceCasinoDao.abi,
                                            address: contractConfig.ViceCasinoDao.address,
                                            functionName: 'voteOnProposal',
                                            args: [proposal.id, 0], // 0 for 'Against'
                                        });
                                    }}>Vote Against</button>
                                </div>
                            ))}

                            </div>
                        </div>
                    )}
                    {state === PageState.CreateProposal && (
                    <div className={styles.createProposal}>
                        <input
                            value={newProposalTitle}
                            onChange={(e) => setNewProposalTitle(e.target.value)}
                            placeholder="Proposal Title"
                        />
                        <textarea
                            value={newProposalDescription}
                            onChange={(e) => setNewProposalDescription(e.target.value)}
                            placeholder="Proposal Description"
                        />
                        <input
                            type="number"
                            value={endBlock}
                            onChange={(e) => setEndBlock(e.target.value)}
                            placeholder="End Block"
                        />
                        <button 
                            disabled={loading}
                            onClick={() => { 
                                writeContract({
                                    abi: contractConfig.ViceCasinoDao.abi,
                                    address: contractConfig.ViceCasinoDao.address,
                                    functionName: 'createProposal',
                                    args: [newProposalTitle, newProposalDescription, endBlock],
                                });
                            }} 
                        >
                            Create Proposal
                        </button>
                    </div>
                )}
                    
                </>
            ) : (
                <p>Please connect your wallet.</p>
            )}
        </div>
    );
}

export default DAOPage;
