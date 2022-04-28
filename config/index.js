const dotenv = require('dotenv');
const fs = require('fs');
const YAML = require('js-yaml');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV ?? 'development'}`) });

/** @type {Config}  */
let config;
const readConfig = () => {
  if (config) return config;

  config = YAML.load(fs.readFileSync(process.env.VUE_APP_CONFIG_FILE, 'utf8'));
  return config;
};

module.exports.appConf = Object.freeze(readConfig());
