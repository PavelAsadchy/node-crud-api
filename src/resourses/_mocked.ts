import { User } from './user.model';

interface MockedDB {
  Users: User[]
}

export const MOCKED_DATA: MockedDB = {
  Users: []
};
