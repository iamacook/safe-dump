import { encodeFunctionData, getAddress } from 'viem';
import SafeAppsSDK from '@safe-global/safe-apps-sdk';
import type {
  BaseTransaction,
  SendTransactionsResponse,
} from '@safe-global/safe-apps-sdk';

import { SAFE_ABI, SENTINEL_ADDRESS } from '@/constants';

export function _getDumpTransactions(args: {
  safeAddress: string;
  owners: string[];
  dumpee: string;
}): Array<BaseTransaction> {
  return (
    args.owners
      // Reverse to simplify prevOwner retrieval
      .reverse()
      .map((owner, i, arr) => {
        const isLastOwner = i === arr.length - 1;

        const data = isLastOwner
          ? encodeFunctionData({
              abi: SAFE_ABI,
              functionName: 'swapOwner',
              args: [
                SENTINEL_ADDRESS,
                getAddress(owner),
                getAddress(args.dumpee),
              ],
            })
          : encodeFunctionData({
              abi: SAFE_ABI,
              functionName: 'removeOwner',
              args: [getAddress(arr[i + 1]), getAddress(owner), BigInt(1)],
            });

        return {
          to: args.safeAddress,
          value: '0',
          data,
        };
      })
  );
}

const appsSdk = new SafeAppsSDK();

export async function dumpSafe(
  dumpee: string
): Promise<SendTransactionsResponse> {
  const safeInfo = await appsSdk.safe.getInfo();

  const dumpTransactions = _getDumpTransactions({
    safeAddress: safeInfo.safeAddress,
    owners: safeInfo.owners,
    dumpee,
  });

  return await appsSdk.txs.send({
    txs: dumpTransactions,
  });
}
