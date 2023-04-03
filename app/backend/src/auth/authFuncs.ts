import { SignOptions, sign, verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const JWT_CONFIG : SignOptions = {
  algorithm: 'HS256',
  expiresIn: '24h',
};

export const createToken = (
  data: string,
) => sign({ data }, secret, JWT_CONFIG);

export const verifyToken = (token: string) => verify(token, secret);
