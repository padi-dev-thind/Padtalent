import Hr from '@models/entities/hrs';
import { Request, Response } from 'express';

export interface ApiResponse {
  status: boolean;
  code: number;
  data: any;
  message: string;
  stack: string;
}

export interface AuthRequest extends Request {
  hr: Hr;
}