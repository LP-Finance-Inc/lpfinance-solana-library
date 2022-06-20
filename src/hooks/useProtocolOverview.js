import { useEffect } from "react";
import { CalProtocolOverview } from "../Functions";

export const useProtocolOverview = (wallet) => {
  const [CBSValues, setCBSValues] = useState({
    TotalSupply: "",
    TotalBorrowed: "",
    TVL: "",
    NetLTV: "",
  });

  useEffect(() => {
    const callAsyncFun = async () => {
      const { TotalSupply, TotalBorrowed, TVL, NetLTV } =
        await CalProtocolOverview(wallet);
      setCBSValues({ ...CBSValues, TotalSupply, TotalBorrowed, TVL, NetLTV });
    };
    callAsyncFun();
  }, []);

  return CBSValues;
};
