import 'dotenv/config';
import { PORT } from '../common/config';
import cluster from 'node:cluster';
import { cpus } from 'node:os';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as http from 'node:http';
import { RequestOptions } from 'node:https';
import { User } from '../resourses/user.model';
import { createResponse } from '../utils/create-response';
import { HTTP_STATUS } from '../common/consts';
import { MOCKED_DATA } from '../resourses/_mocked';

const filename = fileURLToPath(import.meta.url);
const dirName = dirname(filename);
const numCPUs = cpus().length;

console.log(`Primary process pid=${process.pid}`);
cluster.setupPrimary({
  exec: dirName + '/server',
});
let cur = 0;

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({ workerPort: Number(PORT) + i + 1 });
  }
  const servers = Object.values(cluster.workers || {}).map(
    (_worker, index) => `http://localhost:${Number(PORT) + index + 1}`
  );
  http
    .createServer(async (req, res) => {
      console.log(
        `Primary server listening to request by primary process pid ${process.pid}
          )}`
      );

      const urlPath = new URL(`${servers[cur]}${String(req.url)}`).href;
      const options: RequestOptions = {
        method: req.method,
        headers: req.headers,
      };

      const requestForWorker = http
        .request(urlPath, options, (resp) => {
          const respStatusCose = resp.statusCode as number;
          res.writeHead(respStatusCose, {
            'Content-Type': 'application/json',
          });
          resp.pipe(res);
        })
        .on('error', (_error) => {
          createResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Server error occured');
        });

      req.pipe(requestForWorker);
      cur = (cur + 1) % servers.length;
    })
    .listen(PORT, () => {
      console.log(`Primary ${process.pid} started on ${PORT}`);
    });

  cluster.on('exit', (worker, code, _signal) => {
    console.log(`worker ${String(worker.process.pid)} died`);
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log('Starting a new worker...');
      cluster.fork({ port: 4000 + worker.id });
    }
  });
} else {
  import('../server/server');
}

cluster.on('listening', (worker, address) => {
  console.log(
    `Worker ${worker.id} (pid=${String(
      worker.process.pid
    )}) is now connected to http://localhost:${address.port}`
  );
});

cluster.on('message', (_worker, message: { users: User[] }) => {
  // modifyUsers(message.users);
  MOCKED_DATA.Users = message.users;
  const workers = Object.values(cluster.workers || {});
  Object.values(workers).forEach((workerr) => {
    workerr?.send(message);
  });
});