const { Keypair } = require("@solana/web3.js");

export const useWallet = (PRIVATE_KEY) => {
  var secretKey = Uint8Array.from(PRIVATE_KEY);
  var wallet = Keypair.fromSecretKey(secretKey);

  return {
    wallet,
  };
};
