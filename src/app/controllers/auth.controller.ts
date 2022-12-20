import { NextFunction, Response, Request } from 'express';
import { LoginDto } from '../../dtos/auth.dto';
import HrRepository from '@repositories/hr.repository';
import { BaseController } from './base.controller';
import { BadRequestError, Body, Get, JsonController, Post, Req, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { setCacheExpire, getCacheExpire } from '@services/redis';
import { createAccessToken, createRefreshToken, verifyToken } from '@utils/tokenHandler';
import { loginMessage } from '@utils/message';
import { ethers } from 'ethers';
import { REFRESH_TTL } from '@utils/constants';
import random from '@utils/random';
import { IAccessToken } from '@interfaces/token.interface';
import * as Crypto from 'crypto-js'


@JsonController('/auth')
@Service()
class AuthController extends BaseController {
  constructor(protected authRepository: HrRepository) {
    super();
  }

  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const loginDto: LoginDto = req.body;
      const { name, password } = loginDto;
      const data = await this.authRepository.findByName(name);
      const hr = data[0];
      // if (data[1] == true) {
      //   // Create a new collection for new user
      //   await this.authRepository.createCollection(`Collection #${data[0].id}`, data[0].id);
      // }
      let hash_password = hr.password;

      // const message = loginMessage(name, hash_password);
      // const verifyName = ethers.utils.verifyMessage(message, password);
      const hassPassword = Crypto.AES.decrypt(
        hr.password,
        process.env.PASS_SEC,
      );
      const originalPassword = hassPassword.toString(Crypto.enc.Utf8);

      if (originalPassword == password) {
        const accessToken = createAccessToken(hr, false);
        const refreshToken = createRefreshToken(hr, false);
        // Save to redis
        setCacheExpire(`auth_refresh_address_${name}`, refreshToken, REFRESH_TTL);

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
