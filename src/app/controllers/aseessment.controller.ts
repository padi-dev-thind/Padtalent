import { NextFunction, Response, Request } from 'express';
import AssessmentRepository from '@repositories/assessment.repository';
import Assessment_game_typeRepository from '@repositories/assessment_game_type.repository';
import TestRepository from '@repositories/test.repository';
import CandidateRepository from '@repositories/candidate.repository';
import Hr_game_typeRepository from '@repositories/hr_game_type.repository';
import { BaseController } from './base.controller';
import { Authorized, UseBefore, BadRequestError, CurrentUser, Body, Get, JsonController, Post, Req, Res, Delete, Put } from 'routing-controllers';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { Service } from 'typedi';
import {AsssessmentDto} from '../../dtos/assessment.dto'
import { AuthRequest } from '@interfaces/response.interface';
import { TestDto } from 'dtos/test.dto';
import Candidate from '@models/entities/candidates';




@JsonController('/assessment')
@Service()
class AssessmentController extends BaseController {
  constructor(
    protected assessmentRepository: AssessmentRepository,
    protected assessment_game_typeRepository: Assessment_game_typeRepository,
    protected testRepository: TestRepository,
    protected hr_game_typeRepository: Hr_game_typeRepository,
    protected candidateRepository: CandidateRepository,
  )
  {
    super();
  }
  
  @Authorized()
  @UseBefore(AuthMiddleware)
  @Post('/create')
  async create(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    console.log('a')
    try {
      
        const assessDto: AsssessmentDto = req.body;
        const hr = req.hr
        const {name, visual, memory, start_date, end_date} = assessDto;
        //check if hr hr has right to approach the game type
        if (visual)
        console.log(hr.id)
        var hasVisualType = await this.hr_game_typeRepository.findByCondition({where:{hr_id: hr.id, game_type_id: 1}})
        if (memory)
        var hasMemoryType = await this.hr_game_typeRepository.findByCondition({where:{hr_id: hr.id, game_type_id: 2}})
        if (!hasVisualType || !hasMemoryType )
          throw new BadRequestError('Do not have the right');
        //create new assessment
        await this.assessmentRepository.createbyName(hr.id, name,  start_date, end_date)
        const assessment =  await this.assessmentRepository.findByCondition({where:{hr_id: hr.id, name: name}})
        const link = 'Padtalent/invite/' + assessment.id
        await this.assessmentRepository.update({link: link},{where:{id: assessment.id}})
        //insert new assessment's game types 
        if(visual)
        await this.assessment_game_typeRepository.create({assessment_id: assessment.id, game_type_id: 1})
        if(memory)
        await this.assessment_game_typeRepository.create({assessment_id: assessment.id, game_type_id: 2})
        return this.setData( 
            assessment
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
        const {name, visual, memory, start_date, end_date} = assessDto;
        //res.json({hr_id: hr.id, name: assessDto.name})
        if(visual)
        await this.assessment_game_typeRepository.findOrCreateByCondition({assessment_id: req.params.id, game_type_id: 1})
        if(memory)
        await this.assessment_game_typeRepository.findOrCreateByCondition({assessment_id: req.params.id, game_type_id: 2})

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
  @Get('/result/:id')
  async getResult(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
        const id = req.params.id
        const {count, rows} = await this.testRepository.getByCondition({assessment_id: id}, 0, 100)
       
        // const result = rows.map(function(test){
          
        //   return ({
        //   id: test.id,
        //   candidate_id: test.candidate_id,
        //   game_type_id: test.game_type_id,
        //   result: test.result})
        // })

        const results = await Promise.all(rows.map(async function(test){
          const candidate_id = test.candidate_id
          const candidate = await Candidate.findByPk(candidate_id)
          const candidate_email = candidate.email
          console.log(candidate.email)
          return ({
            id: test.id,
            candidate_id: test.candidate_id,
            candidate_email: candidate_email,
            game_type_id: test.game_type_id,
            result: test.result
          })
          }))


          return this.setData(
          results
          )
            .setCode(200)
            .setMessage('Success')
            .responseSuccess(res);
    } catch (error) {
      return this.setCode(error?.status || 500)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
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

