import * as anchor from "@project-serum/anchor";
import getProvider from "../../helpers/getProvider";
import { CeilMethod } from "../../helpers";
import idl from "../../idls/lpusd_auction.json";
import { convert_to_wei, lpusdMint } from "../../helpers/constants/common";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  Token,
} from "@solana/spl-token";
import {
  poolLpusd,
  auction_name,
  stateAccount,
  config,
} from "../../helpers/constants/auction_constants";

const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

export const depositAuction = async (wallet, amount) => {
  console.log("Start Deposit...");
  const userAuthority = wallet.publicKey;

  const provider = await getProvider(wallet);
  anchor.setProvider(provider);

  const programId = new PublicKey(idl.metadata.address);

  const program = new anchor.Program(idl, programId);

  const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
    [Buffer.from(auction_name), Buffer.from(userAuthority.toBuffer())],
    program.programId
  );

  let accountData;
  try {
    accountData = await program.account.userStateAccount.fetch(userAccount);
  } catch (err) {
    accountData = null;
    return {
      message: "Deposit failed",
    };
  }

  if (accountData == null || accountData === undefined) {
    try {
      await program.rpc.initUserAccount({
        accounts: {
          userAccount,
          stateAccount,
          userAuthority,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });
      accountData = await program.account.userStateAccount.fetch(userAccount);
    } catch (err) {
      return {
        message: "Deposit failed",
      };
    }
  }

  const userLpusd = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    lpusdMint,
    userAuthority
  );

  if (
    accountData &&
    accountData.owner.toBase58() === userAuthority.toBase58()
  ) {
    try {
      const deposit_wei = convert_to_wei(amount);
      const deposit_amount = new anchor.BN(deposit_wei); // '100000000'

      await program.rpc.depositLpusd(deposit_amount, {
        accounts: {
          userAuthority,
          userLpusd,
          lpusdMint,
          stateAccount,
          config,
          poolLpusd,
          userAccount,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        },
      });

      return {
        message: `Successfully deposited ${CeilMethod(amount)} lpUSD.`,
      };
    } catch (err) {
      return {
        message: "Deposit failed",
      };
    }
  } else {
    return {
      message: "Owner account does not match",
    };
  }
};

export const withdrawAuction = async (wallet, amount) => {
  console.log("Start Withdraw...");
  const userAuthority = wallet.publicKey;
  const provider = await getProvider(wallet);
  anchor.setProvider(provider);
  // address of deployed program
  const programId = new PublicKey(idl.metadata.address);
  // Generate the program client from IDL.
  const program = new anchor.Program(idl, programId);

  const [userAccount, userAccountBump] = await PublicKey.findProgramAddress(
    [Buffer.from(auction_name), Buffer.from(userAuthority.toBuffer())],
    program.programId
  );

  const userLpusd = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    lpusdMint,
    userAuthority
  );

  try {
    const deposit_wei = convert_to_wei(amount);
    const deposit_amount = new anchor.BN(deposit_wei);

    await program.rpc.withdrawLpusd(deposit_amount, {
      accounts: {
        userAuthority,
        userLpusd,
        lpusdMint,
        stateAccount,
        config,
        poolLpusd,
        userAccount,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      },
    });

    return {
      message: `Successfully Withdraw ${CeilMethod(amount)} lpUSD.`,
    };
  } catch (err) {
    return {
      message: "Withdraw failed",
    };
  }
};
