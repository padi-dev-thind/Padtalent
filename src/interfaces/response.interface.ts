import Assessment from '@models/entities/assessments';
import Candidate from '@models/entities/candidates';
import Hr from '@models/entities/hrs';
import Test from '@models/entities/tests';
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
  candidate: Candidate
  assessment: Assessment
}
