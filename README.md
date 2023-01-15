# Simple-CRUD-API

Simple CRUD API using in-memory database underneath (Node.js)

## To run

```bash
git clone {repository URL}
cd node-crud-api
npm install
```

Use following commands:

`npm run start:dev` - to run application in development mode

`npm run start:prod` - to run application in production mode

`npm run start:multi` - to run application with horizontal scaling and load balancer

`npm run test` - to test application


## REST service docs

### Endpoints:

- `User` (`api/users` route)

  - **GET** `api/users` - get all users
  - **GET** `api/users/:userId` - get the user by id (ex. “/users/123”, where id should be a valid uuid)
  - **POST** ` api/users` - create new user
  - **PUT** ` api/users/:userId` - update user
  - **DELETE** ` api/users/:userId` - delete user
