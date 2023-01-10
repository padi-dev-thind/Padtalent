import Hr from '@models/entities/hrs';
import Candidate from '@models/entities/candidates';
import { IAccessToken, ICandidateAccessToken, IRefreshToken } from '@interfaces/token.interface';
import jwt from 'jsonwebtoken';
import { env } from '@env';

const createAccessToken = (Hr: Hr, isAdmin: boolean): string => {
  return jwt.sign(
    {
      id: Hr.id,
    },
    env.app.jwt_secret as jwt.Secret,
    {
      expiresIn: '7d',
    },
  );
};

const createCandidateAccessToken = (candidate: Candidate, assessemnt_id: string): string => {
  return jwt.sign(
    {
      candidate_id: candidate.id,
      assessment_id: assessemnt_id,
    },
    env.app.jwt_secret as jwt.Secret,
    {
      expiresIn: '7d', //last change 1h
    },
  );
};

const createRefreshToken = (Hr: Hr, isAdmin: boolean): string => {
  return jwt.sign(
    {
      id: Hr.id,
    },
    env.app.jwt_secret as jwt.Secret,
    {
      expiresIn: '1d',
    },
  );
};

const verifyToken = async (
  token: string,
): Promise<jwt.VerifyErrors | IAccessToken | IRefreshToken | ICandidateAccessToken> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, env.app.jwt_secret as jwt.Secret, (err, payload) => {
      if (err) return reject(err);
      resolve(payload as IAccessToken | IRefreshToken | ICandidateAccessToken);
    });
  });
};

export { createAccessToken, createRefreshToken, verifyToken, createCandidateAccessToken };
