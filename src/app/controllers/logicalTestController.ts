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
import Logical_questions_testsRepository from '@repositories/logical_questions_tests.repository';
import Logical_questionsRepository from '@repositories/logical_questions.repository';
import { AuthRequest } from '@interfaces/response.interface';
import { CandidateMiddleware } from '@middlewares/candidate.middleware';
import { GameTotalTime, GameType, NumberOfQuestionGame } from '@enum/game.enum';
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
  ) {
    super();
  }

  @Authorized()
  @UseBefore(CandidateMiddleware)
  @Get('/start')
  async getAssessments(
    @Req() req: AuthRequest,
    @Res() res: Response,
    next: NextFunction,
  ) {
    try {
      let isSuccess = 1;
      //check if test was created
      const test = await this.testRepository.findByCondition({
        where: {
          game_type_id: GameType.logical,
          candidate_id: req.candidate.id,
          assessment_id: req.assessment.id,
        },
      });
      if (test) {
        isSuccess = 0;
        throw new BadRequestError('the test had been created before');
      }
      //create new test
      const newtest = await this.testRepository.create({
        game_type_id: GameType.logical,
        candidate_id: req.candidate.id,
        assessment_id: req.assessment.id,
        total_time: GameTotalTime.logical,
        remaining_time: GameTotalTime.logical,
        result: 0,
        number_of_questions: NumberOfQuestionGame.logical,
        start_time: new Date(),
        status: 'in progress',
      });

      let firstQuestion = null;
      const yes_data = await this.logical_questionsRepository.getByCondition(
        { answer: 'yes' },
        0,
        100,
      );
      const yes_questions_all = yes_data.rows;
      const no_data = await this.logical_questionsRepository.getByCondition(
        { answer: 'no' },
        0,
        100,
      );
      const no_questions_all = no_data.rows;
      //test 10 question in a test 5 yes and 5 no
      const suffle_yes_questions = yes_questions_all.sort(
        () => 0.5 - Math.random(),
      );
      const random_yes_questions = suffle_yes_questions.slice(
        0,
        NumberOfQuestionGame.logical / 2,
      );

      const suffle_no_questions = no_questions_all.sort(
        () => 0.5 - Math.random(),
      );
      const random_no_questions = suffle_no_questions.slice(
        0,
        NumberOfQuestionGame.logical / 2,
      );

      const random_questions = random_no_questions.concat(random_yes_questions);
      random_questions.sort(() => 0.5 - Math.random());
      //add to logical_question_test table
      let count = 1;
      let status = 'answering';
      for (const question of random_questions) {
        if (count != 1) status = 'not answer';
        await this.logical_questions_testsRepository.create({
          logical_question_id: question.id,
          test_id: newtest.id,
          status: status,
          question_number: count,
        });
        count++;
      }
      firstQuestion = random_questions[0];
      if (isSuccess)
        return this.setData({ firstQuestion })
          .setMessage('Success')
          .responseSuccess(res);
    } catch (error) {
      return this.setData({})
        .setStack(error.stack)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(CandidateMiddleware)
  @Get('/continue') //socket.on('disconnect', callback()); - client side
  async continue(
    @Req() req: AuthRequest,
    @Res() res: Response,
    next: NextFunction,
  ) {
    try {
      const test = await this.testRepository.findByCondition({
        where: {
          candidate_id: req.candidate.id,
          assessment_id: req.assessment.id,
          game_type_id: GameType.logical,
          status: 'in progress',
        },
      });
      let isSuccess = 1;
      let recentQuestion = null;
      if (test) {
        const question_raw =
          await this.logical_questions_testsRepository.findByCondition({
            where: {
              status: 'answering',
              test_id: test.id,
            },
          });
        if (question_raw)
          recentQuestion = await this.logical_questionsRepository.findById(
            question_raw.logical_question_id,
          );
        else {
          isSuccess = 0;
          throw new BadRequestError(
            'can not find question or question was deleted',
          );
        }
      } else {
        isSuccess = 0;
        throw new BadRequestError(
          'test not start or have been completed or assessment is deleted',
        );
      }
      if (isSuccess)
        return this.setData({
          recentQuestion: recentQuestion,
          test_result: test.result,
          remaining_time: test.remaining_time,
        })
          .setMessage('Success')
          .responseSuccess(res);
    } catch (error) {
      return this.setData({})
        .setStack(error.stack)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(CandidateMiddleware)
  @Post('/disconnect') //socket.on('disconnect', callback()); - client side
  async disconnetTest(
    @Req() req: AuthRequest,
    @Res() res: Response,
    next: NextFunction,
  ) {
    try {
      const test = await this.testRepository.findByCondition({
        where: {
          candidate_id: req.candidate.id,
          assessment_id: req.assessment.id,
          game_type_id: GameType.logical,
          status: 'in progress',
        },
      });
      let isSuccess = 1;
      if (test) {
        const { remaining_time } = req.body;
        //
        await this.testRepository.update(
          { remaining_time: remaining_time },
          { where: { id: test.id } },
        );
      } else {
        isSuccess = 0;
        throw new BadRequestError(
          'test not start or have been completed or assessment is deleted',
        );
      }
      if (isSuccess)
        return this.setData('updated successfully - user disconnected')
          .setMessage('Success')
          .responseSuccess(res);
    } catch (error) {
      return this.setData({})
        .setStack(error.stack)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(CandidateMiddleware)
  @Get('/result-recent-question') //socket.on('disconnect', callback()); - client side
  async getResultRecentQuestion(
    @Req() req: AuthRequest,
    @Res() res: Response,
    next: NextFunction,
  ) {
    try {
      const logicalQuestionDto: LogicalQuestionDto = req.body;
      const { remaining_time, candidate_answer } = logicalQuestionDto;
      const test = await this.testRepository.findByCondition({
        where: {
          candidate_id: req.candidate.id,
          assessment_id: req.assessment.id,
          game_type_id: GameType.logical,
          status: 'in progress',
        },
      });
      let isSuccess = 1;
      let nextQuestion = null;
      let recentQuestion = null;
      let status = 'wrong answer';
      let reward = 0;
      let new_test_result = null;
      let test_status = 'in progress';
      let question_number = 0;
      let data = null;

      if (test) {
        new_test_result = test.result;
        const recentQuestion_raw =
          await this.logical_questions_testsRepository.findByCondition({
            where: {
              test_id: test.id,
              status: 'answering',
            },
          });

        question_number = recentQuestion_raw.question_number;
        //check if the recent question is the lat question
        if (question_number == NumberOfQuestionGame.logical)
          test_status = 'completed';
        //get the next question

        const nextQuestion_raw =
          await this.logical_questions_testsRepository.findByCondition({
            where: {
              question_number: question_number + 1,
              test_id: test.id,
            },
          });
        if (recentQuestion_raw) {
          recentQuestion = await this.logical_questionsRepository.findById(
            recentQuestion_raw.logical_question_id,
          );
          if (nextQuestion_raw)
            nextQuestion = await this.logical_questionsRepository.findById(
              nextQuestion_raw.logical_question_id,
            );
          //check if answer is true
          if (candidate_answer == 'skip') {
            status = 'skip';
          } else {
            if (recentQuestion.answer === candidate_answer) {
              status = 'correct answer';
              reward = 1;
            }
          }
          // final test result
          new_test_result += reward;
          //update logical_questions_tests and test table
          await this.logical_questions_testsRepository.update(
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
          //update the status of next question
          await this.logical_questions_testsRepository.update(
            { status: 'answering' },
            {
              where: {
                question_number: question_number + 1,
                test_id: test.id,
              },
            },
          );
          //update test result
          await this.testRepository.update(
            {
              result: new_test_result,
              remaining_time: remaining_time,
              status: test_status,
            },
            {
              where: {
                id: test.id,
              },
            },
          );
        } else {
          isSuccess = 0;
          throw new BadRequestError(
            'can not find question or question was answered or question was deleted',
          );
        }
      } else {
        isSuccess = 0;
        throw new BadRequestError(
          'test not start or have been completed or assessment is deleted',
        );
      }
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
      if (isSuccess)
        return this.setData({
          data,
        })
          .setMessage('Success')
          .responseSuccess(res);
    } catch (error) {
      return this.setData({})
        .setStack(error.stack)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(CandidateMiddleware)
  @Put('/time-out')
  async setTimeOut(
    @Req() req: AuthRequest,
    @Res() res: Response,
    next: NextFunction,
  ) {
    try {
      const test = await this.testRepository.findByCondition({
        where: {
          candidate_id: req.candidate.id,
          assessment_id: req.assessment.id,
          game_type_id: GameType.logical,
          status: 'in progress',
        },
      });

      let isSuccess = 1;

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
        isSuccess = 0;
        throw new BadRequestError(
          'test not start or have been completed or assessment is deleted',
        );
      }
      if (isSuccess)
        return this.setData('set time out seccessfully')
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
  @Put('/leave')
  async leaveRecentTest(
    @Req() req: AuthRequest,
    @Res() res: Response,
    next: NextFunction,
  ) {
    try {
      const remaining_time = req.body;
      const test = await this.testRepository.findByCondition({
        where: {
          candidate_id: req.candidate.id,
          assessment_id: req.assessment.id,
          game_type_id: GameType.logical,
          status: 'in progress',
        },
      });

      let isSuccess = 1;

      if (test) {
        await this.testRepository.update(
          {
            remaining_time: remaining_time,
          },
          {
            where: {
              id: test.id,
            },
          },
        );
      } else {
        isSuccess = 0;
        throw new BadRequestError(
          'test not start or have been completed or assessment is deleted',
        );
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

export default logicalTestController;
