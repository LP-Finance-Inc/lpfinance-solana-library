const BaseUrl = "https://www.api.lp.finance/api";
const BaseUrlTest = "https://www.backend.lp.finance/api";

const api = {
  getSolanaCrypto: BaseUrl + "/solana/getSolana",
  getAuctionDetails: BaseUrl + "/solana/getAuctionDetails",
  getAllLiquidateList: BaseUrlTest + "/SolanaCrypto/getAllLiquidateList",
};

export default api;
