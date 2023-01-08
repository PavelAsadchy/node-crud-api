import { IncomingMessage, ServerResponse } from 'node:http';
import { HTTP_METHOD, HTTP_STATUS, REQUEST_TYPE } from '../common/consts';
import { createResponse } from '../utils/create-response';
import { resolveRequest } from './request-resolver';
import userController from '../models/user.controller';
import { getReqBody } from '../utils/get-req-body';

export const requestListener = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    const { url, method } = req;
    const [_api, _users, id] = url?.split('/').filter(Boolean) || [];

    if (id) {
      switch (method) {
        case HTTP_METHOD[HTTP_METHOD.GET]:
          await userController.getById(id);
          break;
        case HTTP_METHOD[HTTP_METHOD.POST]:
          const body = await getReqBody(req);
          await userController.update(id, body);
          break;
        case HTTP_METHOD[HTTP_METHOD.DELETE]:
          await userController.remove(id);
          break;
      }
    } else {
      switch (method) {
        case HTTP_METHOD[HTTP_METHOD.GET]:
          await userController.getAll();
          break;
        case HTTP_METHOD[HTTP_METHOD.POST]:
          const body = await getReqBody(req);
          await userController.create(body);
          break;
        default:
          createResponse(res, HTTP_STATUS.NOT_FOUND, 'Route not found');
      }
    }
  } catch {
    createResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Server error occured');
  }
};
