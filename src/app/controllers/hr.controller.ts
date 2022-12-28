import { NextFunction, Response, Request } from 'express';
import HrRepository from '@repositories/hr.repository';
import Hr_game_typeRepository from '@repositories/hr_game_type.repository';
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



@JsonController('/hr')
@Service()
class HrController extends BaseController {
  constructor(
    protected hrRepository: HrRepository,
    protected hr_game_typeRepository: Hr_game_typeRepository
  )
  {
    super();
  }
  
  @Authorized()
  @UseBefore(AdminMiddleware)
  @Post('/create')
  async create(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const hr: HrDto = req.body
      const {name, password, logo, role, company,
        company_industry, company_size, logical, memory, email} = hr
      //enscrypt password
      // const hashPassword = Crypto.AES.encrypt(
      //   password,
      //   env.auth.pass_sec
      // )
      const hashPassword = await bcrypt.hash(password, toNumber(env.auth.pass_sec))

      const newHr = await this.hrRepository.create({name:name, password: hashPassword, logo: logo, role: role, company: company,
         company_industry: company_industry, company_size: company_size, email:email })
         .then(async (newHr)=> {
            if(logical)
            await this.hr_game_typeRepository.create({hr_id: newHr.id, game_type_id: 1})
            if(memory)
            await this.hr_game_typeRepository.create({hr_id: newHr.id, game_typ_id: 2})
          })
          .catch((Error)=>
            console.log(Error)
          )
      return this.setData( 
            newHr
          )
            .setMessage('Success')
            .responseSuccess(res);
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AdminMiddleware)
  @Get('/list')
  async getHrs(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const hrs = await this.hrRepository.getAll()
      return this.setData( 
            hrs
          )
            .setMessage('Success')
            .responseSuccess(res);
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Get('/profile/:id')
  async getProfile(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    console.log("a")
    try {
    const id = req.params.id
      const hr = await this.hrRepository.findByCondition({where:{id: req.params.id}})
      console.log(hr)
      return this.setData( 
            hr
          )
            .setMessage('Success')
            .responseSuccess(res);
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res);
    }
  }

}

export default HrController

