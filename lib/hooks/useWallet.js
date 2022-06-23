import * as anchor from "@project-serum/anchor";
import bs58 from "bs58";

export const useWallet = (PRIVATE_KEY) => {
  const secretKey = bs58.decode(PRIVATE_KEY);
  const wallet = anchor.web3.Keypair.fromSecretKey(secretKey);

  return {
    wallet,
  };
};
