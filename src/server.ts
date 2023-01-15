import { createServer } from 'node:http';
import { PORT } from './common/config';
import { requestListener } from './handlers/request-listener';

// const server = createServer(requestListener);

// export const startServer = () => {
//   server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
// };
