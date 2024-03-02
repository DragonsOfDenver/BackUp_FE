"use client";
import CopeTokenABI  from "./abis/CopeToken.json";
import SlotsAtViceCasinoABI  from "./abis/SlotsAtViceCasino.json";
import ViceCasinoDaoABI from "./abis/ViceCasinoDAO.json";

export const contractConfig = {
    CopeToken: {
        address: "0x0fB06E24561Cd0477666a6c317641de69d27489B" as `0x${string}`,
        abi: CopeTokenABI.abi
    },
    SlotsGame: {
        address: '0xf9CA920eBE7BA15DB6F69eeab56f86F7Bc506b6a' as `0x${string}`,
        abi: SlotsAtViceCasinoABI.abi
    },
    ViceCasinoDao: {
        address: "0xbe8f03f5D982134f678d839beB0BA0Fe9409B427" as `0x${string}`,
        abi: ViceCasinoDaoABI.abi
    }
}
