import { Router } from 'express';
import faucetController from '../controllers/faucet.controller';
import { validateWalletAddress } from '../middleware/validation.middleware';

const router = Router();

/**
 * @route   GET /api/status
 * @desc    Get faucet status
 * @access  Public
 */
router.get('/status', faucetController.getFaucetStatus);

/**
 * @route   GET /api/check/:address
 * @desc    Check if a user is eligible to request tokens
 * @access  Public
 */
router.get('/check/:address', validateWalletAddress, faucetController.checkUserEligibility);

/**
 * @route   POST /api/request
 * @desc    Request tokens from the faucet
 * @access  Public
 */
router.post('/request', validateWalletAddress, faucetController.requestTokens);

export default router;