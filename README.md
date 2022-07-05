**Note: -**

## Installation

```
yarn add @lpfinance/lpfinance-solana-sdk
```

# LP Finance Library

**This is the LP Finance javascript library to interact with https://test.lp.finance.**

##### ![logo](https://www.lp.finance/images/LP_Finance_Logo__1.png)

#### [Latest API documentation](https://lp-finance-inc.github.io/lpfinance-solana-sdk-docs/)

## **configurations**

**Create a config-overrides.js file in root folder**

```
const webpack = require("webpack");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: false,
    stream: false,
    assert: false,
    http: false,
    https: false,
    os: false,
    url: false,
    fs: false,
    path: false,
    buffer: false,
    process: false,
    util: false
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  return config;
};
```

**after install and add script in package.json file**

```
yarn add -D react-app-rewired
```

```
 "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  },
```

**create a .env file and start project**

```
GENERATE_SOURCEMAP=false
```

## **Basic usage**

- **First Create a wallet using private key to perform Transaction and get details.**

```
import { useWallet } from "@lpfinance/lpfinance-solana-sdk";

const App = () => {
    const { wallet, publicKey } = useWallet(process.env.PRIVATE_KEY);
}

```

- **Use `useCBSProtocolOverview` hook to get cbs system details.**

```
import { useWallet, useCBSProtocolOverview } from "@lpfinance/lpfinance-solana-sdk";

const App = () => {
    const { wallet } = useWallet(process.env.PRIVATE_KEY);

    const { netDeposit, netBorrow, cbsTVL, systemLTV } =
    useCBSProtocolOverview(wallet);
}
```

- **Use `useAuctionProtocolOverview` hook to get cbs system details.**

```
import { useWallet, useAuctionProtocolOverview } from "@lpfinance/lpfinance-solana-sdk";

const App = () => {
    const { wallet } = useWallet(process.env.PRIVATE_KEY);

    const { netDeposit ,auctionAPY, netLiquidatorFunds, lastEpochProfit } =
    useAuctionProtocolOverview(wallet);
}
```

- **get LiquidateList using `getLiquidateList` hook to get cbs system details.**

```
import React, { useState, useEffect } from "react";
import { getLiquidateList } from "@lpfinance/lpfinance-solana-sdk";

const App = () => {

  const [LiquidateList, setLiquidateList] = useState({
    count: null,
    List: [],
  });

  useEffect(() => {
    const callLiquidate = async () => {
      const { count, List } = await getLiquidateList();
      setLiquidateList({ ...LiquidateList, count, List });
    };
    callLiquidate();
  }, []);

}
```

- **get CBS user account details using `useCBSUserAccount` hook.**

```
import { useWallet, useCBSUserAccount } from "@lpfinance/lpfinance-solana-sdk";

const App = () => {
    const { wallet } = useWallet(process.env.PRIVATE_KEY);

    const AccountDetails = useCBSUserAccount(wallet);
}
```

- **get Auction user account details using `useAuctionUserAccount` hook.**

```
import { useWallet, useAuctionUserAccount } from "@lpfinance/lpfinance-solana-sdk";

const App = () => {
    const { wallet } = useWallet(process.env.PRIVATE_KEY);

    const AccountDetails = useAuctionUserAccount(wallet);
}
```

### - **Use CBS Transaction Functions -**

**a) Deposit - Use depositCBS function and TokenName should be "SOL", "lpUSD", "lpSOL", "lpBTC", "lpETH", "USDC", "BTC", "mSOL", "ETH", "UST", "SRM", "scnSOL", "stSOL", "USDT".**

```
import { useWallet, depositCBS } from "@lpfinance/lpfinance-solana-sdk";

const App = () => {
    const { wallet } = useWallet(process.env.PRIVATE_KEY);

   const SendTransaction = async() => {
    const { message } =  await  depositCBS(wallet, amount, TokenName);
   }

    return (
      <>
        <button onClick={SendTransaction}>depositCBS</button>
      </>
    )
}
```

**b) Borrow - Use borrowCBS function and TokenName should be "lpUSD", "lpSOL", "lpBTC", "lpETH".**

```
import { useWallet, borrowCBS } from "@lpfinance/lpfinance-solana-sdk";

const App = () => {
    const { wallet } = useWallet(process.env.PRIVATE_KEY);

   const SendTransaction = async() => {
    const { message } =  await  borrowCBS(wallet, amount, TokenName);
   }

    return (
      <>
        <button onClick={SendTransaction}>borrowCBS</button>
      </>
    )
}
```

**c) Withdraw - Use withdrawCBS function and TokenName should be "SOL", "lpUSD", "lpSOL", "lpBTC", "lpETH", "USDC", "BTC", "mSOL", "ETH", "UST", "SRM", "scnSOL", "stSOL", "USDT".**

```
import { useWallet, withdrawCBS } from "@lpfinance/lpfinance-solana-sdk";

const App = () => {
    const { wallet } = useWallet(process.env.PRIVATE_KEY);

   const SendTransaction = async() => {
    const { message } =  await  withdrawCBS(wallet, amount, TokenName);
   }

    return (
      <>
        <button onClick={SendTransaction}>withdrawCBS</button>
      </>
    )
}
```

**d) Repayment - Use repayCBS function and TokenName should be "SOL", "lpUSD", "lpSOL", "lpBTC", "lpETH", "USDC", "BTC", "ETH".**

```
import { useWallet, repayCBS } from "@lpfinance/lpfinance-solana-sdk";

const App = () => {
    const { wallet } = useWallet(process.env.PRIVATE_KEY);

   const SendTransaction = async() => {
    const { message } =  await  repayCBS(wallet, amount, TokenName);
   }

    return (
      <>
        <button onClick={SendTransaction}>repayCBS</button>
      </>
    )
}
```

### - **Use Auction Transaction Functions -**

**a) Deposit - Use depositAuction function and "lpUSD" is default token to perform deposit.**

```
import { useWallet, depositAuction } from "@lpfinance/lpfinance-solana-sdk";

const App = () => {
    const { wallet } = useWallet(process.env.PRIVATE_KEY);

   const SendTransaction = async() => {
    const { message } =  await  depositAuction(wallet, amount);
   }

    return (
      <>
        <button onClick={SendTransaction}>depositAuction</button>
      </>
    )
}
```

**a) Withdraw - Use withdrawAuction function and "lpUSD" is default token to perform withdraw.**

```
import { useWallet, withdrawAuction } from "@lpfinance/lpfinance-solana-sdk";

const App = () => {
    const { wallet } = useWallet(process.env.PRIVATE_KEY);

   const SendTransaction = async() => {
    const { message } =  await  withdrawAuction(wallet, amount);
   }

    return (
      <>
        <button onClick={SendTransaction}>withdrawAuction</button>
      </>
    )
}
```

- **Liquidate - Use liquidateAccount function**

```
import { useWallet, liquidateAccount } from "@lpfinance/lpfinance-solana-sdk";

const App = () => {
    const { wallet } = useWallet(process.env.PRIVATE_KEY);

   const liquidateAccountFun = async() => {
    const { message } =  await liquidateAccount( wallet, userKey, Debt, Collateral,
    LTV, LiquidatorFunds, LastEpochProfit);

    return (
      <>
        <button onClick={liquidateAccountFun}>liquidateAccount</button>
      </>
    )
}
```
