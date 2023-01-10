import { NextFunction, Response, Request } from 'express';
import { CandidateLoginDto, LoginDto } from '../../dtos/auth.dto';
import HrRepository from '@repositories/hr.repository';
import CandidateRepository from '@repositories/candidate.repository';
import { BaseController } from './base.controller';
import { BadRequestError, JsonController, Post, Req, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { createCandidateAccessToken, createAccessToken } from '@utils/tokenHandler';
import * as bcrypt from 'bcrypt';
import Candidates_assessmentsRepository from '@repositories/candidates_assessments.repository';

@JsonController('/auth')
@Service()
class AuthController extends BaseController {
  constructor(
    protected authRepository: HrRepository,
    protected candidateRepository: CandidateRepository,
    protected candidates_assessmentsRepository: Candidates_assessmentsRepository,
  ) {
    super();
  }

  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const loginDto: LoginDto = req.body;
      const { email, password } = loginDto;
      const hr = await this.authRepository.findByCondition({
        where: { email: email },
      });

      let isMatch = false;
      if (hr) {
        isMatch = await bcrypt.compare(password, JSON.parse(hr.password));
      }

      if (isMatch) {
        const accessToken = createAccessToken(hr, false);

        return this.setData({
          accessToken,
        })
          .setCode(200)
          .setMessage('Success')
          .responseSuccess(res);
      } else {
        throw new BadRequestError('Wrong credentials');
      }
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }

  @Post('/:id/login-candidate') //id is the id of recent assessemnt
  async loginCandidate(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const loginDto: CandidateLoginDto = req.body;
      const email = loginDto.email;
      const candidate = await this.candidateRepository.findByCondition({
        where: { email: email },
      });
      let isSuccess = 1;
      if (candidate) {
        const candidate_ass = await this.candidates_assessmentsRepository.findByCondition({
          where: {
            candidate_id: candidate.id,
            assessment_id: req.params.id,
          },
        });
        if (!candidate_ass) {
          isSuccess = 0;
          throw new BadRequestError('Wrong candidate credentials');
        }
        const accessToken = createCandidateAccessToken(candidate, req.params.id);
        if (isSuccess)
          return this.setData({
            accessToken,
          })
            .setCode(200)
            .setMessage('Success')
            .responseSuccess(res);
      } else {
        throw new BadRequestError('Wrong candidate credentials');
      }
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setStack(error.stack)
        .setMessage(error?.message)
        .responseErrors(res);
    }
  }
}

export default AuthController;
