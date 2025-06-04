import { Request, Response, NextFunction } from 'express';
import { ethers } from 'ethers';
import { ApiError } from './error.middleware';

/**
 * Validate if the provided wallet address is valid
 */
export const validateWalletAddress = (
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  try {
    const walletAddress = req.body.walletAddress || req.params.address;
    
    if (!walletAddress) {
      throw new ApiError(400, 'Wallet address is required');
    }
    
    if (!ethers.isAddress(walletAddress)) {
      throw new ApiError(400, 'Invalid wallet address format');
    }
    
    next();
  } catch (error) {
    next(error);
  }
};