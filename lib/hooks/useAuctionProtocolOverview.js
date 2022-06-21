import { useEffect, useState } from "react";
import {
  CalCBSProtocolOverview,
  CalAuctionProtocolOverview,
} from "../Functions";

export const useAuctionProtocolOverview = (wallet) => {
  const [AuctionValues, setAuctionValues] = useState({
    netDeposit: "",
    auctionAPY: "",
    netLiquidatorFunds: "",
    lastEpochProfit: "",
  });

  useEffect(() => {
    const callAsyncFun = async () => {
      const { netDeposit } = await CalCBSProtocolOverview(wallet);

      const { LiquidatorFunds, APY, LastEpochProfit } =
        CalAuctionProtocolOverview(wallet);

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
      setCBSValues({
        netDeposit: "",
        auctionAPY: "",
        netLiquidatorFunds: "",
        lastEpochProfit: "",
      });
    };
  }, []);

  return AuctionValues;
};
