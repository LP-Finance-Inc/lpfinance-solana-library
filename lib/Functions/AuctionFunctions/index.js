import { getTokenPrice, getAuctionDetailsFun } from "../../utils/global";
import { readAuctionStateAccount } from "../../utils/AuctionFun/readAuctionStateAccount";

export const CalAuctionProtocolOverview = async (wallet) => {
  try {
    const { TokenPriceList } = await getTokenPrice();
    const { lpUSDTokenPrice } = TokenPriceList;

    const { AuctionTotalLpUSD } = await readAuctionStateAccount(wallet);

    const LiquidatorFunds = AuctionTotalLpUSD * lpUSDTokenPrice;

    const { APY, LastEpochProfit } = await getAuctionDetailsFun();

    return {
      LiquidatorFunds,
      APY,
      LastEpochProfit,
    };
  } catch (error) {}
};
