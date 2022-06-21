import axios from "axios";
import api from "../../api";

export const getLiquidateList = async () => {
  try {
    const response = await axios.post(api.getAllLiquidateList, {});
    return response.data;
  } catch (error) {
    return {
      count: 0,
      List: [],
    };
  }
};
