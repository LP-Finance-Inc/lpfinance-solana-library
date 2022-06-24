import { getTokenPrice } from "../../utils/global";
import { readStateAccount } from "../../utils/BorrowFun/readStateAccount";
import { readUserAccount } from "../../utils/BorrowFun/readUserAccount";

export const getCBSProtocolOverview = async (wallet) => {
  const { TokenPriceObj } = await getTokenPrice();

  const {
    SOLTokenPrice,
    BTCTokenPrice,
    USDCTokenPrice,
    mSOLTokenPrice,
    ETHTokenPrice,
    SRMTokenPrice,
    USDTTokenPrice,
    stSOLTokenPrice,
    scnSOLTokenPrice,
    lpSOLTokenPrice,
    lpUSDTokenPrice,
    lpBTCTokenPrice,
    lpETHTokenPrice,
  } = TokenPriceObj;

  const {
    //borrowed
    TotalBorrowLpSOL,
    TotalBorrowLpUSD,
    TotalBorrowLpBTC,
    TotalBorrowLpETH,
    //deposited
    TotalDepositedSOL,
    TotalDepositedBTC,
    TotalDepositedUSDC,
    TotalDepositedMSOL,
    TotalDepositedETH,
    TotalDepositedSRM,
    TotalDepositedUSDT,
    TotalDepositedstSOL,
    TotalDepositedscnSOL,
    TotalDepositedLpSOL,
    TotalDepositedLpUSD,
    TotalDepositedLpBTC,
    TotalDepositedLpETH,
  } = await readStateAccount(wallet);

  //  global variables start
  const DepositedSOLAmountCal = TotalDepositedSOL * SOLTokenPrice;
  const DepositedBTCAmountCal = TotalDepositedBTC * BTCTokenPrice;
  const DepositedUSDCAmountCal = TotalDepositedUSDC * USDCTokenPrice;
  const DepositedMSOLAmountCal = TotalDepositedMSOL * mSOLTokenPrice;
  const DepositedETHAmountCal = TotalDepositedETH * ETHTokenPrice;
  const DepositedSRMAmountCal = TotalDepositedSRM * SRMTokenPrice;
  const DepositedUSDTAmountCal = TotalDepositedUSDT * USDTTokenPrice;
  const DepositedstSOLAmountCal = TotalDepositedstSOL * stSOLTokenPrice;
  const DepositedscnSOLAmountCal = TotalDepositedscnSOL * scnSOLTokenPrice;
  const DepositedLpSOLAmountCal = TotalDepositedLpSOL * lpSOLTokenPrice;
  const DepositedLpUSDAmountCal = TotalDepositedLpUSD * lpUSDTokenPrice;
  const DepositedLpBTCAmountCal = TotalDepositedLpBTC * lpBTCTokenPrice;
  const DepositedLpETHAmountCal = TotalDepositedLpETH * lpETHTokenPrice;

  const BorrowedLpSOLAmountCal = TotalBorrowLpSOL * lpSOLTokenPrice;
  const BorrowedLpUSDAmountCal = TotalBorrowLpUSD * lpUSDTokenPrice;
  const BorrowedLpBTCAmountCal = TotalBorrowLpBTC * lpBTCTokenPrice;
  const BorrowedLpETHAmountCal = TotalBorrowLpETH * lpETHTokenPrice;

  const TotalDepositedCal =
    DepositedSOLAmountCal +
    DepositedBTCAmountCal +
    DepositedUSDCAmountCal +
    DepositedLpUSDAmountCal +
    DepositedLpSOLAmountCal +
    DepositedMSOLAmountCal +
    DepositedETHAmountCal +
    DepositedSRMAmountCal +
    DepositedUSDTAmountCal +
    DepositedstSOLAmountCal +
    DepositedscnSOLAmountCal +
    DepositedLpBTCAmountCal +
    DepositedLpETHAmountCal;

  const TotalBorrowedCal =
    BorrowedLpUSDAmountCal +
    BorrowedLpSOLAmountCal +
    BorrowedLpBTCAmountCal +
    BorrowedLpETHAmountCal;

  //protocol
  const netDeposit = TotalDepositedCal;
  const netBorrow = TotalBorrowedCal;
  const cbsTVL = TotalDepositedCal - TotalBorrowedCal;
  const systemLTV = (TotalBorrowedCal / TotalDepositedCal) * 100;

  return {
    netDeposit,
    netBorrow,
    cbsTVL,
    systemLTV,
  };
};

export const getCBSUserAccount = async (wallet) => {
  const { TokenPriceObj, SolendList, ApricotList } = await getTokenPrice();

  const {
    DepositedSolAmount,
    DepositedBtcAmount,
    DepositedUsdcAmount,
    DepositedMSOLAmount,
    DepositedETHAmount,
    DepositedSRMAmount,
    DepositedUSDTAmount,
    DepositedstSOLAmount,
    DepositedscnSOLAmount,

    LendingSolAmount,
    LendingBtcAmount,
    LendingUsdcAmount,
    LendingMSOLAmount,
    LendingETHAmount,
    LendingSRMAmount,
    LendingUSDTAmount,
    LendingstSOLAmount,
    LendingscnSOLAmount,

    DepositedLpSolAmount,
    DepositedLpUsdAmount,
    DepositedLpBTCAmount,
    DepositedLpETHAmount,
    BorrowedLpSOLAmount,
    BorrowedLpUsdAmount,
    BorrowedLpBTCAmount,
    BorrowedLpETHAmount,
  } = await readUserAccount(wallet);

  const {
    SOLTokenPrice,
    BTCTokenPrice,
    USDCTokenPrice,
    mSOLTokenPrice,
    ETHTokenPrice,
    SRMTokenPrice,
    USDTTokenPrice,
    stSOLTokenPrice,
    scnSOLTokenPrice,
    lpSOLTokenPrice,
    lpUSDTokenPrice,
    lpBTCTokenPrice,
    lpETHTokenPrice,
  } = TokenPriceObj;

  const DepositedUserSOLAmountCal =
    (DepositedSolAmount + LendingSolAmount) * SOLTokenPrice;

  const DepositedUserBTCAmountCal =
    (DepositedBtcAmount + LendingBtcAmount) * BTCTokenPrice;
  const DepositedUserUSDCAmountCal =
    (DepositedUsdcAmount + LendingUsdcAmount) * USDCTokenPrice;
  const DepositedUserMSOLAmountCal =
    (DepositedMSOLAmount + LendingMSOLAmount) * mSOLTokenPrice;
  const DepositedUserETHAmountCal =
    (DepositedETHAmount + LendingETHAmount) * ETHTokenPrice;
  const DepositedUserSRMAmountCal =
    (DepositedSRMAmount + LendingSRMAmount) * SRMTokenPrice;
  const DepositedUserUSDTAmountCal =
    (DepositedUSDTAmount + LendingUSDTAmount) * USDTTokenPrice;
  const DepositedUserstSOLAmountCal =
    (DepositedstSOLAmount + LendingstSOLAmount) * stSOLTokenPrice;
  const DepositedUserscnSOLAmountCal =
    (DepositedscnSOLAmount + LendingscnSOLAmount) * scnSOLTokenPrice;

  const DepositedUserLpSOLAmountCal = DepositedLpSolAmount * lpSOLTokenPrice;
  const DepositedUserLpUSDAmountCal = DepositedLpUsdAmount * lpUSDTokenPrice;
  const DepositedUserLpBTCAmountCal = DepositedLpBTCAmount * lpBTCTokenPrice;
  const DepositedUserLpETHAmountCal = DepositedLpETHAmount * lpETHTokenPrice;

  const BorrowedUserLpSOLAmountCal = BorrowedLpSOLAmount * lpSOLTokenPrice;
  const BorrowedUserLpUSDAmountCal = BorrowedLpUsdAmount * lpUSDTokenPrice;
  const BorrowedUserLpBTCAmountCal = BorrowedLpBTCAmount * lpBTCTokenPrice;
  const BorrowedUserLpETHAmountCal = BorrowedLpETHAmount * lpETHTokenPrice;

  const UserTotalDepositedCal =
    DepositedUserSOLAmountCal +
    DepositedUserBTCAmountCal +
    DepositedUserUSDCAmountCal +
    DepositedUserMSOLAmountCal +
    DepositedUserETHAmountCal +
    DepositedUserSRMAmountCal +
    DepositedUserUSDTAmountCal +
    DepositedUserstSOLAmountCal +
    DepositedUserscnSOLAmountCal +
    DepositedUserLpSOLAmountCal +
    DepositedUserLpUSDAmountCal +
    DepositedUserLpBTCAmountCal +
    DepositedUserLpETHAmountCal;

  const UserTotalBorrowedCal =
    BorrowedUserLpUSDAmountCal +
    BorrowedUserLpSOLAmountCal +
    BorrowedUserLpBTCAmountCal +
    BorrowedUserLpETHAmountCal;

  //account
  const BorrowLimit = UserTotalDepositedCal * 0.85;
  const Liquidation = UserTotalDepositedCal * 0.94;
  const LTV = (UserTotalBorrowedCal / UserTotalDepositedCal) * 100;

  const RewardObj = {
    SOLRewardAPY: {
      name: "",
      value: "",
    },
    BTCRewardAPY: {
      name: "",
      value: "",
    },
    USDCRewardAPY: {
      name: "",
      value: "",
    },
    mSOLRewardAPY: {
      name: "",
      value: "",
    },
    ETHRewardAPY: {
      name: "",
      value: "",
    },
    SRMRewardAPY: {
      name: "",
      value: "",
    },
    USDTRewardAPY: {
      name: "",
      value: "",
    },
    stSOLRewardAPY: {
      name: "",
      value: "",
    },
    scnSOLRewardAPY: {
      name: "",
      value: "",
    },
    lpSOLRewardAPY: {
      name: "",
      value: "",
    },
    lpUSDRewardAPY: {
      name: "",
      value: "",
    },
    lpBTCRewardAPY: {
      name: "",
      value: "",
    },
    lpETHRewardAPY: {
      name: "",
      value: "",
    },
  };

  for (var i = 0; i < SolendList?.length; i++) {
    for (var j = 0; j < ApricotList?.length; j++) {
      if (SolendList[i].AssetsName === ApricotList[j].AssetsName) {
        if (SolendList[i].SupplyAPY > ApricotList[j].DepositAPR) {
          const RewardAPY = SolendList[i].SupplyAPY / 10;

          if (SolendList[i].AssetsName === "SOL") {
            RewardObj.SOLRewardAPY.name = "solend";
            RewardObj.SOLRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "BTC") {
            RewardObj.BTCRewardAPY.name = "solend";
            RewardObj.BTCRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "USDC") {
            RewardObj.USDCRewardAPY.name = "solend";
            RewardObj.USDCRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "mSOL") {
            RewardObj.mSOLRewardAPY.name = "solend";
            RewardObj.mSOLRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "ETH") {
            RewardObj.ETHRewardAPY.name = "solend";
            RewardObj.ETHRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "SRM") {
            RewardObj.SRMRewardAPY.name = "solend";
            RewardObj.SRMRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "USDT") {
            RewardObj.USDTRewardAPY.name = "solend";
            RewardObj.USDTRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "stSOL") {
            RewardObj.stSOLRewardAPY.name = "solend";
            RewardObj.stSOLRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "scnSOL") {
            RewardObj.scnSOLRewardAPY.name = "solend";
            RewardObj.scnSOLRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "lpSOL") {
            RewardObj.lpSOLRewardAPY.name = "solend";
            RewardObj.lpSOLRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "lpUSD") {
            RewardObj.lpUSDRewardAPY.name = "solend";
            RewardObj.lpUSDRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "lpBTC") {
            RewardObj.lpBTCRewardAPY.name = "solend";
            RewardObj.lpBTCRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "lpETH") {
            RewardObj.lpETHRewardAPY.name = "solend";
            RewardObj.lpETHRewardAPY.value = RewardAPY;
          }
        } else if (ApricotList[j].DepositAPR > SolendList[i].SupplyAPY) {
          const RewardAPY = ApricotList[j].DepositAPR / 10;

          if (ApricotList[j].AssetsName === "SOL") {
            RewardObj.SOLRewardAPY.name = "apricot";
            RewardObj.SOLRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "BTC") {
            RewardObj.BTCRewardAPY.name = "apricot";
            RewardObj.BTCRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "USDC") {
            RewardObj.USDCRewardAPY.name = "apricot";
            RewardObj.USDCRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "mSOL") {
            RewardObj.mSOLRewardAPY.name = "apricot";
            RewardObj.mSOLRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "ETH") {
            RewardObj.ETHRewardAPY.name = "apricot";
            RewardObj.ETHRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "SRM") {
            RewardObj.SRMRewardAPY.name = "apricot";
            RewardObj.SRMRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "USDT") {
            RewardObj.USDTRewardAPY.name = "apricot";
            RewardObj.USDTRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "stSOL") {
            RewardObj.stSOLRewardAPY.name = "apricot";
            RewardObj.stSOLRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "scnSOL") {
            RewardObj.scnSOLRewardAPY.name = "apricot";
            RewardObj.scnSOLRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "lpSOL") {
            RewardObj.lpSOLRewardAPY.name = "apricot";
            RewardObj.lpSOLRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "lpUSD") {
            RewardObj.lpUSDRewardAPY.name = "apricot";
            RewardObj.lpUSDRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "lpBTC") {
            RewardObj.lpBTCRewardAPY.name = "apricot";
            RewardObj.lpBTCRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "lpETH") {
            RewardObj.lpETHRewardAPY.name = "apricot";
            RewardObj.lpETHRewardAPY.value = RewardAPY;
          }
        }
      }
    }
  }

  var AccountTable = [
    {
      id: 1,
      title: "Collateral",
      TotalCollateral: UserTotalDepositedCal,
      userInfo: [
        {
          id: 1,
          Bal: DepositedSolAmount + LendingSolAmount,
          name: "SOL",
          img: "SOL.png",
          TokenPrice: DepositedUserSOLAmountCal,
          RewardAPY: RewardObj.SOLRewardAPY.value,
          RewardAPYName: RewardObj.SOLRewardAPY.name,
        },
        {
          id: 2,
          Bal: DepositedBtcAmount + LendingBtcAmount,
          name: "BTC",
          img: "BTC.png",
          TokenPrice: DepositedUserBTCAmountCal,
          RewardAPY: RewardObj.BTCRewardAPY.value,
          RewardAPYName: RewardObj.BTCRewardAPY.name,
        },
        {
          id: 3,
          Bal: DepositedUsdcAmount + LendingUsdcAmount,
          name: "USDC",
          img: "USDC.png",
          TokenPrice: DepositedUserUSDCAmountCal,
          RewardAPY: RewardObj.USDCRewardAPY.value,
          RewardAPYName: RewardObj.USDCRewardAPY.name,
        },
        {
          id: 4,
          Bal: DepositedMSOLAmount + LendingMSOLAmount,
          name: "mSOL",
          img: "mSOL.png",
          TokenPrice: DepositedUserMSOLAmountCal,
          RewardAPY: RewardObj.mSOLRewardAPY.value,
          RewardAPYName: RewardObj.mSOLRewardAPY.name,
        },
        {
          id: 5,
          Bal: DepositedETHAmount + LendingETHAmount,
          name: "ETH",
          img: "ETH.png",
          TokenPrice: DepositedUserETHAmountCal,
          RewardAPY: RewardObj.ETHRewardAPY.value,
          RewardAPYName: RewardObj.ETHRewardAPY.name,
        },
        {
          id: 6,
          Bal: DepositedSRMAmount + LendingSRMAmount,
          name: "SRM",
          img: "SRM.png",
          TokenPrice: DepositedUserSRMAmountCal,
          RewardAPY: RewardObj.SRMRewardAPY.value,
          RewardAPYName: RewardObj.SRMRewardAPY.name,
        },
        {
          id: 7,
          Bal: DepositedUSDTAmount + LendingUSDTAmount,
          name: "USDT",
          img: "USDT.png",
          TokenPrice: DepositedUserUSDTAmountCal,
          RewardAPY: RewardObj.USDTRewardAPY.value,
          RewardAPYName: RewardObj.USDTRewardAPY.name,
        },
        {
          id: 9,
          Bal: DepositedstSOLAmount + LendingstSOLAmount,
          name: "stSOL",
          img: "stSOL.png",
          TokenPrice: DepositedUserstSOLAmountCal,
          RewardAPY: RewardObj.stSOLRewardAPY.value,
          RewardAPYName: RewardObj.stSOLRewardAPY.name,
        },
        {
          id: 10,
          Bal: DepositedscnSOLAmount + LendingscnSOLAmount,
          name: "scnSOL",
          img: "scnSOL.png",
          TokenPrice: DepositedUserscnSOLAmountCal,
          RewardAPY: RewardObj.scnSOLRewardAPY.value,
          RewardAPYName: RewardObj.scnSOLRewardAPY.name,
        },
        {
          id: 11,
          Bal: DepositedLpSolAmount,
          name: "lpSOL",
          img: "lpSOL.png",
          TokenPrice: DepositedUserLpSOLAmountCal,
          RewardAPY: RewardObj.lpSOLRewardAPY.value,
          RewardAPYName: RewardObj.lpSOLRewardAPY.name,
        },
        {
          id: 12,
          Bal: DepositedLpUsdAmount,
          name: "lpUSD",
          img: "lpUSD.png",
          TokenPrice: DepositedUserLpUSDAmountCal,
          RewardAPY: RewardObj.lpUSDRewardAPY.value,
          RewardAPYName: RewardObj.lpUSDRewardAPY.name,
        },
        {
          id: 13,
          Bal: DepositedLpBTCAmount,
          name: "lpBTC",
          img: "lpBTC.png",
          TokenPrice: DepositedUserLpBTCAmountCal,
          RewardAPY: RewardObj.lpBTCRewardAPY.value,
          RewardAPYName: RewardObj.lpBTCRewardAPY.name,
        },
        {
          id: 14,
          Bal: DepositedLpETHAmount,
          name: "lpETH",
          img: "lpETH.png",
          TokenPrice: DepositedUserLpETHAmountCal,
          RewardAPY: RewardObj.lpETHRewardAPY.value,
          RewardAPYName: RewardObj.lpETHRewardAPY.name,
        },
      ],
    },
    {
      id: 2,
      title: "Borrowed",
      TotalBorrowed: UserTotalBorrowedCal,
      userInfo: [
        {
          id: 1,
          Bal: BorrowedLpSOLAmount,
          name: "lpSOL",
          img: "lpSOL.png",
          TokenPrice: BorrowedUserLpSOLAmountCal,
        },
        {
          id: 2,
          Bal: BorrowedLpUsdAmount,
          name: "lpUSD",
          img: "lpUSD.png",
          TokenPrice: BorrowedUserLpUSDAmountCal,
        },
        {
          id: 3,
          Bal: BorrowedLpBTCAmount,
          name: "lpBTC",
          img: "lpBTC.png",
          TokenPrice: BorrowedUserLpBTCAmountCal,
        },
        {
          id: 4,
          Bal: BorrowedLpETHAmount,
          name: "lpETH",
          img: "lpETH.png",
          TokenPrice: BorrowedUserLpETHAmountCal,
        },
      ],
    },
    {
      id: 3,
      title: "Borrow Limit",
      value: BorrowLimit,
    },
    {
      id: 4,
      title: "Liquidation Threshold",
      value: Liquidation,
    },
    {
      id: 5,
      title: "LTV",
      value: LTV >= 0 ? LTV : 0,
    },
  ];

  return AccountTable;
};
