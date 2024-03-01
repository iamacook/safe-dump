import { parseAbi } from 'viem';

export const SENTINEL_ADDRESS =
  '0x0000000000000000000000000000000000000001' as const;

export const END_ADDRESS =
  '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF' as const;

export const SAFE_ABI = parseAbi([
  'function execTransaction(address to, uint256 value, bytes data, uint8 operation, uint256 safeTxGas, uint256 baseGas, uint256 gasPrice, address gasToken, address refundReceiver, bytes signatures)',
  'function removeOwner(address prevOwner, address owner, uint256 _threshold)',
  'function swapOwner(address prevOwner, address oldOwner, address newOwner)',
]);
