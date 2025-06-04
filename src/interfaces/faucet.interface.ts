export interface FaucetStatus {
    isActive: boolean;
    tokenSymbol: string;
    faucetBalance: number;
    amountAllowed: number;
    totalClaimed: number;
    claimedToday: number;
    totalDistributed: number;
  }
  
  export interface UserEligibility {
    canClaim: boolean;
    waitTimeSeconds: number;
    amountToReceive: number;
    tokenSymbol: string;
  }
  
  export interface TokenRequest {
    walletAddress: string;
    success: boolean;
    transactionHash?: string;
    error?: string;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
  }