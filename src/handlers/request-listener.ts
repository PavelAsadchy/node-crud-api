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
          const user = await userController.getById(id);
          createResponse(res, HTTP_STATUS.OK, user);
          break;
        case HTTP_METHOD[HTTP_METHOD.POST]:
          const body = await getReqBody(req);
          const updatedUser = await userController.update(id, body);
          createResponse(res, HTTP_STATUS.OK, updatedUser);
          break;
        case HTTP_METHOD[HTTP_METHOD.DELETE]:
          await userController.remove(id);
          createResponse(res, HTTP_STATUS.NO_CONTENT, `User with id ${id} deleted`);
          break;
      }
    } else {
      switch (method) {
        case HTTP_METHOD[HTTP_METHOD.GET]:
          const users = await userController.getAll();
          createResponse(res, HTTP_STATUS.OK, users);
          break;
        case HTTP_METHOD[HTTP_METHOD.POST]:
          const body = await getReqBody(req);
          const newUser = await userController.create(body);
          createResponse(res, HTTP_STATUS.CREATED, newUser);
          break;
        default:
          createResponse(res, HTTP_STATUS.NOT_FOUND, 'Route not found');
      }
    }
  } catch {
    createResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Server error occured');
  }
};
