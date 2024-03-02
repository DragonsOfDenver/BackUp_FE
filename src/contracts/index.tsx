"use client";
import CopeTokenABI  from "./abis/CopeToken.json";
import SlotsAtViceCasinoABI  from "./abis/SlotsAtViceCasino.json";
import ViceCasinoDaoABI from "./abis/ViceCasinoDAO.json";

export const contractConfig = {
    CopeToken: {
        address: "0x6F48680A3500DbA524370021b14252c77baCa2bd" as `0x${string}`,
        abi: CopeTokenABI.abi
    },
    SlotsGame: {
        address: '0x91f14DA9F22b8823c013d5ecD07E920acA71a83f' as `0x${string}`,
        abi: SlotsAtViceCasinoABI.abi
    },
    ViceCasinoDao: {
        address: "0x6e9Cf3Ce33BCb6695fDbE6a71147B6687233C0d0" as `0x${string}`,
        abi: ViceCasinoDaoABI.abi
    }
}
