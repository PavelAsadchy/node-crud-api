import { v4 as uuidv4 } from 'uuid';
export class User {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];

  constructor({
    id = uuidv4(),
    username = 'New User',
    age = 0,
    hobbies = ['']
  } = {}) {
    this.id = id;
    this.username = username;
    this.age = age;
    this.hobbies = hobbies
  }
}

// export type CreatedUser = Required<Pick<User, 'username' | 'age' | 'hobbies'>>;
