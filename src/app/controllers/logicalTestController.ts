import { NextFunction, Response, Request } from 'express';
import { BaseController } from './base.controller';
import { Authorized, UseBefore, BadRequestError, CurrentUser, Body, Get, JsonController, Post, Req, Res, Delete, Put } from 'routing-controllers';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { Service } from 'typedi';
import CandidateRepository from '@repositories/candidate.repository';
import TestRepository from '@repositories/test.repository';
import AssessmentRepository from '@repositories/assessment.repository';
import Assessment_game_typeRepository from '@repositories/assessment_game_type.repository';
import Candidates_assessmentsRepository from '@repositories/candidates_assessments.repository';
import Logical_questions_testsRepository from '@repositories/logical_questions_tests.repository';
import Logical_questionsRepository from '@repositories/logical_questions.repository';
import { AuthRequest } from '@interfaces/response.interface';
import { CandidateMiddleware } from '@middlewares/candidate.middleware';
import {GameType, NumberOfQuestionGame }from '@enum/game.enum';
import { LogicalQuestionDto } from 'dtos/question.dto';
import { toNumber } from '@lib/env/utils';



@JsonController('/logical-test')
@Service()
class logicalTestController extends BaseController {
  constructor(
    protected candidateRepository: CandidateRepository,
    protected testRepository: TestRepository,
    protected assessmentRepository: AssessmentRepository,
    protected assessment_game_typeRepository: Assessment_game_typeRepository,
    protected candidates_assessmentsRepository: Candidates_assessmentsRepository,
    protected logical_questions_testsRepository: Logical_questions_testsRepository,
    protected logical_questionsRepository: Logical_questionsRepository,
  )
  {
    super();
  }

  @Authorized()
  @UseBefore(CandidateMiddleware)
  @Get('/start')
  async getAssessments(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const test = await this.testRepository.findByCondition({where:{
        candidate_id: req.candidate.id,
        assessment_id:req.assessment.id,
        game_type_id: GameType.logical,                                       
      }})
      let firstQuestion = null
      if(test){
        await this.testRepository.update( {status: "in progress"}, {where: {id: test.id}})
        const question_raw = await this.logical_questions_testsRepository.findByCondition(
          {where:{
            question_number: 1,                                                                     
            test_id: test.id
          }
        })
        if(question_raw){
          await this.logical_questions_testsRepository.update(
            {status: 'answering'},
            {where:{
              id:question_raw.logical_question_id
          }})

          firstQuestion = await this.logical_questionsRepository.findById(question_raw.logical_question_id)
        }
        else {
            throw new BadRequestError('question is not exist or have been deleted');  
        }
      }
      else{
             const newtest = await this.testRepository.create({
                game_type_id: GameType.logical, 
                candidate_id: req.candidate.id,
                assessment_id: req.assessment.id,
                total_time: 90,
                remaining_time: 90,
                number_of_questions: 10,
                start_time: new Date(),
                status: "in progress"
                })
                req.test = newtest
              const yes_data = await this.logical_questionsRepository.getAllAndCount()
              const yes_questions_all = yes_data.rows
              const no_data = await this.logical_questionsRepository.getAllAndCount()
              const no_questions_all = no_data.rows
              //test 10 question in a test 5 yes and 5 no
              const suffle_yes_questions = yes_questions_all.sort(()=>0.5 - Math.random())
              const random_yes_questions = suffle_yes_questions.slice(0,5)
  
              const suffle_no_questions = no_questions_all.sort(()=>0.5 - Math.random())
              const random_no_questions = suffle_no_questions.slice(0,5)
              
              const random_questions = random_no_questions.concat(random_yes_questions)
              random_questions.sort(()=>0.5 - Math.random())
              //add to logical_question_test table
              let count = 1
              let status = 'answering'
              for(const question of random_questions){
                if (count != 1)
                  status = 'not answer'
                await this.logical_questions_testsRepository.create({
                  logical_question_id: question.id,
                  test_id: newtest.id,
                  status: status,
                  question_number: count 
                })
                count++
              }
              firstQuestion = random_questions[0]
    } 
      return this.setData( 
        firstQuestion
      )
        .setMessage('Success')
        .responseSuccess(res);
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(CandidateMiddleware)
  @Get('/continue') //socket.on('disconnect', callback()); - client side
  async continue(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const test = await this.testRepository.findByCondition({where:
        {
          candidate_id: req.candidate.id,
          assessment_id:req.assessment.id,
          game_type_id: GameType.logical,
        }})
      let recentQuestion = null
      if(test){
        await this.testRepository.update( {status: "in progress"}, {where: {id: test.id}})
        const question_raw = await this.logical_questions_testsRepository.findByCondition({where:
          {
            status: "answering",
            test_id: test.id
          }})
        if(question_raw)
        recentQuestion = await this.logical_questionsRepository.findById(question_raw.logical_question_id)
        else {
            throw new BadRequestError('can not find question or question was deleted');  
        }
      }
      else{
        throw new BadRequestError('not start or assessment is deleted');  
      }
      return this.setData( 
        recentQuestion
      )
        .setMessage('Success')
        .responseSuccess(res);
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(CandidateMiddleware)
  @Post('/disconnect') //socket.on('disconnect', callback()); - client side
  async disconnetTest(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const test = await this.testRepository.findByCondition({where:{
        candidate_id: req.candidate.id,
        assessment_id:req.assessment.id,
        game_type_id: GameType.logical,
      }})
      const {remaining_time, logical_question_id} = req.body
      //
      await this.testRepository.update({remaining_time: remaining_time },{where: {id: test.id}})
      await this.logical_questions_testsRepository.update(
        {status: 'answering'},
        {where:{
          logical_question_id: logical_question_id,
          test_id: test.id
        }})
      return this.setData( 
        "updated successfully - user disconnected"
      )
        .setMessage('Success')
        .responseSuccess(res);
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res);
    }
  }
  
  @Authorized()
  @UseBefore(CandidateMiddleware)
  @Get('/next-question') //socket.on('disconnect', callback()); - client side
  async getNextQuestion(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const {recent_question_number} = req.body
      const test = await this.testRepository.findByCondition(
        {where:
        {
          candidate_id: req.candidate.id,
          assessment_id:req.assessment.id,
          game_type_id: GameType.logical,
        }})
  
      let nextQuestion = null 
      let isLastQuestion = false
      
      if(test){
        //check if is the last question

        if(recent_question_number == NumberOfQuestionGame ) {
          return this.setData( 
              "last question"
          )
            .setMessage('Success')
            .responseSuccess(res);
        }
        const next_question_number = toNumber(recent_question_number) + 1
        const question_raw = await this.logical_questions_testsRepository.findByCondition(
          {where:
          {
            question_number: next_question_number,
            test_id: test.id
          }})
        if(question_raw){
          //get next question
          nextQuestion = await this.logical_questionsRepository.findByCondition(
            {where:{
              id: question_raw.id
            }})
          //update the status
          await this.logical_questions_testsRepository.update(
            {status: 'answering'},
            {where:
            {
              logical_question_id: question_raw.logical_question_id
            }})
        }
        else {
            throw new BadRequestError('can not find question or question was deleted');  
        }
      }
      else{
        throw new BadRequestError('not start or assessment is deleted');  
      }
      return this.setData( 
        {
          nextQuestion: nextQuestion,
        }
      )
        .setMessage('Success')
        .responseSuccess(res);
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(CandidateMiddleware)
  @Get('/result-recent-question') //socket.on('disconnect', callback()); - client side
  async getResultRecentQuestion(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const logicalQuestionDto: LogicalQuestionDto = req.body
      const {remaining_time, candidate_answer, logical_question_id} = logicalQuestionDto
      const test = await this.testRepository.findByCondition(
        {where:
        {
          candidate_id: req.candidate.id,
          assessment_id:req.assessment.id,
          game_type_id: GameType.logical,
        }})
  
      let recentQuestion = null
      let status = 'wrong answer'
      let reward = 0
      let new_test_result = 0
      if(test){
        const question_raw = await this.logical_questions_testsRepository.findByCondition(
          {where:
          {
            logical_question_id: logical_question_id,
            test_id: test.id
          }})
        if(question_raw){
          recentQuestion = await this.logical_questionsRepository.findById(question_raw.logical_question_id)
          //check if answer is true
          if(candidate_answer == 'skip'){
            status = 'skip'
          }
          else{
            if(recentQuestion.answer == candidate_answer)
              status = 'correct answer'
              reward = 1
          }
          // final test result
          new_test_result = test.result + 1
          //update logical_questions_tests and test table
          await this.logical_questions_testsRepository.update(
            {
              status: status,
              candidate_answer: candidate_answer
            }, 
            {where:{
              logical_question_id: logical_question_id,
              test_id: test.id
            }
          })
          await this.testRepository.update(
            {
              result: new_test_result,
              remaining_time: remaining_time  
            },
            {where:{
              id: test.id
          }})
        }
        else {
            throw new BadRequestError('can not find question or question was deleted');  
        }

      }
      else{
        throw new BadRequestError('not start or assessment is deleted');  
      }
      return this.setData( 
        {
          recentquestion: recentQuestion,
          result: status,
          new_test_result: new_test_result
        }
        
      )
        .setMessage('Success')
        .responseSuccess(res);
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res);
    }
  }
  
}

export default logicalTestController

