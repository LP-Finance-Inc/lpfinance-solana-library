import axios from "axios";
import api from "../../api";
import { getSolanaWallet } from "../../utils/global";

export const getLiquidateList = async () => {
  try {
    const { token } = getSolanaWallet();

    const response = await axios.post(
      api.getAllLiquidateList,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      count: 0,
      List: [],
    };
  }
};
