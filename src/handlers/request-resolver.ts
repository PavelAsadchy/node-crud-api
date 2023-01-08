import { IncomingMessage } from 'node:http';
import { HTTP_METHOD, REQUEST_TYPE } from '../common/consts';

export const resolveRequest = ({ url, method }: IncomingMessage) => {
  const [_api, _users, id] = url?.split('/').filter(Boolean) || [];

  if (id) {
    switch (method) {
      case HTTP_METHOD[HTTP_METHOD.GET]:
        return REQUEST_TYPE.GET_USER_BY_ID;
      case HTTP_METHOD[HTTP_METHOD.POST]:
        return REQUEST_TYPE.UPDATE_USER;
      case HTTP_METHOD[HTTP_METHOD.DELETE]:
        return REQUEST_TYPE.DELETE_USER;
    }
  } else {
    switch (method) {
      case HTTP_METHOD[HTTP_METHOD.GET]:
        return REQUEST_TYPE.GET_ALL_USERS
      case HTTP_METHOD[HTTP_METHOD.POST]:
        return REQUEST_TYPE.CREATE_USER;
    }
  }
};
