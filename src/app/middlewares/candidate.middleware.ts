import { AuthRequest } from '@interfaces/response.interface';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/http.exception';
import {
  IAccessToken,
  ICandidateAccessToken,
} from '@interfaces/token.interface';
import { verifyToken } from '@utils/tokenHandler';
import Candidate from '@models/entities/candidates';
import Assessment from '@models/entities/assessments';

@Service()
export class CandidateMiddleware implements ExpressMiddlewareInterface {
  // interface implementation is optional
  async use(
    request: AuthRequest,
    response: any,
    next?: (err?: any) => any,
  ): Promise<any> {
    const bearer = request.headers.authorization;
    if (!bearer || !bearer.startsWith('Bearer ')) {
      return next(new HttpException(401, 'Unauthorised-Candidate'));
    }

    const accessToken = bearer.split('Bearer ')[1].trim();
    try {
      const payload = (await verifyToken(accessToken)) as ICandidateAccessToken;
      const candidate = await Candidate.findOne({
        where: {
          id: payload.candidate_id,
        },
        raw: true,
      });
      const assessemnt = await Assessment.findOne({
        where: {
          id: payload.assessment_id,
        },
        raw: true,
      });
      if (!candidate) {
        return next(new HttpException(401, 'Unauthorised-Candidate'));
      }

      if (!assessemnt) {
        return next(new HttpException(401, 'Assessments-errors'));
      }

      if (assessemnt.is_archived) {
        return next(new HttpException(401, 'Assessments has been archived'));
      }

      request.candidate = candidate;
      request.assessment = assessemnt;

      return next();
    } catch (error) {
      return next(new HttpException(401, 'Unauthorised-Candidate'));
    }
  }
}
