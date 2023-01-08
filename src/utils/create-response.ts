import { ServerResponse } from 'node:http';

export const createResponse = (
  res: ServerResponse,
  statusCode: number,
  message?: string
) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
  });
  
  if (typeof message === 'string') {
    res.end(JSON.stringify({ message }));
  } else {
    res.end(JSON.stringify(message));
  }
};
