**Note: -**

## Installation

```
yarn add @lpfinance/solana
```

## **<h3>LP Finance Library</h3>**

##### This is the LP Finance javascript library to interact with https://test.lp.finance.

##### ![logo](https://www.lp.finance/images/LP_Finance_Logo__1.png)

##### [Latest API documentation](https://docs.lp.finance/)

## **configurations**

Create a config-overrides.js file in root folder

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

after install and add script in package.json file

```
yarn add -D react-app-rewired

 "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  },
```

create a .env file and start project

```
GENERATE_SOURCEMAP=false
```

## **Basic usage**

- First Create a wallet using private key to perform Transaction and get details.Private key should be in bytes.

```
import { useWallet } from "@lpfinance/solana";

const App = () => {
    const { wallet } = useWallet(process.env.PRIVATE_KEY);
}

```

- Use `useCBSProtocolOverview` hook to get cbs system details

```
import { useWallet, useCBSProtocolOverview } from "@lpfinance/solana";

const App = () => {
    const { wallet } = useWallet(process.env.PRIVATE_KEY);

    const { netDeposit, netBorrow, cbsTVL, systemLTV } =
    useCBSProtocolOverview(wallet);
}
```

- Use `useAuctionProtocolOverview` hook to get cbs system details

```
import { useWallet, useAuctionProtocolOverview } from "@lpfinance/solana";

const App = () => {
    const { wallet } = useWallet(process.env.PRIVATE_KEY);

    const { netDeposit ,auctionAPY, netLiquidatorFunds, lastEpochProfit } =
    useAuctionProtocolOverview(wallet);
}
```

- get LiquidateList using `getLiquidateList` hook to get cbs system details

```
import React, { useState, useEffect } from "react";
import { getLiquidateList } from "@lpfinance/solana";

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
