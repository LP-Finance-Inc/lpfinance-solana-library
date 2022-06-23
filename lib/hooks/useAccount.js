import  { useEffect, useState } from "react";
import { readUserAccount } from "../utils/BorrowFun/readUserAccount";

export const useAccount = (wallet) => {
  const [Values, setValues] = useState({
    val: "",
  });

  useEffect(() => {
    const callAsyncFun = async () => {
      const val = await readUserAccount(wallet);
      setValues({ ...Values, val });
    };

    callAsyncFun();

    return () => {
      setValues({
        val: "",
      });
    };
  }, []);

  return Values;
};
