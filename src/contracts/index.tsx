"use client";
import CopeTokenABI  from "./abis/CopeToken.json";
import SlotsAtViceCasinoABI  from "./abis/SlotsAtViceCasino.json";
import ViceCasinoDaoABI from "./abis/ViceCasinoDAO.json";

export const contractConfig = {
    CopeToken: {
        address: "0xfaBe30C7DDe28e7E55993A64160e7cac23653Dd9" as `0x${string}`,
        abi: CopeTokenABI.abi
    },
    SlotsGame: {
        address: '0x9F2590aDE279e711365280224241B1f3aD3A9aEf' as `0x${string}`,
        abi: SlotsAtViceCasinoABI.abi
    },
    ViceCasinoDao: {
        address: "0x88432c67e99Ff91128127057C9405ecbC5D75909" as `0x${string}`,
        abi: ViceCasinoDaoABI.abi
    }
}
