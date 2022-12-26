import { NextFunction, Response, Request } from 'express';
import { CandidateLoginDto, LoginDto } from '../../dtos/auth.dto';
import HrRepository from '@repositories/hr.repository';
import CandidateRepository from '@repositories/candidate.repository';
import { BaseController } from './base.controller';
import { BadRequestError, Body, Get, JsonController, Post, Req, Res } from 'routing-controllers';
import { Service } from 'typedi';
import {createCandidateAccessToken, createAccessToken, createRefreshToken, verifyToken } from '@utils/tokenHandler';
import * as bcrypt from 'bcrypt'



@JsonController('/auth')
@Service()
class AuthController extends BaseController {
  constructor(protected authRepository: HrRepository,
              protected candidateRepository: CandidateRepository
    ) {
    super();
  }

  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const loginDto: LoginDto = req.body;
      const {name, password} = loginDto;
      const data = await this.authRepository.findByName(name);
      const hr = data;

      bcrypt.compare(password,hr.password)
      if (await bcrypt.compare(password,hr.password)) {
        const accessToken = createAccessToken(hr, false);
        const refreshToken = createRefreshToken(hr, false);

        return this.setData({
          accessToken,
          refreshToken,
        })
          .setCode(200)
          .setMessage('Success')
          .responseSuccess(res);
      } else {
        throw new BadRequestError('Wrong credentials');
      }
    } catch (error) {
      return this.setCode(error?.status || 500)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }

  
  @Post('/login-candidate')
  async loginCandidate(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const loginDto: CandidateLoginDto = req.body;

      const {name, email} = loginDto
      const candidate = await this.candidateRepository.findOrCreateByCondition({where:{email: email}});

      if (candidate) {
        const accessToken = createCandidateAccessToken(candidate[0], false);
        // Save to redis
        //setCacheExpire(`auth_refresh_address_${name}`, refreshToken, REFRESH_TTL);

        return this.setData({
          accessToken
        })
          .setCode(200)
          .setMessage('Success')
          .responseSuccess(res);
      } else {
        throw new BadRequestError('Errors');
      }
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res);
    }
  }


//   @Post('/refresh')
//   async refresh(@Req() req: Request, @Res() res: Response, next: NextFunction) {
//     try {
//       const { accessToken, refreshToken } = req.body;
//       const decryptAccess = (await verifyToken(accessToken)) as IAccessToken;
//       const address = decryptAccess.address;
//       const oldRefresh = await getCacheExpire(`auth_refresh_address_${address}`);
//       if (JSON.parse(oldRefresh?.toLowerCase() as string) == refreshToken.toLowerCase()) {
//         const data = await this.authRepository.findByAddress(address);
//         const user = data;
//         const newAccessToken = createAccessToken(user);
//         const newRefreshToken = createRefreshToken(user);

//         // set refresh to redis
//         setCacheExpire(`auth_refresh_address_${address}`, newRefreshToken, REFRESH_TTL);

//         return this.setData({
//           accessToken: newAccessToken,
//           refreshToken: newRefreshToken,
//         })
//           .setCode(200)
//           .setMessage('Success')
//           .responseSuccess(res);
//       } else {
//         throw new BadRequestError('Wrong Tokens');
//       }
//     } catch (error) {
//       return this.setCode(error?.status || 500)
//         .setMessage(error?.message || 'Internal server error')
//         .responseErrors(res);
//     }
//   }
}

export default AuthController;


