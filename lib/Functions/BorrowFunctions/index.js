import { getTokenPrice } from "../../utils/global";
import { readStateAccount } from "../../utils/BorrowFun/readStateAccount";
import { readUserAccount } from "../../utils/BorrowFun/readUserAccount";
import { Token } from "../../helpers/Tokens";

export const getCBSProtocolOverview = async (wallet) => {
  const { TokenPriceObj } = await getTokenPrice();

  const {
    wSOLTokenPrice,
    LPFiTokenPrice,
    mSOLTokenPrice,
    stSOLTokenPrice,
    scnSOLTokenPrice,
    RAYTokenPrice,
    SRMTokenPrice,
    lpSOLTokenPrice,
    lpUSDTokenPrice,
  } = TokenPriceObj;

  const {
    TotalDepositedwSOL,
    TotalDepositedmSOL,
    TotalDepositedstSOL,
    TotalDepositedscnSOL,
    TotalDepositedRAY,
    TotalDepositedSRM,
    TotalDepositedLPFi,
    TotalDepositedlpSOL,
    TotalDepositedlpUSD,
    TotalBorrowedlpSOL,
    TotalBorrowedlpUSD,
  } = await readStateAccount(wallet);

  //  global variables start
  const DepositedwSOLAmountCal = TotalDepositedwSOL * wSOLTokenPrice;
  const DepositedmSOLAmountCal = TotalDepositedmSOL * mSOLTokenPrice;
  const DepositedscnSOLAmountCal = TotalDepositedscnSOL * scnSOLTokenPrice;
  const DepositedstSOLAmountCal = TotalDepositedstSOL * stSOLTokenPrice;
  const DepositedRAYAmountCal = TotalDepositedRAY * RAYTokenPrice;
  const DepositedSRMAmountCal = TotalDepositedSRM * SRMTokenPrice;
  const DepositedlpSOLAmountCal = TotalDepositedlpSOL * lpSOLTokenPrice;
  const DepositedlpUSDAmountCal = TotalDepositedlpUSD * lpUSDTokenPrice;
  const DepositedLPFiAmountCal = TotalDepositedLPFi * LPFiTokenPrice;

  const BorrowedlpSOLAmountCal = TotalBorrowedlpSOL * lpSOLTokenPrice;
  const BorrowedlpUSDAmountCal = TotalBorrowedlpUSD * lpUSDTokenPrice;

  const TotalDepositedCal =
    DepositedwSOLAmountCal +
    DepositedmSOLAmountCal +
    DepositedscnSOLAmountCal +
    DepositedstSOLAmountCal +
    DepositedRAYAmountCal +
    DepositedSRMAmountCal +
    DepositedlpSOLAmountCal +
    DepositedlpUSDAmountCal +
    DepositedLPFiAmountCal;

  const TotalBorrowedCal = BorrowedlpSOLAmountCal + BorrowedlpUSDAmountCal;

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
    DepositedwSolAmount,
    DepositedmSOLAmount,
    DepositedscnSOLAmount,
    DepositedstSOLAmount,
    DepositedRAYAmount,
    DepositedSRMAmount,
    DepositedlpSolAmount,
    DepositedlpUsdAmount,
    DepositedLPFiAmount,
    LendingwSOLAmount,
    LendingmSOLAmount,
    LendingscnSOLAmount,
    LendingstSOLAmount,
    LendingSRMAmount,
    LendingRAYAmount,

    BorrowedlpSOLAmount,
    BorrowedlpUsdAmount,
  } = await readUserAccount(wallet);

  const {
    wSOLTokenPrice,
    LPFiTokenPrice,
    mSOLTokenPrice,
    stSOLTokenPrice,
    scnSOLTokenPrice,
    RAYTokenPrice,
    SRMTokenPrice,
    lpSOLTokenPrice,
    lpUSDTokenPrice,
  } = TokenPriceObj;

  const DepositedUserwSOLAmountCal =
    (DepositedwSolAmount + LendingwSOLAmount) * wSOLTokenPrice;

  const DepositedUsermSOLAmountCal =
    (DepositedmSOLAmount + LendingmSOLAmount) * mSOLTokenPrice;

  const DepositedUserscnSOLAmountCal =
    (DepositedscnSOLAmount + LendingscnSOLAmount) * scnSOLTokenPrice;

  const DepositedUserstSOLAmountCal =
    (DepositedstSOLAmount + LendingstSOLAmount) * stSOLTokenPrice;

  const DepositedUserRAYAmountCal =
    (DepositedRAYAmount + LendingRAYAmount) * RAYTokenPrice;

  const DepositedUserSRMAmountCal =
    (DepositedSRMAmount + LendingSRMAmount) * SRMTokenPrice;

  const DepositedUserlpSOLAmountCal = DepositedlpSolAmount * lpSOLTokenPrice;
  const DepositedUserlpUSDAmountCal = DepositedlpUsdAmount * lpUSDTokenPrice;

  const DepositedUserLPFiAmountCal = DepositedLPFiAmount * LPFiTokenPrice;

  const BorrowedUserlpSOLAmountCal = BorrowedlpSOLAmount * lpSOLTokenPrice;
  const BorrowedUserlpUSDAmountCal = BorrowedlpUsdAmount * lpUSDTokenPrice;

  const UserTotalDepositedCal =
    DepositedUserwSOLAmountCal +
    DepositedUsermSOLAmountCal +
    DepositedUserscnSOLAmountCal +
    DepositedUserstSOLAmountCal +
    DepositedUserRAYAmountCal +
    DepositedUserSRMAmountCal +
    DepositedUserlpSOLAmountCal +
    DepositedUserlpUSDAmountCal +
    DepositedUserLPFiAmountCal;

  const UserTotalBorrowedCal =
    BorrowedUserlpUSDAmountCal + BorrowedUserlpSOLAmountCal;

  //account
  const BorrowLimit = UserTotalDepositedCal * 0.85;
  const Liquidation = UserTotalDepositedCal * 0.94;
  const LTV = (UserTotalBorrowedCal / UserTotalDepositedCal) * 100;

  const RewardObj = {
    wSOLRewardAPY: {
      name: "",
      value: "",
    },
    mSOLRewardAPY: {
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
    RAYRewardAPY: {
      name: "",
      value: "",
    },
    SRMRewardAPY: {
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
    LPFiRewardAPY: {
      name: "",
      value: "",
    },
  };

  for (var i = 0; i < SolendList?.length; i++) {
    for (var j = 0; j < ApricotList?.length; j++) {
      if (SolendList[i].AssetsName === ApricotList[j].AssetsName) {
        if (SolendList[i].SupplyAPY > ApricotList[j].DepositAPR) {
          const RewardAPY = SolendList[i].SupplyAPY / 10;

          if (SolendList[i].AssetsName === "wSOL") {
            RewardObj.wSOLRewardAPY.name = "solend";
            RewardObj.wSOLRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "mSOL") {
            RewardObj.mSOLRewardAPY.name = "solend";
            RewardObj.mSOLRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "stSOL") {
            RewardObj.stSOLRewardAPY.name = "solend";
            RewardObj.stSOLRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "scnSOL") {
            RewardObj.scnSOLRewardAPY.name = "solend";
            RewardObj.scnSOLRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "RAY") {
            RewardObj.RAYRewardAPY.name = "solend";
            RewardObj.RAYRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "SRM") {
            RewardObj.SRMRewardAPY.name = "solend";
            RewardObj.SRMRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "lpSOL") {
            RewardObj.lpSOLRewardAPY.name = "solend";
            RewardObj.lpSOLRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "lpUSD") {
            RewardObj.lpUSDRewardAPY.name = "solend";
            RewardObj.lpUSDRewardAPY.value = RewardAPY;
          } else if (SolendList[i].AssetsName === "LPFi") {
            RewardObj.LPFiRewardAPY.name = "solend";
            RewardObj.LPFiRewardAPY.value = RewardAPY;
          }
        } else if (ApricotList[j].DepositAPR > SolendList[i].SupplyAPY) {
          const RewardAPY = ApricotList[j].DepositAPR / 10;

          if (ApricotList[j].AssetsName === "wSOL") {
            RewardObj.wSOLRewardAPY.name = "apricot";
            RewardObj.wSOLRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "mSOL") {
            RewardObj.mSOLRewardAPY.name = "apricot";
            RewardObj.mSOLRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "stSOL") {
            RewardObj.stSOLRewardAPY.name = "apricot";
            RewardObj.stSOLRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "scnSOL") {
            RewardObj.scnSOLRewardAPY.name = "apricot";
            RewardObj.scnSOLRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "RAY") {
            RewardObj.RAYRewardAPY.name = "apricot";
            RewardObj.RAYRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "SRM") {
            RewardObj.SRMRewardAPY.name = "apricot";
            RewardObj.SRMRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "lpSOL") {
            RewardObj.lpSOLRewardAPY.name = "apricot";
            RewardObj.lpSOLRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "lpUSD") {
            RewardObj.lpUSDRewardAPY.name = "apricot";
            RewardObj.lpUSDRewardAPY.value = RewardAPY;
          } else if (ApricotList[j].AssetsName === "LPFi") {
            RewardObj.LPFiRewardAPY.name = "apricot";
            RewardObj.LPFiRewardAPY.value = RewardAPY;
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
          Bal: DepositedwSolAmount + LendingwSOLAmount,
          name: "wSOL",
          img: Token.SOL,
          TokenPrice: DepositedUserwSOLAmountCal,
          RewardAPY: RewardObj.wSOLRewardAPY.value,
          RewardAPYName: RewardObj.wSOLRewardAPY.name,
        },
        {
          id: 2,
          Bal: DepositedmSOLAmount + LendingmSOLAmount,
          name: "mSOL",
          img: Token.mSOL,
          TokenPrice: DepositedUsermSOLAmountCal,
          RewardAPY: RewardObj.mSOLRewardAPY.value,
          RewardAPYName: RewardObj.mSOLRewardAPY.name,
        },
        {
          id: 3,
          Bal: DepositedstSOLAmount + LendingstSOLAmount,
          name: "stSOL",
          img: Token.stSOL,
          TokenPrice: DepositedUserstSOLAmountCal,
          RewardAPY: RewardObj.stSOLRewardAPY.value,
          RewardAPYName: RewardObj.stSOLRewardAPY.name,
        },
        {
          id: 4,
          Bal: DepositedscnSOLAmount + LendingscnSOLAmount,
          name: "scnSOL",
          img: Token.scnSOL,
          TokenPrice: DepositedUserscnSOLAmountCal,
          RewardAPY: RewardObj.scnSOLRewardAPY.value,
          RewardAPYName: RewardObj.scnSOLRewardAPY.name,
        },
        {
          id: 5,
          Bal: DepositedRAYAmount + LendingRAYAmount,
          name: "RAY",
          img: Token.SRM,
          TokenPrice: DepositedUserRAYAmountCal,
          RewardAPY: RewardObj.RAYRewardAPY.value,
          RewardAPYName: RewardObj.RAYRewardAPY.name,
        },
        {
          id: 6,
          Bal: DepositedSRMAmount + LendingSRMAmount,
          name: "SRM",
          img: Token.SRM,
          TokenPrice: DepositedUserSRMAmountCal,
          RewardAPY: RewardObj.SRMRewardAPY.value,
          RewardAPYName: RewardObj.SRMRewardAPY.name,
        },
        {
          id: 7,
          Bal: DepositedlpSolAmount,
          name: "lpSOL",
          img: Token.lpSOL,
          TokenPrice: DepositedUserlpSOLAmountCal,
          RewardAPY: RewardObj.lpSOLRewardAPY.value,
          RewardAPYName: RewardObj.lpSOLRewardAPY.name,
        },
        {
          id: 8,
          Bal: DepositedlpUsdAmount,
          name: "lpUSD",
          img: Token.lpUSD,
          TokenPrice: DepositedUserlpUSDAmountCal,
          RewardAPY: RewardObj.lpUSDRewardAPY.value,
          RewardAPYName: RewardObj.lpUSDRewardAPY.name,
        },
        {
          id: 9,
          Bal: DepositedLPFiAmount,
          name: "LPFi",
          img: Token.LPFi,
          TokenPrice: DepositedUserLPFiAmountCal,
          RewardAPY: RewardObj.LPFiRewardAPY.value,
          RewardAPYName: RewardObj.LPFiRewardAPY.name,
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
          Bal: BorrowedlpSOLAmount,
          name: "lpSOL",
          img: Token.lpSOL,
          TokenPrice: BorrowedUserlpSOLAmountCal,
        },
        {
          id: 2,
          Bal: BorrowedlpUsdAmount,
          name: "lpUSD",
          img: Token.lpUSD,
          TokenPrice: BorrowedUserlpUSDAmountCal,
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
