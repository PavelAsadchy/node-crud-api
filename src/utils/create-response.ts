import { ServerResponse } from 'node:http';

export const createResponse = (
  res: ServerResponse,
  statusCode: number,
  payload?: any
) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
  });
  
  if (typeof payload === 'string') {
    res.end(JSON.stringify({ message: payload }));
  } else {
    res.end(JSON.stringify(payload));
  }
};
