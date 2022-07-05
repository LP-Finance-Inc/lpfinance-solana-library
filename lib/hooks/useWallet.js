import * as anchor from "@project-serum/anchor";
import bs58 from "bs58";
import { useEffect } from "react";
import { StoreWallet } from "../utils/global";

export const useWallet = (PRIVATE_KEY) => {
  const secretKey = bs58.decode(PRIVATE_KEY);
  const wallet = anchor.web3.Keypair.fromSecretKey(secretKey);
  const publicKey = wallet.publicKey.toString();

  useEffect(() => {
    const CallFun = async () => {
      await StoreWallet(publicKey);
    };

    CallFun();
  }, [publicKey]);

  return {
    wallet,
    publicKey,
  };
};
