'use strict';

import baseConfig from './base';

let config = {
  env:       'beta',  // don't remove the appEnv property here
  root:      '/SnapConnect-beta',
  api:       'https://apps.telapexinc.com/SnapConnect-api-beta',
  place_key: 'AIzaSyDZxc4ecg5GajRfoLWiIJf_KZvtyk_99qE',
  tpxemail:  'mspiers@franklintelephone.com',
  ftcemail:  'mspiers@franklintelephone.com',
  dtcemail:  'mspiers@franklintelephone.com',
};

export default Object.freeze(Object.assign(baseConfig, config));
