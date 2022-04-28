import { join } from 'path';
import serveStatic from 'serve-static';
import { appConf } from '../utils/config';

const cacheDuration = appConf.cacheControl.static.asset || null;

export default serveStatic(join(process.cwd(), 'dist'), {
  index: false,
  setHeaders: res => {
    if (!cacheDuration) return res;

    return res.setHeader('cache-control', `max-age=${cacheDuration}, s-maxage=${cacheDuration}, public`);
  },
});
