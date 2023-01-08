import usersRepo from './user.repository';
import { User } from './user.model';

const getAll = (): User[] => usersRepo.getAll();
const getById = (id: string): User => usersRepo.getById(id);
const create = (newUser: User): User => usersRepo.save(newUser);
const update = (id: string, userUpdates: User): User => usersRepo.update(id, userUpdates);
const remove = (id: string): void => usersRepo.remove(id);

export default { getAll, getById, create, update, remove };