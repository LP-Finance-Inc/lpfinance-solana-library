import { useEffect, useState } from "react";
import { getCBSProtocolOverview } from "../Functions";

export const useCBSProtocolOverview = (wallet) => {
  const [CBSValues, setCBSValues] = useState({
    netDeposit: 0,
    netBorrow: 0,
    cbsTVL: 0,
    systemLTV: 0,
  });

  useEffect(() => {
    const callAsyncFun = async () => {
      const { netDeposit, netBorrow, cbsTVL, systemLTV } =
        await getCBSProtocolOverview(wallet);

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
