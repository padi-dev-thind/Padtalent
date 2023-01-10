import { NextFunction, Response, Request } from 'express';
import CandidateRepository from '@repositories/candidate.repository';
import TestRepository from '@repositories/test.repository';
import AssessmentRepository from '@repositories/assessment.repository';
import { BaseController } from './base.controller';
import {
  Authorized,
  UseBefore,
  Get,
  JsonController,
  Req,
  Res,
  Put,
  Delete,
  BadRequestError,
} from 'routing-controllers';
import { Service } from 'typedi';
import { AuthRequest } from '@interfaces/response.interface';
import { CandidateMiddleware } from '@middlewares/candidate.middleware';
import { GameType } from '@enum/game.enum';
import Assessment_game_typeRepository from '@repositories/assessment_game_type.repository';
import Candidates_assessmentsRepository from '@repositories/candidates_assessments.repository';
import Test from '@models/entities/tests';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import Logical_questions_testsRepository from '@repositories/logical_questions_tests.repository';
import Memory_questions_testsRepository from '@repositories/memory_questions_tests.repository';
import { HttpException } from '@exceptions/http.exception';

@JsonController('/test')
@Service()
class TestController extends BaseController {
  constructor(
    protected candidateRepository: CandidateRepository,
    protected testRepository: TestRepository,
    protected assessmentRepository: AssessmentRepository,
    protected assessment_game_typeRepository: Assessment_game_typeRepository,
    protected candidates_assessmentsRepository: Candidates_assessmentsRepository,
    protected logical_questions_testsRepository: Logical_questions_testsRepository,
    protected memory_questions_testsRepository: Memory_questions_testsRepository,
  ) {
    super();
  }

  @Authorized()
  @UseBefore(CandidateMiddleware)
  @Get('/list')
  async getTests(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    const that = this;
    try {
      const assessment_game_types = await this.assessment_game_typeRepository.getAll({
        where: { assessment_id: req.assessment.id },
      });

      const tests = await Promise.all(assessment_game_types.map(test_filter));

      async function test_filter(test_type) {
        const test = await Test.findOne({
          where: {
            candidate_id: req.candidate.id,
            assessment_id: req.assessment.id,
            game_type_id: test_type.game_type_id,
          },
        });
        let gameType;
        let total_time;
        if (test_type.game_type_id == GameType.logical) {
          gameType = 'logical';
          total_time = 90;
        } else if (test_type.game_type_id == GameType.memory) {
          gameType = 'memory';
          total_time = 300;
        }
        if (test)
          return {
            test_type: gameType,
            test_time: test.total_time,
            resul: test.result,
            status: test.status,
          };
        else {
          return {
            test_type: gameType,
            test_time: total_time,
            result: 0,
            status: 'not start',
          };
        }
      }

      return this.setData(tests).setMessage('Success').responseSuccess(res);
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
  @Get('/:id')
  async getTest(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const candidate = req.candidate;
      const test = await this.testRepository.findByCondition({
        where: { id: req.params.id },
      });
      return this.setData(test).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setStack(error.stack)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Put('/archieve/:id')
  async archive(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const test = await this.testRepository.findByCondition({
        where: { id: req.params.id },
      });
      if (test) {
        this.testRepository.update({ status: 'achieved' }, { where: { id: req.params.id } });
        return this.setData(test).setMessage('Success').responseSuccess(res);
      } else {
        throw new HttpException(400,'Error Assessment');
      }
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setStack(error.stack)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Delete('/delete/:id')
  async delete(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const test = await this.testRepository.findByCondition({
        where: { id: id },
      });
      if (test) {
        await this.logical_questions_testsRepository.delete({
          where: { test_id: id },
        });
        await this.memory_questions_testsRepository.delete({
          where: { test_id: id },
        });
        await this.testRepository.deleteById(id);
        return this.setData(test).setMessage('Success').responseSuccess(res);
      } else {
        throw new HttpException(400,'not found');
      }
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setStack(error.stack)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }
}

export default TestController;
