const endpoint = "https://backend.lpblock.org/api";

const api = {
  getSolanaCrypto: endpoint + "/SolanaCrypto/getSolanaCrypto",
  getLiquidateAccountList: endpoint + "/SolanaCrypto/getLiquidateAccountList",
  deleteLiquidated: endpoint + "/SolanaCrypto/deleteLiquidated",
  getLastEpochProfit: endpoint + "/SolanaCrypto/getLastEpochProfit",
  getAPY: endpoint + "/SolanaCrypto/getAPY",
};

export default api;
