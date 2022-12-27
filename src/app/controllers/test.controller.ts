import { NextFunction, Response, Request } from 'express';
import CandidateRepository from '@repositories/candidate.repository';
import TestRepository from '@repositories/test.repository';
import AssessmentRepository from '@repositories/assessment.repository';
import { BaseController } from './base.controller';
import { Authorized, UseBefore, BadRequestError, CurrentUser, Body, Get, JsonController, Post, Req, Res, Delete, Put } from 'routing-controllers';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { Service } from 'typedi';
import { AuthRequest } from '@interfaces/response.interface';
import { CandidateMiddleware } from '@middlewares/candidate.middleware';
import GameType from '@enum/game.enum';
import Assessment_game_typeRepository from '@repositories/assessment_game_type.repository';
import Candidates_assessmentsRepository from '@repositories/candidates_assessments.repository';
import Test from '@models/entities/tests';




@JsonController('/test')
@Service()
class TestController extends BaseController {
  constructor(
    protected candidateRepository: CandidateRepository,
    protected testRepository: TestRepository,
    protected assessmentRepository: AssessmentRepository,
    protected assessment_game_typeRepository: Assessment_game_typeRepository,
    protected candidates_assessmentsRepository: Candidates_assessmentsRepository
  )
  {
    super();
  }

  @Authorized()
  @UseBefore(CandidateMiddleware)
  @Get('/list') //create when a test is not exist
  async getTests(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const assessment_game_types = await this.assessment_game_typeRepository
        .getAll({where:{assessment_id: req.assessment.id}})

      const tests = await Promise.all(assessment_game_types.map(async function(test_type){
        const test = await Test.findOne({where:{candidate_id: 1,
                                                assessment_id: req.assessment.id,
                                                game_type_id: GameType.logical
                                        }})
        let gameType
        if(test_type.game_type_id == GameType.logical){
          gameType = "logical"
        } 
        else if(test_type.game_type_id == GameType.memory){
          gameType = "memory"
        }
        if (test)
            return ({
              test_type: gameType,
              test_time: test.total_time,
              resul: test.result,
              status: test.status
            })
        else {
          // if test is not created => create here 
          //logic creation:
          
          return({
              test_type: gameType,
              test_time: test.total_time,
              resul: null,
              status: "not start"
          })
        }
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

