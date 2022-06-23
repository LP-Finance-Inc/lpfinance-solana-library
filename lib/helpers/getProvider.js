import * as anchor from "@project-serum/anchor";
import { NETWORK } from "./connection";
const { Connection } = anchor.web3;

const { Wallet } = anchor;

const getProvider = async (wallet) => {
  try {
    const connection = new Connection(NETWORK, "processed");
    const provider = new anchor.Provider(
      connection,
      new Wallet(wallet),
      anchorWallet,
      {
        preflightCommitment: "processed",
      }
    );

    return provider;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getProvider;
