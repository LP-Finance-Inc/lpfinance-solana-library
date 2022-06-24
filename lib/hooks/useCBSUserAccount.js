import { useEffect, useState } from "react";
import { getCBSUserAccount } from "../Functions";

export const useCBSUserAccount = (wallet) => {
  const [AccountDetails, setAccountDetails] = useState([]);

  useEffect(() => {
    const callAsyncFun = async () => {
      const AccountTable = await getCBSUserAccount(wallet);
      setAccountDetails(AccountTable);
    };

    callAsyncFun();

    return () => {
      setAccountDetails([]);
    };
  }, []);

  return AccountDetails;
};
