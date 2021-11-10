import {GeneralError} from './error_definitions';
import express from 'express';

export default (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof GeneralError) {
    return res.status((err as GeneralError).getCode()).json({
      status: 'error',
      message: err.message
    });
  }

  return res.status(500).json({
    status: 'error',
    message: err.message
  });
}

