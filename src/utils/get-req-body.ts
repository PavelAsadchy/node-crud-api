import { IncomingMessage } from 'node:http';
import { User } from '../models/user.model';

export const getReqBody = (req: IncomingMessage): Promise<User> => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (chunk: string) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        console.log(body);
        resolve(body ? JSON.parse(body) : {});
      });
    } catch (error) {
      reject(error);
    }
  });
};