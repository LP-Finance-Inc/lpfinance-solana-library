import { useEffect, useState } from "react";
import { getAuctionUserAccount } from "../Functions";

export const useAuctionUserAccount = (wallet) => {
  const [AccountDetails, setAccountDetails] = useState([]);

  useEffect(() => {
    const callAsyncFun = async () => {
      const AccountTable = await getAuctionUserAccount(wallet);
      setAccountDetails(AccountTable);
    };

    callAsyncFun();

    return () => {
      setAccountDetails([]);
    };
  }, []);

  return AccountDetails;
};
