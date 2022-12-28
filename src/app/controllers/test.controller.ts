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
import Logical_questions_testsRepository from '@repositories/logical_questions_tests.repository';
import Memory_questions_testsRepository from '@repositories/memory_questions_tests.repository';
import Memory_questionsRepository from '@repositories/memory_questions.repository';
import Logical_questionsRepository from '@repositories/logical_questions.repository';
import Logical_question from '@models/entities/logical_questions';
import Logical_question_test from '@models/entities/logical_questions_test';
import { toNumber } from '@lib/env/utils';
import Memory_question from '@models/entities/memory_questions';
import Memory_question_test from '@models/entities/memory_questions_test';




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
    protected memory_questionsRepository: Memory_questionsRepository,
    protected logical_questionsRepository: Logical_questionsRepository,
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

      const tests = await Promise.all(assessment_game_types.map(test_filter))

      async function test_filter(test_type){
        const test = await Test.findOne({where:{candidate_id: req.candidate.id,
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
          //logic creation:]
          let newtest

          // create logical test
          if (test_type.game_type_id == GameType.logical){
              newtest = await Test.create({
              game_type_id: test_type.game_type_id, 
              candidate_id: req.candidate.id,
              assessment_id: req.assessment.id,
              total_time: 90,
              remaining_time: 90,
              number_of_questions: 10,
              status: "not start"
              })

            const yes_data = await Logical_question.findAndCountAll({where:{answer:'yes'},offset:0,limit:100})
            const yes_questions_all = yes_data.rows
            const no_data = await Logical_question.findAndCountAll({where:{answer:'no'},offset:0,limit:100})
            const no_questions_all = no_data.rows
            //test 10 question in a test 5 yes and 5 no
            //add to the logical_questions_tests table
            
            const suffle_yes_questions = yes_questions_all.sort(()=>0.5 - Math.random())
            const random_yes_questions = suffle_yes_questions.slice(0,4)

            const suffle_no_questions = no_questions_all.sort(()=>0.5 - Math.random())
            const random_no_questions = suffle_no_questions.slice(0,4)

            //add to logical_question_test table
            let count = 1
            for(const question of random_yes_questions){
              await Logical_question_test.create({
                                            logical_question_id: question.id,
                                            test_id: newtest.id,
                                            question_number: count 
                                          })
              count++
            }

            for(const question of random_no_questions){
              await Logical_question_test.create({
                                            logical_question_id: question.id,
                                            test_id: newtest.id,
                                            question_number: count 
                                          })
            count++                             
            }
          } 

          // create memory test
          if (test_type.game_type_id == GameType.memory){
            newtest = await Test.create({
            game_type_id: test_type.game_type_id, 
            candidate_id: req.candidate.id,
            assessment_id: req.assessment.id,
            total_time: 100,
            remaining_time: 100,
            number_of_questions: 10,
            status: "not start"
            })
            for (let i = 1; i <= 10; i++){
              const question = await Memory_question.findOne({where:{level: i}})
              //add to Memory_question_test
              await Memory_question_test.create({
                                                  memory_question_id: question.id,
                                                  test_id: newtest.id,
                                                  question_number: i 
              })
            }
          }
          return({
              test_type: gameType,
              test_time: newtest.total_time,
              result: null,
              status: "not start"
          })
        }
      }

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

