import { useEffect, useState } from "react";
import { CalCBSProtocolOverview } from "../Functions";

export const useCBSProtocolOverview = (wallet) => {
  const [CBSValues, setCBSValues] = useState({
    netDeposit: "",
    netBorrow: "",
    cbsTVL: "",
    systemLTV: "",
  });

  useEffect(() => {
    const callAsyncFun = async () => {
      const { netDeposit, netBorrow, cbsTVL, systemLTV } =
        await CalCBSProtocolOverview(wallet);
      setCBSValues({ ...CBSValues, netDeposit, netBorrow, cbsTVL, systemLTV });
    };
    callAsyncFun();

    return () => {
      setCBSValues({
        netDeposit: "",
        netBorrow: "",
        cbsTVL: "",
        systemLTV: "",
      });
    };
  }, []);

  return CBSValues;
};
