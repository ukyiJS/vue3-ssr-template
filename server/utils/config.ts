import dotenv from 'dotenv';
import * as fs from 'fs';
import YAML from 'js-yaml';
import path from 'path';
import { Config } from '@/types/ssr';

dotenv.config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV ?? 'development'}`) });

let config: Config;
const readConfig = () => {
  if (config) return config;

  config = YAML.load(fs.readFileSync(process.env.VUE_APP_CONFIG_FILE as string, 'utf8')) as Config;
  return config;
};

export const appConf = Object.freeze(readConfig());
