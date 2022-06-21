import * as anchor from "@project-serum/anchor";
import getProvider from "../../helpers/getProvider";
import idl from "../../idls/cbs_protocol.json";
import accounts_idl from "../../idls/lpfinance_accounts.json";
import lptokens_idl from "../../idls/lpfinance_tokens.json";
import solend_idl from "../../idls/solend.json";
import apricot_idl from "../../idls/apricot.json";
import { CeilMethod } from "../../helpers";
import {
  lptokenStateAccount,
  lptokenConfig,
} from "../../helpers/constants/lptokens_constants";
import {
  configAccountKey,
  whiteListKey,
} from "../../helpers/constants/add_wallet_constants";
import {
  stateAccount,
  poolUsdc,
  poolBtc,
  poolMsol,
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
  cbs_name,
  config,
} from "../../helpers/constants/cbs_constants";
import {
  convert_to_wei,
  lpsolMint,
  lpusdMint,
  lpbtcMint,
  lpethMint,
  usdcMint,
  btcMint,
  msolMint,
  ethMint,
  ustMint,
  srmMint,
  scnsolMint,
  stsolMint,
  usdtMint,
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
} from "../../helpers/constants/common";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";
import {
  solendConfig,
  solendAccount,
} from "../../helpers/constants/solend_constants";
import {
  apricotConfig,
  apricotAccount,
} from "../../helpers/constants/apricot_constants";
import * as APRICOT_Constants from "../../helpers/constants/apricot_constants";
import * as SOLEND_Constants from "../../helpers/constants/solend_constants";
const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

export const depositCBS = async (wallet, amount, TokenName) => {
  console.log("Start Deposit...");
  const userAuthority = wallet.publicKey;

  const provider = await getProvider(wallet);
  anchor.setProvider(provider);

  const programId = new PublicKey(idl.metadata.address);

  const program = new anchor.Program(idl, programId);

  const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
    [Buffer.from(cbs_name), Buffer.from(userAuthority.toBuffer())],
    program.programId
  );

  let accountData;
  try {
    accountData = await program.account.userAccount.fetch(userAccount);
  } catch (err) {
    accountData = null;
    return {
      error: "Deposit failed",
    };
  }

  if (accountData == null || accountData === undefined) {
    try {
      await program.rpc.initUserAccount(userAccountBump, {
        accounts: {
          userAccount,
          stateAccount,
          userAuthority,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
      accountData = await program.account.userAccount.fetch(userAccount);
    } catch (err) {
      return {
        error: "Deposit failed",
      };
    }
  }

  if (TokenName === "SOL") {
    if (
      accountData &&
      accountData.owner.toBase58() === userAuthority.toBase58()
    ) {
      const accountsProgram = new PublicKey(accounts_idl.metadata.address);
      try {
        const deposit_wei = convert_to_wei(amount);
        const deposit_amount = new anchor.BN(deposit_wei);

        await program.rpc.depositSol(deposit_amount, {
          accounts: {
            userAuthority,
            stateAccount,
            userAccount,
            whitelist: whiteListKey,
            config: config,
            whitelistConfig: configAccountKey,
            accountsProgram,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
        });

        return {
          success: `Successfully deposited ${CeilMethod(amount)} ${TokenName}.`,
        };
      } catch (err) {
        return {
          error: "Deposit failed",
        };
      }
    } else {
      return {
        error: "Owner account does not match",
      };
    }
  } else if (TokenName !== "SOL") {
    let collateralMint = null;
    let collateralPool = null;
    let solendPool = SOLEND_Constants.poolUsdc;
    let apricotPool = APRICOT_Constants.poolUsdc;

    if (TokenName === "lpUSD") {
      collateralMint = lpusdMint;
      collateralPool = poolLpusd;
    } else if (TokenName === "lpSOL") {
      collateralMint = lpsolMint;
      collateralPool = poolLpsol;
    } else if (TokenName === "lpBTC") {
      collateralMint = lpbtcMint;
      collateralPool = poolLpbtc;
    } else if (TokenName === "lpETH") {
      collateralMint = lpethMint;
      collateralPool = poolLpeth;
    } else if (TokenName === "USDC") {
      collateralMint = usdcMint;
      collateralPool = poolUsdc;
      solendPool = SOLEND_Constants.poolUsdc;
      apricotPool = APRICOT_Constants.poolUsdc;
    } else if (TokenName === "BTC") {
      collateralPool = poolBtc;
      collateralMint = btcMint;
      solendPool = SOLEND_Constants.poolBtc;
      apricotPool = APRICOT_Constants.poolBtc;
    } else if (TokenName === "mSOL") {
      collateralPool = poolMsol;
      collateralMint = msolMint;
      solendPool = SOLEND_Constants.poolMsol;
      apricotPool = APRICOT_Constants.poolMsol;
    } else if (TokenName === "ETH") {
      collateralPool = poolEth;
      collateralMint = ethMint;
      solendPool = SOLEND_Constants.poolEth;
      apricotPool = APRICOT_Constants.poolEth;
    } else if (TokenName === "UST") {
      collateralMint = ustMint;
      collateralPool = poolUst;
      solendPool = SOLEND_Constants.poolUst;
      apricotPool = APRICOT_Constants.poolUsdt;
    } else if (TokenName === "SRM") {
      collateralPool = poolSrm;
      collateralMint = srmMint;
      solendPool = SOLEND_Constants.poolSrm;
      apricotPool = APRICOT_Constants.poolSrm;
    } else if (TokenName === "scnSOL") {
      collateralPool = poolScnsol;
      collateralMint = scnsolMint;
      solendPool = SOLEND_Constants.poolScnsol;
      apricotPool = APRICOT_Constants.poolScnsol;
    } else if (TokenName === "stSOL") {
      collateralPool = poolStsol;
      collateralMint = stsolMint;
      solendPool = SOLEND_Constants.poolStsol;
      apricotPool = APRICOT_Constants.poolStsol;
    } else if (TokenName === "USDT") {
      collateralPool = poolUsdt;
      collateralMint = usdtMint;
      solendPool = SOLEND_Constants.poolUsdt;
      apricotPool = APRICOT_Constants.poolUsdt;
    } else {
      return {
        error: "Please select valid token",
      };
    }

    const userCollateral = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      collateralMint,
      userAuthority
    );

    if (
      accountData &&
      accountData.owner.toBase58() === userAuthority.toBase58()
    ) {
      try {
        const deposit_wei = convert_to_wei(amount);
        const deposit_amount = new anchor.BN(deposit_wei);

        const accountsProgram = new PublicKey(accounts_idl.metadata.address);
        const solendProgram = new PublicKey(solend_idl.metadata.address);
        const apricotProgram = new PublicKey(apricot_idl.metadata.address);

        await program.rpc.depositCollateral(deposit_amount, {
          accounts: {
            userAuthority,
            userCollateral,
            collateralMint,
            stateAccount,
            config: config,
            collateralPool,
            userAccount,
            solendConfig,
            solendAccount,
            solendPool,
            apricotConfig,
            apricotAccount,
            apricotPool,
            solendProgram,
            apricotProgram,
            whitelist: whiteListKey,
            accountsConfig: configAccountKey,
            accountsProgram,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
        });

        return {
          success: `Successfully deposited ${CeilMethod(amount)} ${TokenName}.`,
        };
      } catch (err) {
        return {
          error: "Deposit failed",
        };
      }
    } else {
      return {
        error: "Owner account does not match",
      };
    }
  }
};

export const borrowCBS = async (wallet, amount, TokenName) => {
  console.log("Start Borrow...");
  const userAuthority = wallet.publicKey;

  const provider = await getProvider(wallet);
  anchor.setProvider(provider);

  const programId = new PublicKey(idl.metadata.address);

  const program = new anchor.Program(idl, programId);

  const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
    [Buffer.from(cbs_name), Buffer.from(userAuthority.toBuffer())],
    program.programId
  );

  let collateralMint = null;
  if (TokenName === "lpUSD") {
    collateralMint = lpusdMint;
  } else if (TokenName === "lpBTC") {
    collateralMint = lpbtcMint;
  } else if (TokenName === "lpETH") {
    collateralMint = lpethMint;
  } else if (TokenName === "lpSOL") {
    collateralMint = lpsolMint;
  } else {
    return {
      error: "Please select valid token",
    };
  }

  const userLptoken = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    collateralMint,
    userAuthority
  );

  let accountData;
  try {
    accountData = await program.account.userAccount.fetch(userAccount);
  } catch (err) {
    accountData = null;
    return {
      error: "Borrow failed",
    };
  }

  if (
    accountData &&
    accountData.owner.toBase58() === userAuthority.toBase58()
  ) {
    try {
      const borrow_wei = convert_to_wei(amount);
      const borrow_amount = new anchor.BN(borrow_wei);
      const lptokensProgram = new PublicKey(lptokens_idl.metadata.address);

      const configData = await program.account.config.fetch(config);

      await program.rpc.borrowLptoken(borrow_amount, {
        accounts: {
          userAuthority,
          userAccount,
          stateAccount,
          tokensState: lptokenStateAccount,
          config: config,
          lptokenConfig: lptokenConfig,
          userCollateral: userLptoken,
          collateralMint,
          pythBtcAccount,
          pythUsdcAccount,
          pythEthAccount,
          pythSolAccount,
          pythMsolAccount,
          pythUstAccount,
          pythSrmAccount,
          pythScnsolAccount,
          pythStsolAccount,
          pythUsdtAccount,
          lptokensProgram,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });

      return {
        success: `Successfully borrowed ${CeilMethod(amount)} ${TokenName}.`,
      };
    } catch (err) {
      return {
        error: "Borrow failed",
      };
    }
  } else {
    return {
      error: "Owner account does not match",
    };
  }
};

export const withdrawCBS = async (wallet, amount, TokenName) => {
  console.log("Start Withdraw...");
  const userAuthority = wallet.publicKey;

  const provider = await getProvider(wallet);
  anchor.setProvider(provider);

  const programId = new PublicKey(idl.metadata.address);

  const program = new anchor.Program(idl, programId);

  const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
    [Buffer.from(cbs_name), Buffer.from(userAuthority.toBuffer())],
    program.programId
  );

  if (TokenName === "SOL") {
    try {
      const withdraw_wei = convert_to_wei(amount);
      const withdraw_amount = new anchor.BN(withdraw_wei);

      await program.rpc.withdrawSol(withdraw_amount, {
        accounts: {
          userAuthority,
          userAccount,
          stateAccount,
          config: config,
          pythBtcAccount,
          pythUsdcAccount,
          pythSolAccount,
          pythEthAccount,
          pythMsolAccount,

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

      return {
        success: `Successfully Withdraw ${CeilMethod(amount)} ${TokenName}.`,
      };
    } catch (err) {
      return {
        error: "Withdraw failed",
      };
    }
  } else if (TokenName !== "SOL") {
    let destMint = null;
    let destPool = null;
    let solendPool = SOLEND_Constants.poolUsdc;
    let apricotPool = APRICOT_Constants.poolUsdc;

    if (TokenName === "lpUSD") {
      destMint = lpusdMint;
      destPool = poolLpusd;
    } else if (TokenName === "lpSOL") {
      destMint = lpsolMint;
      destPool = poolLpsol;
    } else if (TokenName === "lpBTC") {
      destMint = lpbtcMint;
      destPool = poolLpbtc;
    } else if (TokenName === "lpETH") {
      destMint = ethMint;
      destPool = poolEth;
    } else if (TokenName === "USDC") {
      destMint = usdcMint;
      destPool = poolUsdc;
      solendPool = SOLEND_Constants.poolUsdc;
      apricotPool = APRICOT_Constants.poolUsdc;
    } else if (TokenName === "BTC") {
      destMint = btcMint;
      destPool = poolBtc;
      solendPool = SOLEND_Constants.poolBtc;
      apricotPool = APRICOT_Constants.poolBtc;
    } else if (TokenName === "mSOL") {
      destMint = msolMint;
      destPool = poolMsol;
      solendPool = SOLEND_Constants.poolMsol;
      apricotPool = APRICOT_Constants.poolMsol;
    } else if (TokenName === "ETH") {
      destMint = ethMint;
      destPool = poolEth;
      solendPool = SOLEND_Constants.poolEth;
      apricotPool = APRICOT_Constants.poolEth;
    } else if (TokenName === "UST") {
      destMint = ustMint;
      destPool = poolUst;
      solendPool = SOLEND_Constants.poolUst;
      apricotPool = APRICOT_Constants.poolUsdt;
    } else if (TokenName === "SRM") {
      destMint = srmMint;
      destPool = poolSrm;
      solendPool = SOLEND_Constants.poolSrm;
      apricotPool = APRICOT_Constants.poolSrm;
    } else if (TokenName === "scnSOL") {
      destMint = scnsolMint;
      destPool = poolScnsol;
      solendPool = SOLEND_Constants.poolScnsol;
      apricotPool = APRICOT_Constants.poolScnsol;
    } else if (TokenName === "stSOL") {
      destMint = stsolMint;
      destPool = poolStsol;
      solendPool = SOLEND_Constants.poolStsol;
      apricotPool = APRICOT_Constants.poolStsol;
    } else if (TokenName === "USDT") {
      destMint = usdtMint;
      destPool = poolUsdt;
      solendPool = SOLEND_Constants.poolUsdt;
      apricotPool = APRICOT_Constants.poolUsdt;
    } else {
      return {
        error: "Please select valid token",
      };
    }

    const userDest = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      destMint,
      userAuthority
    );

    try {
      const withdraw_wei = convert_to_wei(WithdrawAmount);
      const withdraw_amount = new anchor.BN(withdraw_wei);
      const solendProgram = new PublicKey(solend_idl.metadata.address);
      const apricotProgram = new PublicKey(apricot_idl.metadata.address);

      await program.rpc.withdrawToken(withdraw_amount, {
        accounts: {
          userAuthority,
          userAccount,
          stateAccount,
          config: config,
          userDest,
          destPool,
          destMint,
          pythBtcAccount,
          pythUsdcAccount,
          pythSolAccount,
          pythEthAccount,
          pythMsolAccount,

          pythUstAccount,
          pythSrmAccount,
          pythScnsolAccount,
          pythStsolAccount,
          pythUsdtAccount,
          solendConfig,
          solendPool,
          solendAccount,
          solendStateAccount: SOLEND_Constants.stateAccount,
          apricotConfig,
          apricotAccount,
          apricotPool,
          solendProgram,
          apricotProgram,
          apricotStateAccount: APRICOT_Constants.stateAccount,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });

      return {
        success: `Successfully Withdraw ${CeilMethod(amount)} ${TokenName}.`,
      };
    } catch (err) {
      return {
        error: "Withdraw failed",
      };
    }
  }
};

export const repayCBS = async (wallet, amount, TokenName) => {
  console.log("Start Repayment...");
  const userAuthority = wallet.publicKey;

  const provider = await getProvider(wallet);
  anchor.setProvider(provider);

  const programId = new PublicKey(idl.metadata.address);

  const program = new anchor.Program(idl, programId);

  const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
    [Buffer.from(cbs_name), Buffer.from(userAuthority.toBuffer())],
    program.programId
  );

  if (TokenName === "SOL") {
    try {
      const repay_wei = convert_to_wei(amount);
      const repay_amount = new anchor.BN(repay_wei);

      await program.rpc.repaySol(repay_amount, {
        accounts: {
          userAuthority,
          stateAccount,
          config: config,
          userAccount,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });

      return {
        success: `Successfully repayment ${CeilMethod(amount)} ${TokenName}.`,
      };
    } catch (error) {
      return {
        error: "repayment failed",
      };
    }
  } else if (TokenName !== "SOL") {
    try {
      let destMint = null;
      let destPool = null;
      if (TokenName === "lpUSD") {
        destMint = lpusdMint;
        destPool = poolLpusd;
      } else if (TokenName === "lpSOL") {
        destMint = lpsolMint;
        destPool = poolLpsol;
      } else if (TokenName === "lpBTC") {
        destMint = lpbtcMint;
        destPool = poolLpbtc;
      } else if (TokenName === "lpETH") {
        destMint = lpethMint;
        destPool = poolLpeth;
      } else if (TokenName === "USDC") {
        destMint = usdcMint;
        destPool = poolUsdc;
      } else if (TokenName === "ETH") {
        destMint = ethMint;
        destPool = poolEth;
      } else if (TokenName === "BTC") {
        destMint = btcMint;
        destPool = poolBtc;
      } else {
        return {
          error: "Please select valid token",
        };
      }

      const userDest = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        destMint,
        userAuthority
      );

      const repay_wei = convert_to_wei(RepayAmount);
      const repay_amount = new anchor.BN(repay_wei);

      await program.rpc.repayToken(repay_amount, {
        accounts: {
          userAuthority,
          stateAccount,
          config: config,
          destMint,
          userDest,
          destPool,
          userAccount,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });

      return {
        success: `Successfully repayment ${CeilMethod(amount)} ${TokenName}.`,
      };
    } catch (error) {
      return {
        error: "repayment failed",
      };
    }
  }
};
