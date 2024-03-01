import { faker } from '@faker-js/faker';
import { encodeFunctionData, getAddress } from 'viem';
import { describe, expect, it } from 'vitest';

import { SAFE_ABI, SENTINEL_ADDRESS } from '@/constants';
import { _getDumpTransactions } from '@/utils/dump';

describe('dump', () => {
  describe('getDumpTransactions', () => {
    it('should return a swapOwner transaction if the Safe only has one owner', () => {
      const safeAddress = faker.finance.ethereumAddress();
      const owners = [faker.finance.ethereumAddress()];
      const dumpee = faker.finance.ethereumAddress();
      const swapOwner = encodeFunctionData({
        abi: SAFE_ABI,
        functionName: 'swapOwner',
        args: [SENTINEL_ADDRESS, getAddress(owners[0]), getAddress(dumpee)],
      });

      const dumpTransactions = _getDumpTransactions({
        safeAddress,
        owners,
        dumpee,
      });

      expect(dumpTransactions).toEqual([
        {
          to: safeAddress,
          value: '0',
          data: swapOwner,
        },
      ]);
    });

    it('should return removeOwner, then swapOwner transactions if the Safe has multiple owners', () => {
      const safeAddress = faker.finance.ethereumAddress();
      const owners = [
        faker.finance.ethereumAddress(),
        faker.finance.ethereumAddress(),
      ];
      const dumpee = faker.finance.ethereumAddress();
      const removeOwner = encodeFunctionData({
        abi: SAFE_ABI,
        functionName: 'removeOwner',
        args: [getAddress(owners[0]), getAddress(owners[1]), BigInt(1)],
      });
      const swapOwner = encodeFunctionData({
        abi: SAFE_ABI,
        functionName: 'swapOwner',
        args: [SENTINEL_ADDRESS, getAddress(owners[0]), getAddress(dumpee)],
      });

      const dumpTransactions = _getDumpTransactions({
        safeAddress,
        owners,
        dumpee,
      });

      expect(dumpTransactions).toEqual([
        {
          to: safeAddress,
          value: '0',
          data: removeOwner,
        },
        {
          to: safeAddress,
          value: '0',
          data: swapOwner,
        },
      ]);
    });
  });
});
