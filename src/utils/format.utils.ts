/**
 * Format a bigint amount to a number with the proper decimal places
 * @param amount The amount to format
 * @param decimals The number of decimals
 * @returns The formatted amount
 */
export const formatTokenAmount = (amount: bigint, decimals: number): number => {
    return Number(amount) / Math.pow(10, decimals);
  };
  
  /**
   * Format seconds to a human-readable time string
   * @param seconds The number of seconds
   * @returns A formatted time string (e.g., "2 hours 30 minutes")
   */
  export const formatTimeFromSeconds = (seconds: number): string => {
    if (seconds <= 0) return 'now';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    let timeString = '';
    
    if (hours > 0) {
      timeString += `${hours} hour${hours !== 1 ? 's' : ''} `;
    }
    
    if (minutes > 0) {
      timeString += `${minutes} minute${minutes !== 1 ? 's' : ''} `;
    }
    
    if (remainingSeconds > 0 && hours === 0) {
      timeString += `${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
    }
    
    return timeString.trim();
  };