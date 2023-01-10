import { NextFunction, Response, Request } from 'express';
import AssessmentRepository from '@repositories/assessment.repository';
import Assessment_game_typeRepository from '@repositories/assessment_game_type.repository';
import TestRepository from '@repositories/test.repository';
import Candidates_assessmentsRepository from '@repositories/candidates_assessments.repository';
import CandidateRepository from '@repositories/candidate.repository';
import Hr_game_typeRepository from '@repositories/hr_game_type.repository';
import { BaseController } from './base.controller';
import {
  Authorized,
  UseBefore,
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
import { AsssessmentDto } from '../../dtos/assessment.dto';
import { AuthRequest } from '@interfaces/response.interface';
import {sendEmail} from '@services/email.service'
import { HttpException } from '@exceptions/http.exception';

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
  ) {
    super();
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Post('/create')
  async create(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const assessDto: AsssessmentDto = req.body;
      const hr = req.hr;
      const { name, game_types, start_date, end_date } = assessDto;
      //check if hr hr has right to approach the game type
      for (const type of game_types) {
        const game_type = await this.hr_game_typeRepository.findByCondition({
          where: { hr_id: hr.id, game_type_id: type },
        });
        if (!game_type) {
          throw new HttpException(400,'Do not have the right to create game id: ' + type);
        }
      }
      //create new assessment
      const assessment = await this.assessmentRepository.createbyName(
        hr.id,
        name,
        start_date,
        end_date,
      );
      const link = 'Padtalent/test/' + assessment.id;
      await this.assessmentRepository.update({ link: link }, { where: { id: assessment.id } });
      //insert new assessment's game types
      for (const type of game_types) {
        await this.assessment_game_typeRepository.create({
          assessment_id: assessment.id,
          game_type_id: type,
        });
      }
      return this.setData({
        assessment: assessment,
        game_types: game_types,
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
  @UseBefore(AuthMiddleware)
  @Put('/update/:id')
  async update(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const assessDto: AsssessmentDto = req.body;
      const hr = req.hr;
      const { name, game_types, start_date, end_date } = assessDto;
      //check if hr hr has right to approach the game type
      for (const type of game_types) {
        const game_type = await this.hr_game_typeRepository.findByCondition({
          where: { hr_id: hr.id, game_type_id: type },
        });
        if (!game_type) {
          throw new HttpException(400,' have not the right to create game id ' + type);
        }
      }
      const updateAss = await this.assessmentRepository.update(
        { name: name, start_date: start_date, end_date: end_date },
        {
          where: {
            id: req.params.id,
          },
        },
      );
      if (updateAss == 0) {
        throw new HttpException(400,'not found this assessment');
      }
      //update game type
      for (const type of game_types) {
        await this.assessment_game_typeRepository.findOrCreateByCondition({
          where: { assessment_id: req.params.id, game_type_id: type },
        });
      }

      return this.setData('update successfully').setMessage('Success').responseSuccess(res);
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
      const hr = req.hr;
      const assessment = await this.assessmentRepository.findByCondition({
        where: {
          id: req.params.id,
          hr_id: hr.id,
        },
      });
      if (assessment) {
        await this.assessmentRepository.deleteById(req.params.id);
        return this.setData('Delete assessment successfully')
          .setMessage('Success')
          .responseSuccess(res);
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

  @UseBefore(AuthMiddleware)
  @Delete('/hard-delete/:id')
  async hardDelete(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const hr = req.hr;
      const id = req.params.id;
      const assessment = await this.assessmentRepository.findByCondition({
        where: {
          id: req.params.id,
          hr_id: hr.id,
        },
      });
      if (assessment) {
        await this.assessmentRepository.delete({
          where: { id: id },
          force: true,
        });
        return this.setData('Hard Delete assessment successfully')
          .setMessage('Success')
          .responseSuccess(res);
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

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Post('/restore/:id')
  async restore(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const hr = req.hr;
      await this.assessmentRepository.restore({
        where: { id: req.params.id, hr_id: hr.id },
      });
      return this.setData('restore assessment successfully')
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
  @UseBefore(AuthMiddleware)
  @Put('/archive/:id')
  async archive(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const hr = req.hr;
      const assessemnt = await this.assessmentRepository.findByCondition({
        where: {
          id: req.params.id,
          hr_id: hr.id,
        },
      });
      if (assessemnt) {
        this.assessmentRepository.update({ is_archived: true }, { where: { id: req.params.id } });
        return this.setData('Archive the assessments successfully')
          .setMessage('Success')
          .responseSuccess(res);
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
  @Get('/result/:id')
  async getResult(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const transporter = this;
      const id = req.params.id;
      const { count, rows } = await this.testRepository.getByCondition(
        { assessment_id: id },
        0,
        100,
      );

      const results = await Promise.all(
        rows.map(async function (test) {
          const candidate_id = test.candidate_id;
          const candidate = await transporter.candidateRepository.findById(candidate_id);
          const candidate_email = candidate.email;
          console.log(candidate.email);
          return {
            id: test.id,
            candidate_id: test.candidate_id,
            candidate_email: candidate_email,
            game_type_id: test.game_type_id,
            result: test.result,
          };
        }),
      );
      return this.setData(results).setCode(200).setMessage('Success').responseSuccess(res);
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
      const hr = req.hr;
      const assessments = await this.assessmentRepository.getAll({
        where: { hr_id: hr.id },
      });
      if (assessments) {
        return this.setData({
          assessments,
        })
          .setCode(200)
          .setMessage('Success')
          .responseSuccess(res);
      } else {
        throw new HttpException(400,'Error Assessment');
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
      const hr = req.hr;
      const assessment = await this.assessmentRepository.findByCondition({
        where: { id: req.params.id },
      });
      if (!assessment) {
        throw new HttpException(400,'not found assessment');
      }
      if (assessment.hr_id != hr.id) {
        throw new HttpException(400,'this hr don t have the right to access this link');
      }
      if (assessment) {
        return this.setData({
          link: assessment.link,
        })
          .setCode(200)
          .setMessage('Success')
          .responseSuccess(res);
      } else {
        throw new HttpException(400,'Error Assessment');
      }
    } catch (error) {
      return this.setCode(error?.status || 500)
        .setData({})
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Post('/:id/send-email')
  async inviteByEmail(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const email = req.body.email;
      await this.candidateRepository.create({ email: email });
      const assessment = await this.assessmentRepository.findByCondition({
        where: { id: req.params.id },
      });
      if (!assessment) {
        throw new HttpException(400,'not found assessment');
      }
      const option = {
        from: 'Paditech',
        to: email,
        subject: 'Test inviatation',
        text: 'You have got a invite to test',
        html: '<a href="https://' + assessment.link + '">click here to join the test</a>',
      }
      const mg = sendEmail(option, email)
      return this.setData(mg).setMessage('Success').responseSuccess(res);
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
  @Post('/:id/upload-list')
  async uploadCandidateList(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const list_candidate = []
      for(const email of data){
        const [candidate, created] = await this.candidateRepository.findOrCreateByCondition(
          {
            where: {email: email.email},
            defaults: {
              email: email.email
            }
          })
        list_candidate.push(candidate)
      }
      for (const candidate of list_candidate) {
        await this.candidates_assessmentsRepository.findOrCreateByCondition({
          where: {candidate_id: candidate.id},
          defaults: {
            candidate_id: candidate.id,
            assessment_id: req.params.id,
          }
        });
      }
      return this.setData(list_candidate).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setStack(error.stack)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }
}

export default AssessmentController;
