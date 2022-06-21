import api from "../../api";
import axios from "axios";

export const getTokenPrice = async () => {
  try {
    const response = await axios.get(api.getSolanaCrypto);

    if (response.status === 200) {
      const { TokenPriceObject } = response.data;
      return {
        TokenPriceList: TokenPriceObject,
      };
    }
  } catch (error) {
    return {
      TokenPriceList: {},
    };
  }
};

export const getAuctionDetailsFun = async () => {
  try {
    const response = await axios.get(api.getAuctionDetails);

    if (response.status === 200) {
      const { APY, LastEpochProfit } = response.data;
      return {
        APY,
        LastEpochProfit,
      };
    }
  } catch (error) {
    return {
      APY: 0,
      LastEpochProfit: 0,
    };
  }
};
