import { NODE_ENV } from './common/config';

if (NODE_ENV === 'multi') {
  import('./cluster/cluster');
} else {
  import('./server/server');
}
