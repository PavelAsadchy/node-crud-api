import { IncomingMessage, ServerResponse } from 'node:http';
import { API_ENDPOINT, HTTP_METHOD, HTTP_STATUS } from '../common/consts';
import { createResponse } from '../utils/create-response';
import userController from '../resourses/user.controller';
import { getReqBody } from '../utils/get-req-body';
import { NOT_FOUND_ERROR } from '../utils/errors';

export const requestListener = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    const { url, method } = req;
    const [api, users, id] = url?.split('/').filter(Boolean) || [];

    if (`${api}/${users}` !== API_ENDPOINT) {
      createResponse(res, HTTP_STATUS.NOT_FOUND, 'Route not found');
      return;
    }

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
      }
    }
  } catch (err) {
    if (err instanceof NOT_FOUND_ERROR) {
      createResponse(res, HTTP_STATUS.NOT_FOUND, `Not Found. ${err.message}`);
    } else {
      createResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Server error occured');
    }
  }
};
