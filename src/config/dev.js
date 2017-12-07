'use strict';

import baseConfig from './base'

let config = {
  appEnv:          'dev',
  root:            '',
  //api:             'http://192.168.220.120:6060',
  //api:   'http://localhost:60936',
  api:       'https://apps.telapexinc.com/SnapConnect-api-beta',
  place_key: 'AIzaSyDZxc4ecg5GajRfoLWiIJf_KZvtyk_99qE',
  tpxemail:  'mspiers@franklintelephone.com',
  ftcemail:  'mspiers@franklintelephone.com',
  dtcemail:  'mspiers@franklintelephone.com',
}

export default Object.freeze(Object.assign({}, baseConfig, config));
