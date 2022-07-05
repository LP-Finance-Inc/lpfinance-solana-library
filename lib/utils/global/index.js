import api from "../../api";
import axios from "axios";

export const StoreWallet = async (publicKey) => {
  try {
    if (publicKey) {
      const response = await axios.post(api.wallet, {
        wallet: publicKey,
      });

      if (response.status === 200) {
        const { token, wallet } = response.data;

        localStorage.setItem(
          "SolanaWallet",
          JSON.stringify({
            token,
            wallet,
          })
        );
      }
    } else {
      localStorage.removeItem("SolanaWallet");
    }
  } catch (error) {
    if (error.response.status === 400 || error.response.status === 500) {
      localStorage.removeItem("SolanaWallet");
    }
  }
};

export const getTokenPrice = async () => {
  try {
    const response = await axios.post(api.getSolanaCrypto);

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

export const getSolanaWallet = () => {
  const getWallet = localStorage.getItem("SolanaWallet");
  const wallet = JSON.parse(getWallet);
  return wallet;
};
