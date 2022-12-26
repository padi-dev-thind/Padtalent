import { NextFunction, Response, Request } from 'express';
import CandidateRepository from '@repositories/candidate.repository';
import TestRepository from '@repositories/test.repository';
import { BaseController } from './base.controller';
import { Authorized, UseBefore, BadRequestError, CurrentUser, Body, Get, JsonController, Post, Req, Res, Delete, Put } from 'routing-controllers';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { Service } from 'typedi';
import { AuthRequest } from '@interfaces/response.interface';
import { CandidateMiddleware } from '@middlewares/candidate.middleware';
import GameType from '@enum/game.enum';



@JsonController('/test')
@Service()
class TestController extends BaseController {
  constructor(
    protected candidateRepository: CandidateRepository,
    protected testRepository: TestRepository
  )
  {
    super();
  }

  @Authorized()
  @UseBefore(CandidateMiddleware)
  @Get('/list')
  async getTests(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
        const candidate = req.candidate
        const tests_raws = await this.testRepository.getAll({where:{candidate_id: 1}})
        const tests =  await Promise.all(tests_raws.map(function(test){
            var gameType
            if (test.game_type_id == GameType.memory)
                gameType = "memory"
            else if (test.game_type_id == GameType.logical)
                gameType = "memory"
            return ({
                id: test.id,
                assessment_id: test.assessment_id,
                game_type: gameType,
                status: test.status,
                result: test.result,
                total_time: test.total_time,
                number_of_questions: test.number_of_questions
            })
        }))
        return this.setData( 
            tests
          )
            .setMessage('Success')
            .responseSuccess(res);
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(CandidateMiddleware)
  @Get('/:id')
  async getTest(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
        const candidate = req.candidate
        const test = await this.testRepository.findByCondition({where:{id: req.params.id}})
        return this.setData( 
            test
          )
            .setMessage('Success')
            .responseSuccess(res);
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res);
    }
  }

}

export default TestController

