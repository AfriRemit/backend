import { ethers } from 'ethers';
import { faucetContract, tokenContract } from '../config/blockchain.config';
import { FaucetStatus, UserEligibility, TokenRequest } from '../interfaces/faucet.interface';
import { formatTokenAmount } from '../utils/format.utils';
import { ApiError } from '../middleware/error.middleware';

/**
 * Faucet service for blockchain interactions
 */
class FaucetService {
  /**
   * Get the current status of the faucet
   */
  async getFaucetStatus(): Promise<FaucetStatus> {
    try {
      const [
        faucetBalance,
        totalClaimed,
        claimedToday,
        totalDistributed,
        amountAllowed,
        tokenSymbol,
        tokenDecimals
      ] = await Promise.all([
        faucetContract.getFaucetBalance(),
        faucetContract.totalClaimed(),
        faucetContract.claimedToday(),
        faucetContract.totalDistributed(),
        faucetContract.amountAllowed(),
        tokenContract.symbol(),
        tokenContract.decimals()
      ]);

      const decimals = Number(tokenDecimals);

      return {
        isActive: faucetBalance >= amountAllowed,
        tokenSymbol,
        faucetBalance: formatTokenAmount(faucetBalance, decimals),
        amountAllowed: formatTokenAmount(amountAllowed, decimals),
        totalClaimed: Number(totalClaimed),
        claimedToday: Number(claimedToday),
        totalDistributed: formatTokenAmount(totalDistributed, decimals)
      };
    } catch (error: any) {
      console.error('Error getting faucet status:', error);
      throw new ApiError(500, `Failed to get faucet status: ${error.message}`);
    }
  }

  /**
   * Check if a user is eligible to request tokens
   * @param address The user's wallet address
   */
  async checkUserEligibility(address: string): Promise<UserEligibility> {
    try {
      if (!ethers.isAddress(address)) {
        throw new ApiError(400, 'Invalid wallet address');
      }
      
      const [timeUntilNextRequest, amountAllowed, tokenSymbol, tokenDecimals] = await Promise.all([
        faucetContract.timeUntilNextRequest(address),
        faucetContract.amountAllowed(),
        tokenContract.symbol(),
        tokenContract.decimals()
      ]);

      const decimals = Number(tokenDecimals);

      return {
        canClaim: Number(timeUntilNextRequest) === 0,
        waitTimeSeconds: Number(timeUntilNextRequest),
        amountToReceive: formatTokenAmount(amountAllowed, decimals),
        tokenSymbol
      };
    } catch (error: any) {
      console.error('Error checking user eligibility:', error);
      throw new ApiError(500, `Failed to check user eligibility: ${error.message}`);
    }
  }

  /**
   * Request tokens from the faucet
   * @param walletAddress The user's wallet address
   */
  async requestTokens(walletAddress: string): Promise<TokenRequest> {
    try {
      if (!ethers.isAddress(walletAddress)) {
        throw new ApiError(400, 'Invalid wallet address');
      }
      
      // Check if the user is eligible to claim
      const timeUntilNextRequest = await faucetContract.timeUntilNextRequest(walletAddress);
      if (Number(timeUntilNextRequest) > 0) {
        throw new ApiError(400, `You need to wait ${Math.ceil(Number(timeUntilNextRequest) / 60)} minutes before requesting again`);
      }
      
      // Call the contract method
      const tx = await faucetContract.requestTokens();
      const receipt = await tx.wait();
      
      if (!receipt) {
        throw new ApiError(500, 'Transaction failed to complete');
      }

      return {
        walletAddress,
        success: true,
        transactionHash: receipt.hash
      };
    } catch (error: any) {
      console.error('Error requesting tokens:', error);
      
      // Check for specific errors from the contract
      if (error.message.includes('Faucet does not have enough tokens')) {
        throw new ApiError(400, 'The faucet has run out of tokens. Please try again later.');
      }
      
      if (error.message.includes('You need to wait before requesting again')) {
        throw new ApiError(400, 'You need to wait before requesting again');
      }
      
      throw new ApiError(500, error.message || 'Failed to send tokens');
    }
  }
}

export default new FaucetService();