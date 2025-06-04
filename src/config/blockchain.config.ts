import { ethers } from 'ethers';
import environment from './environment';

// Create provider and wallet
const provider = new ethers.JsonRpcProvider(environment.RPC_URL);
const wallet = new ethers.Wallet(environment.PRIVATE_KEY as string, provider);

// AfriRemit Faucet ABI (only the functions we need)
const FAUCET_ABI = [
  'function requestTokens() external',
  'function getFaucetBalance() external view returns (uint256)',
  'function timeUntilNextRequest(address user) external view returns (uint256)',
  'function amountAllowed() external view returns (uint256)',
  'function totalClaimed() external view returns (uint256)',
  'function claimedToday() external view returns (uint256)',
  'function totalDistributed() external view returns (uint256)'
];

// Token contract ABI (only the functions we need)
const TOKEN_ABI = [
  'function balanceOf(address account) external view returns (uint256)',
  'function symbol() external view returns (string)',
  'function decimals() external view returns (uint8)'
];

// Create contract instances
const faucetContract = new ethers.Contract(
  environment.CONTRACT_ADDRESS as string,
  FAUCET_ABI,
  wallet
);

const tokenContract = new ethers.Contract(
  environment.TOKEN_ADDRESS as string,
  TOKEN_ABI,
  provider
);

export {
  provider,
  wallet,
  faucetContract,
  tokenContract,
  FAUCET_ABI,
  TOKEN_ABI
};