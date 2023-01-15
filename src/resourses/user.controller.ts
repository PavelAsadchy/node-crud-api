import usersRepo from './user.repository';
import { User } from './user.model';

const getAll = (): Promise<User[]> => usersRepo.getAll();
const getById = (id: string): Promise<User> => usersRepo.getById(id);
const create = (newUser: User): Promise<User> => usersRepo.save(newUser);
const update = (id: string, userUpdates: User): Promise<User> => usersRepo.update(id, userUpdates);
const remove = (id: string): void => usersRepo.remove(id);

export default { getAll, getById, create, update, remove };