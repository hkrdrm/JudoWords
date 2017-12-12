'use strict';

import baseConfig from './base'

let config = {
  appEnv:          'dev',
  root:            ''
}

export default Object.freeze(Object.assign({}, baseConfig, config));
