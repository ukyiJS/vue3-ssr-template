const fse = require('fs-extra');

const postBuild = () => {
  const dest = 'dist';

  fse.copySync('public/favicon.ico', `${dest}/favicon.ico`, null);
  console.info(`public favicon.ico copied into ${dest}`);

  fse.copySync('public/robots.txt', `${dest}/robots.txt`, null);
  console.info(`public robots.txt copied into ${dest}`);
};

postBuild();
