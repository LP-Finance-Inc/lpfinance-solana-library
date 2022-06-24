import * as anchor from "@project-serum/anchor";
import { NETWORK } from "./connection";
const { Connection } = anchor.web3;

const { Wallet } = anchor;

const getProvider = async (wallet) => {
  try {
    console.log(new Wallet(wallet));
    const connection = new Connection(NETWORK, "processed");
    const provider = new anchor.Provider(connection, new Wallet(wallet), {
      preflightCommitment: "processed",
    });

    return provider;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getProvider;
