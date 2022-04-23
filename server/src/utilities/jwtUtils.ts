import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { PRIVATE_KEY } = process.env;

const jwtSign = (payload: {
  id: number | undefined,
  isAdmin: boolean | undefined,
  name:string | undefined,
}) => new Promise((resolve, reject) => {
  jwt.sign(payload, PRIVATE_KEY as Secret, (jwtError, token) => {
    if (!jwtError) {
      resolve(token);
    }
    reject(jwtError);
  });
});

const jwtVerify = (token: string) => new Promise((resolve, reject) => {
  jwt.verify(token, PRIVATE_KEY as Secret, (error, data) => {
    if (!error) {
      resolve(data);
    } else {
      reject(error);
    }
  });
});

export { jwtVerify, jwtSign };
