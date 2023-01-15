import supertest from 'supertest';
import { afterEach } from '@jest/globals';
import { validate as uuidValidate } from 'uuid';
import server from '../src/server/server';
import { API_ENDPOINT, HTTP_STATUS } from '../src/common/consts';
import { User } from '../src/resourses/user.model';

const newUser: User = {
  username: 'Test_name',
  age: 33,
  hobbies: ['hobby_1', 'hobby_2', 'hobby_3']
};

afterEach(async () => server.close());

describe('Get all records', () => {
  it('should return empty array', async () => {
    const res = await supertest(server).get(`/${API_ENDPOINT}`).send();
    expect(res.body).toEqual([]);
  });

  it('should return status OK', async () => {
    const res = await supertest(server).get(`/${API_ENDPOINT}`).send();
    expect(res.statusCode).toBe(HTTP_STATUS.OK);
  });
});

describe('Post a new user', () => {
  it('should create a new get user, response contains newly created record with status CREATED', async () => {
    const res = await supertest(server).post(`/${API_ENDPOINT}`).send(newUser);
    const { id } = res.body;
    newUser.id = id;
    expect(res.body).toStrictEqual({ ...newUser });
    expect(res.statusCode).toBe(HTTP_STATUS.CREATED);
    expect(uuidValidate(res.body.id)).toBeTruthy;
  });
});

describe('Get user by id', () => {
  it('should fetch user, response contains record object with status OK', async () => {
    const res = await supertest(server).get(`/${API_ENDPOINT}/${newUser.id}`).send();
    expect(res.body).toStrictEqual({ ...newUser });
    expect(res.statusCode).toEqual(HTTP_STATUS.OK);
  });
});

describe('Update user', () => {
  it('should update user, response contains record object with status OK', async () => {
    const updatedUser = {
      username: 'Updated_name',
      age: 13,
      hobbies: ['updated_hobby'],
    };

    const createRes = await supertest(server).post(`/${API_ENDPOINT}`).send(newUser);
    const { id } = createRes.body;

    const updateRes = await supertest(server).post(`/${API_ENDPOINT}/${id}`).send(updatedUser);
    expect(updateRes.body).toStrictEqual({ ...updatedUser, id });
    expect(updateRes.statusCode).toEqual(HTTP_STATUS.OK);
  });
});

describe('Delete user', () => {
  it('should delete user, response contains record object with status NO CONTENT', async () => {
    const createRes = await supertest(server).post(`/${API_ENDPOINT}`).send(newUser);
    const { id } = createRes.body;

    const deleteRes = await supertest(server).delete(`/${API_ENDPOINT}/${id}`).send();
    expect(deleteRes.statusCode).toEqual(HTTP_STATUS.NO_CONTENT);
  });
});
