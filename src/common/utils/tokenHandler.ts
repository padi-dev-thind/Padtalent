import Hr from '@models/entities/hrs';
import { IAccessToken, IRefreshToken } from '@interfaces/token.interface';
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
): Promise<jwt.VerifyErrors | IAccessToken | IRefreshToken> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, env.app.jwt_secret as jwt.Secret, (err, payload) => {
      if (err) return reject(err);
      resolve(payload as IAccessToken | IRefreshToken);
    });
  });
};

export { createAccessToken, createRefreshToken, verifyToken };