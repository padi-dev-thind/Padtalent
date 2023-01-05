import { NextFunction, Response, Request } from 'express';
import AssessmentRepository from '@repositories/assessment.repository';
import Assessment_game_typeRepository from '@repositories/assessment_game_type.repository';
import TestRepository from '@repositories/test.repository';
import Candidates_assessmentsRepository from '@repositories/candidates_assessments.repository';
import CandidateRepository from '@repositories/candidate.repository';
import Hr_game_typeRepository from '@repositories/hr_game_type.repository';
import { BaseController } from './base.controller';
import { Authorized, UseBefore, BadRequestError, CurrentUser, Body, Get, JsonController, Post, Req, Res, Delete, Put } from 'routing-controllers';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { Service } from 'typedi';
import {AsssessmentDto} from '../../dtos/assessment.dto'
import { AuthRequest } from '@interfaces/response.interface';;
import nodemailer from "nodemailer";
import { GameType } from '@enum/game.enum';




@JsonController('/assessment')
@Service()
class AssessmentController extends BaseController {
  constructor(
    protected assessmentRepository: AssessmentRepository,
    protected assessment_game_typeRepository: Assessment_game_typeRepository,
    protected testRepository: TestRepository,
    protected hr_game_typeRepository: Hr_game_typeRepository,
    protected candidateRepository: CandidateRepository,
    protected candidates_assessmentsRepository: Candidates_assessmentsRepository,
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
        let isSuccess = 1
        const assessDto: AsssessmentDto = req.body;
        const hr = req.hr
        const {name, game_types, start_date, end_date} = assessDto;
        //check if hr hr has right to approach the game type
        for (const type of game_types){
          const game_type = await this.hr_game_typeRepository.findByCondition({where:{hr_id: hr.id, game_type_id: type}})
          if (!game_type){
            isSuccess = 0
            throw new BadRequestError('Do not have the right to create game id: ' + type);
          }
        }
        //create new assessment
        const assessment = await this.assessmentRepository.createbyName(hr.id , name,  start_date, end_date)
        const link = 'Padtalent/test/' + assessment.id
        await this.assessmentRepository.update({link: link},{where:{id: assessment.id}})
        //insert new assessment's game types
        for (const type of game_types){
          await this.assessment_game_typeRepository.create({assessment_id: assessment.id, game_type_id: type})
        }
        if(isSuccess)
          return this.setData( 
              {
                assessment:assessment,
                game_types: game_types
              }
            )
              .setMessage('Success')
              .responseSuccess(res);
    } catch (error) {
      return this.setData({}).setCode(error?.status || 500).setStack(error.stack).setMessage(error?.message || 'Internal server error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Put('/update/:id')
  async update(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
        let isSuccess = 1
        const assessDto: AsssessmentDto = req.body;
        const hr = req.hr
        const {name, game_types, start_date, end_date} = assessDto;
  
        //check if hr hr has right to approach the game type
        for (const type of game_types){
          const game_type = await this.hr_game_typeRepository.findByCondition({where:{hr_id: hr.id, game_type_id: type}})
          if (!game_type){
            isSuccess = 0
            throw new BadRequestError(' have not the right to create game id ' + type);
          }
        }
        const updateAss = await this.assessmentRepository.update(
          {name: name,  start_date: start_date, end_date: end_date},
          {where:{
            id: req.params.id,
          }})
        if(updateAss == 0){
          isSuccess = 0
          throw new BadRequestError('can find this assessment');
        }
        //update game type
        for (const type of game_types){
          await this.assessment_game_typeRepository.findOrCreateByCondition({where:{assessment_id: req.params.id, game_type_id: type}})
        }
        if(isSuccess)
          return this.setData(
            "update successfully"
            )
              .setMessage('Success')
              .responseSuccess(res);
    } catch (error) {
      return this.setData({}).setCode(error?.status || 500).setStack(error.stack).setMessage(error?.message || 'Internal server error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Delete('/delete/:id')
  async delete(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
        const assessment = await this.assessmentRepository.findById(req.params.id) 
        if(assessment){
          await this.assessmentRepository.deleteById(req.params.id)
          return this.setData(
              'Delete assessment successfully'
            )
              .setMessage('Success')
              .responseSuccess(res);
        }
        else{
          throw new BadRequestError('not found')
        }
    } catch (error) {
      return this.setData({}).setCode(error?.status || 500).setStack(error.stack).setMessage(error?.message || 'Internal server error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Post('/restore/:id')
  async restore(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
        await this.assessmentRepository.restore({where:{id: req.params.id}})
        return this.setData(
            'restore assessment successfully'
          )
            .setMessage('Success')
            .responseSuccess(res);
        
    } catch (error) {
      return this.setData({}).setCode(error?.status || 500).setStack(error.stack).setMessage(error?.message || 'Internal server error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Get('/result/:id')
  async getResult(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
        const transporter = this
        const id = req.params.id
        const {count, rows} = await this.testRepository.getByCondition({assessment_id: id}, 0, 100)
       
        const results = await Promise.all(rows.map(async function(test){
          const candidate_id = test.candidate_id
          const candidate = await transporter.candidateRepository.findById(candidate_id)
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

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Get('/:id/link')
  async getLink(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
        let isSuccess = 1
        const hr = req.hr
        const assessment = await this.assessmentRepository.findByCondition({where:{id:req.params.id}})
        if(!assessment){
          isSuccess = 0
          throw new BadRequestError('not found assessment');
        }
        if(assessment.hr_id != hr.id){
          isSuccess = 0
          throw new BadRequestError('this hr don t have the right to access this link');
        }
        if (assessment){
        if (isSuccess)
          return this.setData({
              link: assessment.link
            })
              .setCode(200)
              .setMessage('Success')
              .responseSuccess(res);
        } else {
          throw new BadRequestError('Error Assessment');
        }
    } catch (error) {
      return this.setCode(error?.status || 500).setData({})
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Post('/:id/send-email')
  async inviteByEmail(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      let isSuccess = 1
      const email = req.body.email
      await this.candidateRepository.create({email:email})
      const assessment = await this.assessmentRepository.findByCondition({where:{id: req.params.id}})
      if(!assessment){
        isSuccess = 0
        throw new BadRequestError("not found assessment")
      }
      var transporter =  nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'thideptrai123tq@gmail.com',
            pass: 'asmfjykwiexxckkg'
        }
      });
      var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
      from: 'Paditech',
      to: email,
      subject: 'Test inviatation',
      text: 'You have got a invite to test' ,
      html: 'link: <a>' + assessment.link +'</a>'
    }
    let mg
    transporter.sendMail(mainOptions, await function(err, info){
      if (err) {
          isSuccess = 0
          throw new BadRequestError(err.message)
      } else {
          console.log('Message sent: ' +  info.response);
          mg = 'Message sent: ' +  info.response
      }
    });
    if (isSuccess)
      return this.setData( 
        mg
      )
        .setMessage('Success')
        .responseSuccess(res);
        
    } catch (error) {
      return this.setData({}).setCode(error?.status || 500).setStack(error.stack).setMessage(error?.message || 'Internal server error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Post('/:id/upload-list')
  async uploadCandidateList(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const data = req.body
      const list = await this.candidateRepository.bulkCreate(data)
      for(const candidate of list){
        await this.candidates_assessmentsRepository.create({candidate_id: candidate.id, assessment_id: req.params.id})
      }
      return this.setData( 
            list
          )
            .setMessage('Success')
            .responseSuccess(res);
    } catch (error) {
      return this.setData({}).setCode(error?.status || 500).setStack(error.stack).setMessage(error?.message || 'Internal server error').responseErrors(res);
    }
  }
}

export default AssessmentController

