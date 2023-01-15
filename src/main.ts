import { createServer } from 'node:http';
import { PORT } from './common/config';
import { requestListener } from './handlers/request-listener';
// import { startServer } from './server';

const server = createServer(requestListener);
server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

export default server;