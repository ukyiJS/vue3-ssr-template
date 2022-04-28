import { NextFunction, Request, Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { appConf } from '../utils/config';

const robots = readFileSync(join(process.cwd(), 'dist', 'robots.txt')).toString();

const cacheDuration = appConf.cacheControl.static.robots || null;

export default async (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl !== '/robots.txt') return next();
  if (req.method !== 'GET' && req.method !== 'HEAD') return res.status(req.method === 'OPTIONS' ? 200 : 405).set({ Allow: 'GET, HEAD, OPTIONS' }).end();

  if (cacheDuration) res.set({ 'Cache-Control': `max-age=${cacheDuration}, s-maxage=${cacheDuration}, public` });
  return res.type('text/plain').send(robots);
};
