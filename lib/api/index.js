const SolanaEndpoint = "https://www.api.lp.finance/api/solana";

const api = {
  wallet: SolanaEndpoint + "/global/wallet",
  getSolanaCrypto: SolanaEndpoint + "/global/getSolana",
  getAllLiquidateList: SolanaEndpoint + "/liquidate/getAccountLists",
  getLastEpochProfit: SolanaEndpoint + "/global/getLastEpochProfit",
  getAPY: SolanaEndpoint + "/global/getAPY",
};

export default api;
