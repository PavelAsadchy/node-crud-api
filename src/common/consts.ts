export const API_ENDPOINT = 'api/users';

export enum HTTP_METHOD {
  GET,
  POST,
  PUT,
  DELETE
}

export enum REQUEST_TYPE {
  GET_ALL_USERS = 'getAllUsers',
  GET_USER_BY_ID = 'getIserById',
  CREATE_USER = 'createUser',
  UPDATE_USER = 'updateUser',
  DELETE_USER = 'deleteUser'
}

export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
