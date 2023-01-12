import { NextFunction, Response, Request } from 'express';
import CandidateRepository from '@repositories/candidate.repository';
import { BaseController } from './base.controller';
import {
    Authorized,
    UseBefore,
    BadRequestError,
    CurrentUser,
    Body,
    Get,
    JsonController,
    Post,
    Req,
    Res,
    Delete,
    Put,
} from 'routing-controllers';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { Service } from 'typedi';
import { AuthRequest } from '@interfaces/response.interface';
import { AdminMiddleware } from '@middlewares/admin.middleware';

@JsonController('/candidate')
@Service()
class CandidateController extends BaseController {
    constructor(protected candidateRepository: CandidateRepository) {
        super();
    }

    @Authorized()
    @UseBefore(AdminMiddleware)
    @Get('/list')
    async getCandidates(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
        try {
            const candidates = await this.candidateRepository.getAll();
            return this.setData(candidates).setMessage('Success').responseSuccess(res);
        } catch (error) {
            return this.setData({})
                .setCode(error?.status || 500)
                .setStack(error.stack)
                .setMessage(error?.message || 'Internal server error')
                .responseErrors(res);
        }
    }
}

export default CandidateController;
