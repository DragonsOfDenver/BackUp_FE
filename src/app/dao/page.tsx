"use client";
import React, { useState, useEffect } from "react";
import styles from "./DAOpage.module.css";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { contractConfig } from "@/contracts";

function DAOPage() {
    const { address, isConnected } = useAccount();
    const [proposals, setProposals] = useState([]);
    const [newProposalTitle, setNewProposalTitle] = useState('');
    const [newProposalDescription, setNewProposalDescription] = useState('');
    const [endBlock, setEndBlock] = useState('');

    const { writeContract } = useWriteContract();

    // Prepare contract write for creating a new proposal
    const proposalCount = useReadContract({
        abi: contractConfig.ViceCasinoDao.abi,
        address: contractConfig.ViceCasinoDao.address,
        functionName: "proposalCount",
    });

    console.log("proposalCount", proposalCount.data);
    // Voting on a proposal
    

    // Fetch all proposals
    const fetchProposals = async () => {
        // Assuming you have a function to fetch all proposal IDs or details
        // This is just an example; you'll need to implement actual logic based on your contract
        
    };

    useEffect(() => {
        if (isConnected) {
            fetchProposals();
        }
    }, [isConnected, fetchProposals]);

    return (
        <div>
            <h1>DAO Voting Page</h1>
            {isConnected ? (
                <>
                    <div>
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
                        {/* <button onClick={() => createProposal()}>Create Proposal</button> */}
                    </div>
                    <div>
                        {proposals.map((proposal, index) => (
                            <div key={index}>
                                {/* <h2>{proposal.title}</h2>
                                <p>{proposal.description}</p>
                                <button onClick={() => voteOnProposal(proposal.id, 1)}>Vote For</button>
                                <button onClick={() => voteOnProposal(proposal.id, 0)}>Vote Against</button> */}
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p>Please connect your wallet.</p>
            )}
        </div>
    );
}

export default DAOPage;

