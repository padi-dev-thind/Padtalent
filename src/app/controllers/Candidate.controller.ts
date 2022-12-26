import { NextFunction, Response, Request } from 'express';
import CandidateRepository from '@repositories/candidate.repository';

import { BaseController } from './base.controller';
import { Authorized, UseBefore, BadRequestError, CurrentUser, Body, Get, JsonController, Post, Req, Res, Delete, Put } from 'routing-controllers';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { Service } from 'typedi';
import { AuthRequest } from '@interfaces/response.interface';
import { HrDto } from 'dtos/hr.dto';
import { AdminMiddleware } from '@middlewares/admin.middleware';
import * as bcrypt from 'bcrypt'
import { env } from '@env';
import { toNumber } from '@lib/env/utils';



@JsonController('/candidate')
@Service()
class CandidateController extends BaseController {
  constructor(
    protected CandidateRepository: CandidateRepository,
  )
  {
    super();
  }
  

  @Authorized()
  @UseBefore(AdminMiddleware)
  @Get('/list')
  async getHrs(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const candidates = await this.CandidateRepository.getAll()
      return this.setData( 
            candidates
          )
            .setMessage('Success')
            .responseSuccess(res);
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res);
    }
  }

}

export default CandidateController

