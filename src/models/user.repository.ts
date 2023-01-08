import { User } from "./user.model";
import { MOCKED_DATA } from '../resourses/_mocked';

const TABLE = 'Users';

const getAll = async (): Promise<User[]> => MOCKED_DATA['Users'];

const getById = async (id: string): Promise<User> => {
  const entity = await MOCKED_DATA['Users'].find((user: User) => user.id === id);
  if (!entity) throw new Error(`Entity with ${id} not found`);

  return entity;
};

const save = async (newUserParams: User): Promise<User> => {
  const newUser = new User(newUserParams);
  MOCKED_DATA['Users'].push(newUser);

  return newUser;
};

const update = async (id: string, userUpdates: User): Promise<User> => {
  const userToUpdate = await getById(id);
  if (userToUpdate) MOCKED_DATA['Users'][MOCKED_DATA['Users'].indexOf(userToUpdate)] = {...userToUpdate, ...userUpdates};

  return getById(id);
};

const remove = (id: string) => {
  const index = MOCKED_DATA['Users'].findIndex((user: User) => user.id === id);
  if (index === -1) throw new Error(`Entity with ${id} not found`);

  MOCKED_DATA['Users'].splice(index, 1);
};

export default { getAll, getById, save, update, remove };