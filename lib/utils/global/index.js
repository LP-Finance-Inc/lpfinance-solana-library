import api from "../../api";
import axios from "axios";

export const getTokenPrice = async () => {
  try {
    const response = await axios.get(api.getSolanaCrypto);

    if (response.status === 200) {
      const { TokenPriceObj, TokenPriceArr, SolendList, ApricotList } =
        response.data;
      return {
        TokenPriceObj,
        TokenPriceArr,
        SolendList,
        ApricotList,
      };
    }
  } catch (error) {
    return {
      TokenPriceList: {},
    };
  }
};
