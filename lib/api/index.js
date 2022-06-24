const BaseUrlTest = "https://www.backend.lp.finance/api";

const api = {
  getSolanaCrypto: BaseUrlTest + "/SolanaCrypto/getSolanaCrypto",
  getAllLiquidateList: BaseUrlTest + "/SolanaCrypto/getAllLiquidateList",
  getLastEpochProfit: BaseUrlTest + "/SolanaCrypto/getLastEpochProfit",
  getAPY: BaseUrlTest + "/SolanaCrypto/getAPY",
};

export default api;
