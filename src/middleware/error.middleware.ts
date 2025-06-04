import { Request, Response, NextFunction } from 'express';

/**
 * Error response interface
 */
export interface ErrorResponse {
  success: boolean;
  error: string;
  stack?: string;
}

/**
 * Custom error class with status code
 */
export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Not found middleware
 */
export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new ApiError(404, `Not Found - ${req.originalUrl}`);
  next(error);
};

/**
 * Error handler middleware
 */
export const errorHandler = (
  err: ApiError, 
  req: Request, 
  res: Response, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  
  const errorResponse: ErrorResponse = {
    success: false,
    error: err.message || 'Internal Server Error'
  };
  
  // Include stack trace in development mode
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }
  
  console.error(`[ERROR] ${err.message}`, err.stack);
  
  res.status(statusCode).json(errorResponse);
};