import { User } from '../models/user.model';

interface MockedDB {
  Users: User[]
}

export const MOCKED_DATA: MockedDB = {
  Users: []
};
