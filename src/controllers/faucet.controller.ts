import { Request, Response, NextFunction } from 'express';
import faucetService from '../services/faucet.service';
import { formatTimeFromSeconds } from '../utils/format.utils';
import { ApiResponse } from '../interfaces/faucet.interface';

/**
 * Controller for faucet-related endpoints
 */
class FaucetController {
  /**
   * Get the current status of the faucet
   */
  async getFaucetStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const status = await faucetService.getFaucetStatus();
      
      const response: ApiResponse<typeof status> = {
        success: true,
        data: status
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Check if a user is eligible to request tokens
   */
  async checkUserEligibility(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { address } = req.params;
      const eligibility = await faucetService.checkUserEligibility(address);
      
      // Add a human-readable wait time
      const response: ApiResponse<typeof eligibility & { waitTimeFormatted: string }> = {
        success: true,
        data: {
          ...eligibility,
          waitTimeFormatted: formatTimeFromSeconds(eligibility.waitTimeSeconds)
        }
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Request tokens from the faucet
   */
  async requestTokens(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { walletAddress } = req.body;
      const result = await faucetService.requestTokens(walletAddress);
      
      const response: ApiResponse<typeof result> = {
        success: true,
        data: result,
        message: 'Tokens sent successfully'
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new FaucetController();