import * as anchor from "@project-serum/anchor";
import api from "../../api";
import axios from "axios";
import cbs_idl from "../../idls/cbs_protocol.json";
import swap_idl from "../../idls/lpfinance_swap.json";
import getProvider from "../../helpers/getProvider";
import idl from "../../idls/lpusd_auction.json";
import * as CBS_Constants from "../../helpers/constants/cbs_constants";
import * as SWAP_Constants from "../../helpers/constants/swap_constants";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import MomentTimezone from "moment-timezone";
import {
  lpusdMint,
  lpsolMint,
  lpethMint,
  lpbtcMint,
  pythBtcAccount,
  pythMsolAccount,
  pythUsdcAccount,
  pythSolAccount,
  pythEthAccount,
  pythUstAccount,
  pythSrmAccount,
  pythScnsolAccount,
  pythStsolAccount,
  pythUsdtAccount,
} from "../../helpers/constants/common";
import {
  poolUsdc,
  poolMsol,
  poolBtc,
  poolEth,
  poolUst,
  poolSrm,
  poolScnsol,
  poolStsol,
  poolUsdt,
  poolLpsol,
  poolLpusd,
  poolLpbtc,
  poolLpeth,
  auction_name,
  stateAccount,
  config,
} from "../../helpers/constants/auction_constants";
import { getSolanaWallet } from "../../utils/global";

const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

const getLiquidatorData = async (liquidator, cbsprogram) => {
  return await cbsprogram.account.userAccount.fetch(liquidator);
};

export const liquidateAccount = async (
  wallet,
  userKey,
  Debt,
  Collateral,
  LTV,
  LiquidatorFunds,
  LastEpochProfit
) => {
  try {
    console.log("start Liquidate");
    const auctionLpusd = poolLpusd;
    const auctionLpsol = poolLpsol;
    const auctionLpbtc = poolLpbtc;
    const auctionLpeth = poolLpeth;

    const auctionBtc = poolBtc;
    const auctionUsdc = poolUsdc;
    const auctionMsol = poolMsol;
    const auctionEth = poolEth;
    const auctionUst = poolUst;
    const auctionSrm = poolSrm;
    const auctionScnsol = poolScnsol;
    const auctionStsol = poolStsol;
    const auctionUsdt = poolUsdt;

    const cbsLpusd = CBS_Constants.poolLpusd;
    const cbsLpsol = CBS_Constants.poolLpsol;
    const cbsLpbtc = CBS_Constants.poolLpbtc;
    const cbsLpeth = CBS_Constants.poolLpeth;

    const cbsUsdc = CBS_Constants.poolUsdc;
    const cbsBtc = CBS_Constants.poolBtc;
    const cbsMsol = CBS_Constants.poolMsol;
    const cbsEth = CBS_Constants.poolEth;
    const cbsUst = CBS_Constants.poolUst;
    const cbsSrm = CBS_Constants.poolSrm;
    const cbsScnsol = CBS_Constants.poolScnsol;
    const cbsStsol = CBS_Constants.poolStsol;
    const cbsUsdt = CBS_Constants.poolUsdt;

    const swapAccount = SWAP_Constants.stateAccount;
    const swapLpusd = SWAP_Constants.poolLpusd;
    const swapLpsol = SWAP_Constants.poolLpsol;
    const swapLpbtc = SWAP_Constants.poolLpbtc;
    const swapLpeth = SWAP_Constants.poolLpeth;

    const swapBtc = SWAP_Constants.poolBtc;
    const swapUsdc = SWAP_Constants.poolUsdc;
    const swapMsol = SWAP_Constants.poolMsol;
    const swapEth = SWAP_Constants.poolEth;
    const swapUst = SWAP_Constants.poolUst;
    const swapSrm = SWAP_Constants.poolSrm;
    const swapScnsol = SWAP_Constants.poolScnsol;
    const swapStsol = SWAP_Constants.poolStsol;
    const swapUsdt = SWAP_Constants.poolUsdt;

    const cbsAccount = CBS_Constants.stateAccount;
    const cbsProgram = new PublicKey(cbs_idl.metadata.address);
    const swapProgram = new PublicKey(swap_idl.metadata.address);
    const auctionAccount = stateAccount;

    const userAuthority = wallet.publicKey;
    const provider = await getProvider(wallet);
    anchor.setProvider(provider);

    const programId = new PublicKey(cbs_idl.metadata.address);

    const program = new anchor.Program(cbs_idl, programId);

    const auctionProgramId = new PublicKey(idl.metadata.address);
    const auctionProgram = new anchor.Program(idl, auctionProgramId);

    const liquidatorKey = new PublicKey(userKey);

    const [liquidatorAccount, liquidatorAccountBump] =
      await PublicKey.findProgramAddress(
        [
          Buffer.from(CBS_Constants.cbs_name),
          Buffer.from(liquidatorKey.toBuffer()),
        ],
        program.programId
      );

    const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
      [Buffer.from(auction_name), Buffer.from(liquidatorKey.toBuffer())],
      auctionProgram.programId
    );

    const liquidator = liquidatorAccount;

    const liquidatorData = await getLiquidatorData(liquidator, program);

    if (liquidatorData.bump === 0 || liquidatorData.bump > 10) {
      console.log("1");
      await auctionProgram.rpc.liquidateFromCbs({
        accounts: {
          userAuthority,
          stateAccount,
          config,
          liquidator,
          cbsAccount,
          cbsProgram,
          auctionBtc,
          auctionMsol,
          auctionUsdc,
          auctionEth,
          cbsBtc,
          cbsMsol,
          cbsUsdc,
          cbsEth,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
    }

    if (liquidatorData.bump <= 1 || liquidatorData.bump > 10) {
      console.log("2");
      await auctionProgram.rpc.liquidateSecondFromCbs({
        accounts: {
          userAuthority,
          config,
          liquidator,
          cbsAccount,
          cbsProgram,
          auctionUst,
          auctionSrm,
          auctionScnsol,
          auctionStsol,
          auctionUsdt,
          cbsUst,
          cbsSrm,
          cbsScnsol,
          cbsStsol,
          cbsUsdt,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
    }

    if (liquidatorData.bump <= 2 || liquidatorData.bump > 10) {
      console.log("3");
      await auctionProgram.rpc.liquidateLptokenFromCbs({
        accounts: {
          userAuthority,
          stateAccount,
          config,
          liquidator,
          cbsAccount,
          cbsProgram,
          auctionLpusd,
          auctionLpsol,
          auctionLpbtc,
          auctionLpeth,
          cbsLpusd,
          cbsLpsol,
          cbsLpbtc,
          cbsLpeth,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
    }

    if (liquidatorData.bump <= 3 || liquidatorData.bump > 10) {
      console.log("4");
      await auctionProgram.rpc.liquidate({
        accounts: {
          userAuthority,
          stateAccount,
          config,
          liquidator,
          cbsProgram,
          swapAccount,
          swapProgram,
          swapLpsol,
          swapLpbtc,
          swapLpeth,
          lpbtcMint,
          lpethMint,
          lpsolMint,
          lpusdMint,
          auctionLpusd,
          cbsLpusd,
          cbsLpsol,
          cbsLpbtc,
          cbsLpeth,
          pythBtcAccount,
          pythUsdcAccount,
          pythSolAccount,
          pythMsolAccount,
          pythEthAccount,
          pythUstAccount,
          pythSrmAccount,
          pythScnsolAccount,
          pythStsolAccount,
          pythUsdtAccount,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
    }

    if (liquidatorData.bump <= 4 || liquidatorData.bump > 10) {
      console.log("5");
      await auctionProgram.rpc.liquidateSwap({
        accounts: {
          userAuthority,
          stateAccount,
          config,
          liquidator,
          swapAccount,
          cbsProgram,
          swapProgram,
          lpusdMint,
          swapBtc,
          swapUsdc,
          swapMsol,
          swapEth,
          swapUst,
          swapScnsol,
          swapStsol,
          swapUsdt,
          swapSrm,
          auctionBtc,
          auctionUsdc,
          auctionMsol,
          auctionEth,
          auctionUst,
          auctionSrm,
          auctionScnsol,
          auctionStsol,
          auctionUsdt,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
    }

    if (liquidatorData.bump <= 5 || liquidatorData.bump > 10) {
      console.log("6");
      await auctionProgram.rpc.liquidateSecondSwap({
        accounts: {
          userAuthority,
          stateAccount,
          config,
          liquidator,
          swapAccount,
          cbsProgram,
          swapProgram,
          lpusdMint,
          swapLpusd,
          swapLpsol,
          swapLpbtc,
          swapLpeth,
          auctionLpusd,
          auctionLpsol,
          auctionLpbtc,
          auctionLpeth,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
    }

    const { token } = getSolanaWallet();

    const newDate = MomentTimezone().tz("America/New_York");
    const Time = newDate.format();

    const response = await axios.post(
      api.deleteLiquidated,
      {
        Address: userKey,
        Debt: Debt,
        Collateral: Collateral,
        LTV: LTV,
        LiquidatorFunds: LiquidatorFunds,
        LastEpochProfit: LastEpochProfit,
        Time: Time,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.status === 200) {
      return {
        message: "Successfully liquidated",
      };
    }
  } catch (err) {
    return {
      message: "liquidate failed",
    };
  }
};
