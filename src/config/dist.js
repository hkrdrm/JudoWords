'use strict';

import baseConfig from './base';

let config = {
  env:       'dist',
  root:      '/SnapConnect',
  api:       'https://apps.telapexinc.com/SnapConnect-api-prod',
  place_key: 'AIzaSyDZxc4ecg5GajRfoLWiIJf_KZvtyk_99qE',
  tpxemail:  'SRush@telapexinc.com,KYoung@telapexinc.com',
  ftcemail:  'JSpring@franklintelephone.com',
  dtcemail:  'SLee@deltaphone.net',
};

export default Object.freeze(Object.assign({}, baseConfig, config));
/*
*/
