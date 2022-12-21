import { NextFunction, Response, Request } from 'express';
import AssessmentRepository from '@repositories/assessment.repository';
import { BaseController } from './base.controller';
import { Authorized, UseBefore, BadRequestError, CurrentUser, Body, Get, JsonController, Post, Req, Res, Delete, Put } from 'routing-controllers';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { Service } from 'typedi';
import {AsssessmentDto} from '../../dtos/assessment.dto'
import { AuthRequest } from '@interfaces/response.interface';



@JsonController('/assessment')
@Service()
class AssessmentController extends BaseController {
  constructor(protected assessmentRepository: AssessmentRepository) {
    super();
  }
  
  @Authorized()
  @UseBefore(AuthMiddleware)
  @Post('/create')
  async create(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
        const assessDto: AsssessmentDto = req.body;
        const hr = req.hr
        const {name, start_date, end_date} = assessDto;
        //res.json({hr_id: hr.id, name: assessDto.name})
        await this.assessmentRepository.createbyName(hr.id, name,  start_date, end_date)
        return this.setData(
            'Create assessment successfully'
          )
            .setMessage('Success')
            .responseSuccess(res);
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Put('/update/:id')
  async update(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
        const assessDto: AsssessmentDto = req.body;
        const hr = req.hr
        const {name, start_date, end_date} = assessDto;
        //res.json({hr_id: hr.id, name: assessDto.name})
        await this.assessmentRepository.update(
          {name: name,  start_date: start_date, end_date: end_date},
          {where:{
            id: req.params.id,
          }})

        return this.setData(
            'Update assessment successfully'
          )
            .setMessage('Success')
            .responseSuccess(res);
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Delete('/delete/:id')
  async delete(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
        await this.assessmentRepository.deleteById(req.params.id)
        return this.setData(
            'Delete assessment successfully'
          )
            .setMessage('Success')
            .responseSuccess(res);
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Get('/list')
  async getAssessments(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
        const hr = req.hr
        const assessments = await this.assessmentRepository.getAll({where:{hr_id: hr.id}})
        if (assessments){
        return this.setData({
            assessments
          })
            .setCode(200)
            .setMessage('Success')
            .responseSuccess(res);
        } else {
          throw new BadRequestError('Error Assessment');
        }
    } catch (error) {
      return this.setCode(error?.status || 500)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }
}

export default AssessmentController

