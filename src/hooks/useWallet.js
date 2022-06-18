import { Wallet } from "@project-serum/anchor";
import bs58 from "bs58";
const { Keypair } = require("@solana/web3.js");

export const useWallet = (PRIVATE_KEY) => {
  const wallet = new Wallet(Keypair.fromSecretKey(bs58.decode(PRIVATE_KEY)));
  return {
    wallet,
  };
};
