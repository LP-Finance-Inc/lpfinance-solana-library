import { getTokenPrice } from "../../utils/global";
import { readAuctionStateAccount } from "../../utils/AuctionFun/readAuctionStateAccount";
import { readAuctionUserAccount } from "../../utils/AuctionFun/readAuctionUserAccount";
import api from "../../api";
import axios from "axios";

export const getLiquidatorFunds = async (wallet) => {
  try {
    const { AuctionTotalLpUSD } = await readAuctionStateAccount(wallet);

    const { TokenPriceObj } = await getTokenPrice();
    const { lpUSDTokenPrice } = TokenPriceObj;

    const LiquidatorFunds = AuctionTotalLpUSD * lpUSDTokenPrice;

    return {
      LiquidatorFunds,
    };
  } catch (error) {
    return {
      LiquidatorFunds: 0,
    };
  }
};

export const getAPY = async () => {
  try {
    const response = await axios.get(api.getAPY);

    if (response.status === 200) {
      return {
        APY: response.data.APY,
      };
    }
  } catch (error) {
    if (error.response.status === 500) {
      return {
        APY: 0,
      };
    }
  }
};

export const getLastEpochProfit = async () => {
  try {
    const response = await axios.get(api.getLastEpochProfit);

    if (response.status === 200) {
      return {
        LastEpochProfit: response.data.LastEpochProfit,
      };
    }
  } catch (error) {
    if (error.response.status === 500) {
      return {
        LastEpochProfit: 0,
      };
    }
  }
};

export const getAuctionUserAccount = async (wallet) => {
  const { AuctionStakeTotalRewardPercent } = await readAuctionStateAccount(
    wallet
  );
  const { UserAuctionDepositedLpUSD } = await readAuctionUserAccount(wallet);

  const Deposit =
    (AuctionStakeTotalRewardPercent * UserAuctionDepositedLpUSD) / 100;

  const { TokenPriceObj } = await getTokenPrice();
  const { lpUSDTokenPrice } = TokenPriceObj;

  const lpUSDValue = lpUSDTokenPrice * Deposit;

  return {
    Deposit,
    lpUSDValue,
  };
};
