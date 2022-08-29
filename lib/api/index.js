const SolanaEndpoint = "https://www.server.lp.finance/api/solana";

const api = {
  wallet: SolanaEndpoint + "/global/wallet",
  getSolana: SolanaEndpoint + "/global/getSolana",
  getLiquidateAccountList: SolanaEndpoint + "/liquidate/getAccountList",
  getLastEpochProfit: SolanaEndpoint + "/global/getLastEpochProfit",
  getAPY: SolanaEndpoint + "/global/getAPY",
};

export default api;
