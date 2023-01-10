import { NextFunction, Response, Request } from 'express';
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
import { Service } from 'typedi';
import CandidateRepository from '@repositories/candidate.repository';
import TestRepository from '@repositories/test.repository';
import AssessmentRepository from '@repositories/assessment.repository';
import Assessment_game_typeRepository from '@repositories/assessment_game_type.repository';
import Candidates_assessmentsRepository from '@repositories/candidates_assessments.repository';
import { AuthRequest } from '@interfaces/response.interface';
import { CandidateMiddleware } from '@middlewares/candidate.middleware';
import { GameTotalTime, GameType, NumberOfQuestionGame } from '@enum/game.enum';
import { MemoryQuestionDto } from 'dtos/question.dto';
import Memory_questionsRepository from '@repositories/memory_questions.repository';
import Memory_questions_testsRepository from '@repositories/memory_questions_tests.repository';
import { HttpException } from '@exceptions/http.exception';
import { memoryQuestionTimeout } from '@services/checkTimeout';

@JsonController('/memory-test')
@Service()
class MemoryTestController extends BaseController {
  constructor(
    protected candidateRepository: CandidateRepository,
    protected testRepository: TestRepository,
    protected assessmentRepository: AssessmentRepository,
    protected assessment_game_typeRepository: Assessment_game_typeRepository,
    protected candidates_assessmentsRepository: Candidates_assessmentsRepository,
    protected memory_questions_testsRepository: Memory_questions_testsRepository,
    protected memory_questionsRepository: Memory_questionsRepository,
  ) {
    super();
  }

  @Authorized()
  @UseBefore(CandidateMiddleware)
  @Get('/start')
  async getAssessments(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      let firstQuestion = null;
      //check if test had been created
      const test = await this.testRepository.findByCondition({
        where: {
          game_type_id: GameType.memory,
          candidate_id: req.candidate.id,
          assessment_id: req.assessment.id,
        },
      });
      if (test) {
        throw new HttpException(400, 'the test had been created before');
      }
      //create new test
      const newtest = await this.testRepository.create({
        game_type_id: GameType.memory,
        candidate_id: req.candidate.id,
        assessment_id: req.assessment.id,
        total_time: GameTotalTime.memory,
        result: 0,
        remaining_time: GameTotalTime.memory,
        number_of_questions: NumberOfQuestionGame.memory,
        start_time: new Date(),
        status: 'in progress',
      });
      //logic create question :
      for (let i = 1; i <= NumberOfQuestionGame.memory; i++) {
        const questions = await this.memory_questionsRepository.getAll({
          where: { level: i },
        });
        let status = 'not answer';
        let is_showed_at = null 
        //add to Memory_question_test
        const random_question_index = Math.floor(Math.random() * questions.length);
        if (i == 1) {
          firstQuestion = questions[random_question_index];
          status = 'answering';
          is_showed_at = new Date()
        }
        await this.memory_questions_testsRepository.create({
          memory_question_id: questions[random_question_index].id,
          test_id: newtest.id,
          question_number: i,
          status: status,
          is_showed_at: is_showed_at
        });
      }
      firstQuestion.answer =""
      return this.setData(firstQuestion).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setStack(error.stack)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(CandidateMiddleware)
  @Get('/continue') //socket.on('disconnect', callback()); - client side
  async continue(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      let question_raw
      const test = await this.testRepository.findByCondition({
        where: {
          candidate_id: req.candidate.id,
          assessment_id: req.assessment.id,
          game_type_id: GameType.memory,
          status: 'in progress',
        },
      });
      let isSuccess = 1;
      let recentQuestion = null;
      if (test) {
        question_raw = await this.memory_questions_testsRepository.findByCondition({
          where: {
            status: 'answering',
            test_id: test.id,
          },
        });
        if (question_raw) {
          //get question
          recentQuestion = await this.memory_questionsRepository.findById(
            question_raw.memory_question_id,
          );
          //check time out
          const isTimeout = memoryQuestionTimeout(question_raw, recentQuestion.level)
          if(isTimeout){
            await this.testRepository.update(
              {
                remaining_time: 0,
                status: 'completed'
              },
              {
                where: {
                  id: test.id,
                },
              },
            );
            throw new HttpException(400,'time out');
            }
          recentQuestion.answer = ""
        } else {
          throw new HttpException(400, 'can not find question or question was deleted');
        }
      } else {
        throw new HttpException(400, 
          'can not find question or question is answerd or question was deleted',
        );
      }

      var show_data_time_remain = 0
      var remaining_time = 0
      var now_date = new Date()
      var now = now_date.getTime()
      var show_data_time = question_raw.is_showed_at.getTime()
      const t = now - show_data_time
      if (t <= recentQuestion.level*10000)
        show_data_time_remain = recentQuestion.level*10000 - t
      if (t <= (recentQuestion.level*20000)){
        remaining_time = recentQuestion.level*20000 - t
      }
      return this.setData({
        recentQuestion: recentQuestion,
        test_result: test.result,
        show_data_time_remain: show_data_time_remain,
        remaining_time: remaining_time,
      })
        .setMessage('Success')
        .responseSuccess(res);
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setStack(error.stack)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(CandidateMiddleware)
  @Get('/result-recent-question') //socket.on('disconnect', callback()); - client side
  async getResultRecentQuestion(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const memoryQuestionDto: MemoryQuestionDto = req.body;
      const { candidate_answer } = memoryQuestionDto;
      const test = await this.testRepository.findByCondition({
        where: {
          candidate_id: req.candidate.id,
          assessment_id: req.assessment.id,
          game_type_id: GameType.memory,
          status: 'in progress',
        },
      });

      let isSuccess = 1;
      let nextQuestion = null;
      let recentQuestion = null;
      let status = 'wrong answer';
      let test_status = 'in progress';
      let new_test_result = null;
      let question_number = 0;
      let recentQuestion_raw
      let nextQuestion_raw
      if (test) {
        new_test_result = test.result;
        recentQuestion_raw = await this.memory_questions_testsRepository.findByCondition({
          where: {
            test_id: test.id,
            status: 'answering',
          },
        });
        question_number = recentQuestion_raw.question_number;
        if (question_number == NumberOfQuestionGame.memory) test_status = 'completed';
        nextQuestion_raw = await this.memory_questions_testsRepository.findByCondition({
          where: {
            question_number: question_number + 1,
            test_id: test.id,
          },
        });
        if (recentQuestion_raw) {
          recentQuestion = await this.memory_questionsRepository.findById(
            recentQuestion_raw.memory_question_id,
          );
          //check time out
          const isTimeout = memoryQuestionTimeout(recentQuestion_raw, recentQuestion.level)
          if(isTimeout){
            await this.testRepository.update(
              {
                remaining_time: 0,
                status: 'completed'
              },
              {
                where: {
                  id: test.id,
                },
              },
            );
            test_status = 'completed';
            }
          if (nextQuestion_raw)
            nextQuestion = await this.memory_questionsRepository.findById(
              nextQuestion_raw.memory_question_id,
            );
          //check if answer is true
          if (candidate_answer == 'skip') {
            status = 'skip';
          } else {
            if (recentQuestion.data == candidate_answer ) {
              status = 'correct answer';
              new_test_result = recentQuestion.level;
            } else {
              test_status = 'completed';
            }
          }

          //update logical_questions_tests and test table
          await this.memory_questions_testsRepository.update(
            {
              status: status,
              candidate_answer: candidate_answer,
            },
            {
              where: {
                question_number: question_number,
                test_id: test.id,
              },
            },
          );
          //update the status
          await this.memory_questions_testsRepository.update(
            { 
              status: 'answering',
              is_showed_at: new Date() 
            }
            ,
            {
              where: {
                question_number: question_number + 1,
                test_id: test.id,
              },
            },
          );
          //update test
          await this.testRepository.update(
            {
              result: new_test_result,
              status: test_status, // completed if answer is wrong or last question
            },
            {
              where: {
                id: test.id,
              },
            },
          );
        } else {
          isSuccess = 0;
          throw new HttpException(400, 'can not find question or question was deleted');
        }
      } else {
        isSuccess = 0;
        throw new HttpException(400, 'test not start or have been completed or assessment is deleted');
      }

      let data = null;
      var show_data_time_remain = 0
      var remaining_time = 0
      var now_date = new Date()
      var now = now_date.getTime()
      var show_data_time = recentQuestion_raw.is_showed_at.getTime()
      const t = now - show_data_time
      if (t <= recentQuestion.level*10000)
        show_data_time_remain = recentQuestion.level*10000 - t
      if (t <= (recentQuestion.level*20000))
        remaining_time = recentQuestion.level*20000 - t

      if (test_status == 'in progress'){
      nextQuestion.answer = ""
        data = {
          nextQuestion: nextQuestion,
          next_question_number: question_number + 1,
          result: status,
          new_test_result: new_test_result,
          test_status: test_status,
          show_data_time_remain: show_data_time_remain,
          remaining_time: remaining_time,
        };
      }
      else if (test_status == 'completed') {
        data = {
          result: status,
          test_result: new_test_result,
          test_status: test_status,
        };
      }
      if (isSuccess) return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setStack(error.stack)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(CandidateMiddleware)
  @Put('/leave')
  async leaveRecentTest(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const remaining_time = req.body;
      const test = await this.testRepository.findByCondition({
        where: {
          candidate_id: req.candidate.id,
          assessment_id: req.assessment.id,
          game_type_id: GameType.memory,
          status: 'in progress',
        },
      });

      let isSuccess = 1;

      if (test) {
        await this.testRepository.update(
          {},
          {
            where: {
              id: test.id,
            },
          },
        );
      } else {
        isSuccess = 0;
        throw new HttpException(400, 'test not start or have been completed or assessment is deleted');
      }
      if (isSuccess)
        return this.setData('leave the test! the has been saved')
          .setMessage('Success')
          .responseSuccess(res);
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setStack(error.stack)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(CandidateMiddleware)
  @Put('/time-out')
  async setTimeOut(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const test = await this.testRepository.findByCondition({
        where: {
          candidate_id: req.candidate.id,
          assessment_id: req.assessment.id,
          game_type_id: GameType.memory,
          status: 'in progress',
        },
      });
      if (test) {
        await this.testRepository.update(
          {
            remaining_time: 0,
            status: 'completed', // completed if answer is wrong or last question
          },
          {
            where: {
              id: test.id,
            },
          },
        );
      } else {
        throw new HttpException(400,'test not start or have been completed or assessment is deleted');
      }
        return this.setData({result: test.result}).setMessage('set time out seccessfully').responseSuccess(res);
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setStack(error.stack)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }
}

export default MemoryTestController;
