import { AuthRequest } from '@interfaces/response.interface';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/http.exception';
import { IAccessToken } from '@interfaces/token.interface';
import { verifyToken } from '@utils/tokenHandler';
import Candidate from '@models/entities/candidates';

@Service()
export class CandidatedateMiddleware implements ExpressMiddlewareInterface {
  // interface implementation is optional
  async use(request: AuthRequest, response: any, next?: (err?: any) => any): Promise<any> {
    const bearer = request.headers.authorization;
    if (!bearer || !bearer.startsWith('Bearer ')) {
      return next(new HttpException(401, 'Unauthorised-Candidate'));
    }

    const accessToken = bearer.split('Bearer ')[1].trim();
    try {
      const payload = (await verifyToken(accessToken)) as IAccessToken;
      const candidate = await Candidate.findOne({
        where: {
          id: payload.id,
        },
        raw: true,
      });

      if (!candidate) {
        return next(new HttpException(401, 'Unauthorised-Candidate'));
      }

      request.candidate = candidate;

      return next();
    } catch (error) {
      return next(new HttpException(401, 'Unauthorised-Candidate'));
    }
  }
}
