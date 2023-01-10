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
import { AuthMiddleware } from '@middlewares/auth.middleware';
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
import { toNumber } from '@lib/env/utils';
import Memory_questionsRepository from '@repositories/memory_questions.repository';
import Memory_questions_testsRepository from '@repositories/memory_questions_tests.repository';
import { HttpException } from '@exceptions/http.exception';

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
      let isSuccess = 1;
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
        isSuccess = 0;
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
      for (let i = 1; i <= 10; i++) {
        const questions = await this.memory_questionsRepository.getAll({
          where: { level: i },
        });
        let status = 'not answer';
        //add to Memory_question_test
        const random_question_index = Math.floor(Math.random() * questions.length);
        if (i == 1) {
          firstQuestion = questions[random_question_index];
          status = 'answering';
        }
        await this.memory_questions_testsRepository.create({
          memory_question_id: questions[random_question_index].id,
          test_id: newtest.id,
          question_number: i,
          status: status,
        });
      }
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
      let isShowedData = false;
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
        const question_raw = await this.memory_questions_testsRepository.findByCondition({
          where: {
            status: 'answering',
            test_id: test.id,
          },
        });
        if (question_raw) {
          isShowedData = question_raw.isShowedData;
          recentQuestion = await this.memory_questionsRepository.findById(
            question_raw.memory_question_id,
          );
        } else {
          isSuccess = 0;
          throw new HttpException(400, 'can not find question or question was deleted');
        }
      } else {
        isSuccess = 0;
        throw new HttpException(400, 
          'can not find question or question is answerd or question was deleted',
        );
      }
      if (isSuccess)
        return this.setData({
          recentQuestion: recentQuestion,
          test_result: test.result,
          isShowedData: isShowedData,
          remaining_time: test.remaining_time,
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
  @Post('/ShowedData') //socket.on('disconnect', callback()); - client side
  async setIsShowData(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      let isShowData = false;
      const { question_number } = req.body;
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
        const question_raw = await this.memory_questions_testsRepository.findByCondition({
          where: {
            question_number: question_number,
            status: 'answering',
            test_id: test.id,
          },
        });
        if (question_raw) {
          await this.memory_questions_testsRepository.update(
            { isShowedData: true },
            {
              where: {
                status: 'answering',
                test_id: test.id,
              },
            },
          );
        } else {
          isSuccess = 0;
          throw new HttpException(400, 
            'can not find question or question is answerd or question was deleted',
          );
        }
      } else {
        isSuccess = 0;
        throw new HttpException(400, 'test not start or have been completed or assessment is deleted');
      }
      if (isSuccess)
        return this.setData('update successdully').setMessage('Success').responseSuccess(res);
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

      if (test) {
        new_test_result = test.result;
        const recentQuestion_raw = await this.memory_questions_testsRepository.findByCondition({
          where: {
            test_id: test.id,
            status: 'answering',
          },
        });
        question_number = recentQuestion_raw.question_number;
        if (question_number == NumberOfQuestionGame.memory) test_status = 'completed';
        const nextQuestion_raw = await this.memory_questions_testsRepository.findByCondition({
          where: {
            question_number: question_number + 1,
            test_id: test.id,
          },
        });
        if (recentQuestion_raw) {
          recentQuestion = await this.memory_questionsRepository.findById(
            recentQuestion_raw.memory_question_id,
          );
          if (nextQuestion_raw)
            nextQuestion = await this.memory_questionsRepository.findById(
              nextQuestion_raw.memory_question_id,
            );
          //check if answer is true
          console.log(recentQuestion.data);
          if (candidate_answer == 'skip') {
            status = 'skip';
          } else {
            if (recentQuestion.data == candidate_answer) {
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
            { status: 'answering' },
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
      if (test_status == 'in progress')
        data = {
          nextQuestion: nextQuestion,
          next_question_number: question_number + 1,
          result: status,
          new_test_result: new_test_result,
          test_status: test_status,
        };
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
}

export default MemoryTestController;
