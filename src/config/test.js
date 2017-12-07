'use strict';

import baseConfig from './base';

let config = {
  env: 'beta'  // don't remove the appEnv property here
};

export default Object.freeze(Object.assign(baseConfig, config));
