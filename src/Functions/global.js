import api from "../api";
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
