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
import { GameType } from '@enum/game.enum';
import AssessmentRepository from '@repositories/assessment.repository';
import Candidates_assessmentsRepository from '@repositories/candidates_assessments.repository';
const { v4: uuidv4 } = require('uuid');


@JsonController('/hr')
@Service()
class HrController extends BaseController {
  constructor(
    protected hrRepository: HrRepository,
    protected hr_game_typeRepository: Hr_game_typeRepository,
    protected assessmentRepository: AssessmentRepository,
    protected candidates_assessmentsRepository: Candidates_assessmentsRepository,
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
        company_industry, company_size, email, game_types} = hr
      //enscrypt password
      // const hashPassword = Crypto.AES.encrypt(
      //   password,
      //   env.auth.pass_sec
      // )
  
      const hashPassword = await bcrypt.hash(password, toNumber(env.auth.pass_sec))
      
      const newHr = await this.hrRepository.create({name: name, password: JSON.stringify(hashPassword), logo: logo, role: role, company: company,
         company_industry: company_industry, company_size: company_size, email: email})
         
      for(const type of game_types){
        await this.hr_game_typeRepository.create({hr_id: newHr.id, game_type_id: type})
      }
      return this.setData( 
            {
              newHr: newHr,
              game_types: game_types
            } 
          )
            .setMessage('Success')
            .responseSuccess(res);
    } catch (error) {
      return this.setData({}).setStack(error.stack).setMessage(error?.message || 'Internal server error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Get('/game-types-list')
  async getGameTypes(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const hr_game_types = await this.hr_game_typeRepository.getAll({where:{hr_id: req.hr.id}})
      const game_type_ids = hr_game_types.map((type)=>
        type.game_type_id
      )
      return this.setData( 
            {
              game_types: game_type_ids
            } 
          )
            .setMessage('Success')
            .responseSuccess(res);
    } catch (error) {
      return this.setData({}).setStack(error.stack).setMessage(error?.message || 'Internal server error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AdminMiddleware)
  @Get('/list')
  async getHrs(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const hrs = await this.hrRepository.getAll({where:{is_admin: null}})
      let hrName
      // if(hrs){
      //   hrName = hrs.map((hr)=>({
      //     name: hr.name
      //   })) 
      // }
      return this.setData( 
            hrs
          )
            .setMessage('Success')
            .responseSuccess(res);
    } catch (error) {
      return this.setData({}).setStack(error.stack).setMessage(error?.message || 'Internal server error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Get('/profile')
  async getProfile(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    console.log("a")
    try {
    return this.setData( 
          req.hr
        )
        .setMessage('Success')
        .responseSuccess(res);
    } catch (error) {
      return this.setData({}).setStack(error.stack).setMessage(error?.message || 'Internal server error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AdminMiddleware)
  @Delete('/delete/:id')
  async delete(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
        const id = req.params.id
        const test = await this.hrRepository.findByCondition({where:{id: id}})
        if(test){
          const assessemnt = await this.assessmentRepository.findByCondition({where:{hr_id: id}})
          if (assessemnt)
            await this.candidates_assessmentsRepository.delete({where:{assessment_id: id}})
          await this.assessmentRepository.delete({where:{hr_id: id}})
          await this.hr_game_typeRepository.delete({where:{hr_id: id}})
          await this.hrRepository.deleteById(id)
          return this.setData( 
            "delete successfully"
          )
            .setMessage('Success')
            .responseSuccess(res);
        }
        else{
          throw new BadRequestError('not found');
        }
    } catch (error) {
      return this.setCode(error?.status || 500).setStack(error.stack).setMessage(error?.message || 'Internal server error').responseErrors(res);
    }
  }
}

export default HrController

