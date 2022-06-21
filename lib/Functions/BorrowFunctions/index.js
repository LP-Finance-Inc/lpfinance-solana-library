import { getTokenPrice } from "../../utils/global";
import { readStateAccount } from "../../utils/BorrowFun/readStateAccount";

export const CalCBSProtocolOverview = async (wallet) => {
  const { TokenPriceList } = await getTokenPrice();

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
  } = TokenPriceList;

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
