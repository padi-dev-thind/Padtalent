import { NextFunction, Response, Request } from 'express';
import HrRepository from '@repositories/hr.repository';
import Hr_game_typeRepository from '@repositories/hr_game_type.repository';
import { BaseController } from './base.controller';
import {
  Authorized,
  UseBefore,
  BadRequestError,
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
import { AuthRequest } from '@interfaces/response.interface';
import { HrDto } from 'dtos/hr.dto';
import { AdminMiddleware } from '@middlewares/admin.middleware';
import * as bcrypt from 'bcrypt';
import { env } from '@env';
import { toNumber } from '@lib/env/utils';
import AssessmentRepository from '@repositories/assessment.repository';
import Candidates_assessmentsRepository from '@repositories/candidates_assessments.repository';
import {sendEmail} from '@services/email.service'
import { HttpException } from '@exceptions/http.exception';
const { v4: uuidv4 } = require('uuid');

@JsonController('/hr')
@Service()
class HrController extends BaseController {
  constructor(
    protected hrRepository: HrRepository,
    protected hr_game_typeRepository: Hr_game_typeRepository,
    protected assessmentRepository: AssessmentRepository,
    protected candidates_assessmentsRepository: Candidates_assessmentsRepository,
    protected resetPasswordLinkTimeOut: any
  ) {
    super();
  }

  

  @Authorized()
  @UseBefore(AdminMiddleware)
  @Post('/create')
  async create(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const hr: HrDto = req.body;
      const {
        name,
        password,
        logo,
        role,
        company,
        company_industry,
        company_size,
        email,
        game_types,
      } = hr;
      //enscrypt password
      // const hashPassword = Crypto.AES.encrypt(
      //   password,
      //   env.auth.pass_sec
      // )

      const hashPassword = await bcrypt.hash(password, toNumber(env.auth.pass_sec));

      const newHr = await this.hrRepository.create({
        name: name,
        password: JSON.stringify(hashPassword),
        logo: logo,
        role: role,
        company: company,
        company_industry: company_industry,
        company_size: company_size,
        email: email,
      });

      for (const type of game_types) {
        await this.hr_game_typeRepository.create({
          hr_id: newHr.id,
          game_type_id: type,
        });
      }
      return this.setData({
        newHr: newHr,
        game_types: game_types,
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
  @UseBefore(AuthMiddleware)
  @Get('/game-types-list')
  async getGameTypes(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const hr_game_types = await this.hr_game_typeRepository.getAll({
        where: { hr_id: req.hr.id },
      });
      const game_type_ids = hr_game_types.map((type) => type.game_type_id);
      return this.setData({
        game_types: game_type_ids,
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
  @UseBefore(AdminMiddleware)
  @Get('/list')
  async getHrs(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const hrs = await this.hrRepository.getAll({ where: { is_admin: null } });
      let hrName;
      // if(hrs){
      //   hrName = hrs.map((hr)=>({
      //     name: hr.name
      //   }))
      // }
      return this.setData(hrs).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setData({})
        .setStack(error.stack)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Get('/profile')
  async getProfile(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    console.log('a');
    try {
      return this.setData(req.hr).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setData({})
        .setStack(error.stack)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AdminMiddleware)
  @Delete('/delete/:id')
  async delete(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const hr = await this.hrRepository.findByCondition({ where: { id: id } });
      if (hr) {
        const assessemnt = await this.assessmentRepository.findByCondition({
          where: { hr_id: id },
        });
        if (assessemnt)
          await this.candidates_assessmentsRepository.delete({
            where: { assessment_id: id },
          });
        await this.assessmentRepository.delete({ where: { hr_id: id } });
        await this.hr_game_typeRepository.delete({ where: { hr_id: id } });
        await this.hrRepository.deleteById(id);
        return this.setData('delete successfully').setMessage('Success').responseSuccess(res);
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
  @UseBefore(AdminMiddleware)
  @Delete('/hard-delete/:id')
  async hardDelete(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const hr = await this.hrRepository.findByCondition({ where: { id: id } });
      if (hr) {
        if (hr.is_admin == true) {
          throw new HttpException(400,id + ' is admin ');
        }
        await this.hrRepository.delete({ where: { id: id }, force: true });
        return this.setData('Hard Delete successfully').setMessage('Success').responseSuccess(res);
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

  @Post('/send-email-reset-password')
  async sendEmailResetPassWord(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const email = req.body.email;
      const hr = await this.hrRepository.findByCondition({
        where: { email: email },
      });
      const reset_pass_link = 'Paditech/reset-password/' + uuidv4();
      if (hr) {
        await this.hrRepository.update(
          { reset_pass_link: reset_pass_link },
          { where: { email: email } },
        );
        this.resetPasswordLinkTimeOut = setTimeout(async () => {
          await this.hrRepository.update({ reset_pass_link: null }, { where: { email: email } });
          console.log('time out');
        }, 120000);
      } else {
        throw new HttpException(400,'not found email');
      }
      const option = {
        from: 'Paditech',
        to: email,
        subject: 'Reset your password',
        text: '',
        html: '<a href="https://' + reset_pass_link + '">click here to reset your password</a>',
      }
      sendEmail(option, email)
      
      return this.setData(reset_pass_link).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setStack(error.stack)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }

  @Post('/:id/check-link-reset-password-validation')
  async checkEmail(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const link = 'Paditech/reset-password/' + req.params.id;
      const hr = await this.hrRepository.findByCondition({
        where: { reset_pass_link: link },
      });
      if (!hr) {
        throw new HttpException(400,'link is not available');
      }

      return this.setData('link is available').setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setStack(error.stack)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }

  @Post('/:id/reset-password')
  async resetPass(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const newPassword = req.body.newPassword;
      const newhashPassWord = await bcrypt.hash(newPassword, toNumber(env.auth.pass_sec));
      const link = 'Paditech/reset-password/' + req.params.id;
      const hr = await this.hrRepository.findByCondition({
        where: { reset_pass_link: link },
      });
      if (!hr) {
        throw new HttpException(400,'link is not available');
      }
      {
        clearTimeout(this.resetPasswordLinkTimeOut);
        await this.hrRepository.update(
          {
            password: JSON.stringify(newhashPassWord),
            reset_pass_link: null,
          },
          {
            where: {
              reset_pass_link: link,
            },
          },
        );
      }
      return this.setData('reset pass successfully').setMessage('Success').responseSuccess(res);
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
  @Put('/change-password')
  async changePass(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const currentPassword = req.body.currentPassword;
      const newPassword = req.body.newPassword;
      const newHashPassWord = await bcrypt.hash(newPassword, toNumber(env.auth.pass_sec));
      const hr = req.hr;
      if (await bcrypt.compare(currentPassword, JSON.parse(hr.password))) {
        await this.hrRepository.update(
          { password: JSON.stringify(newHashPassWord) },
          { where: { id: hr.id } },
        );
      } else {
        throw new HttpException(400,'not matched');
      }
      return this.setData('change pass successfully').setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setStack(error.stack)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res);
    }
  }
}

export default HrController;
