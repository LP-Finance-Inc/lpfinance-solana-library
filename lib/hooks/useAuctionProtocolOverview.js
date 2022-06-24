import { useEffect, useState } from "react";
import {
  getCBSProtocolOverview,
  getLiquidatorFunds,
  getAPY,
  getLastEpochProfit,
} from "../Functions";

export const useAuctionProtocolOverview = (wallet) => {
  const [AuctionValues, setAuctionValues] = useState({
    netDeposit: 0,
    auctionAPY: 0,
    netLiquidatorFunds: 0,
    lastEpochProfit: 0,
  });

  useEffect(() => {
    const callAsyncFun = async () => {
      const { netDeposit } = await getCBSProtocolOverview(wallet);
      const { LiquidatorFunds } = await getLiquidatorFunds(wallet);
      const { APY } = await getAPY();
      const { LastEpochProfit } = await getLastEpochProfit();

      setAuctionValues({
        ...AuctionValues,
        netDeposit,
        auctionAPY: APY,
        netLiquidatorFunds: LiquidatorFunds,
        lastEpochProfit: LastEpochProfit,
      });
    };

    callAsyncFun();

    return () => {
      setAuctionValues({
        netDeposit: "",
        auctionAPY: "",
        netLiquidatorFunds: "",
        lastEpochProfit: "",
      });
    };
  }, []);

  return AuctionValues;
};
