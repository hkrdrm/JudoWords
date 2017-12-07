var alt = require("../alt-application.js")

import config   from 'config'
import request  from 'superagent'
import cookie   from 'js-cookie'

class UserActions {
  constructor(){ }

  setUser = (token) => {
    return token
  }

}

module.exports = alt.createActions(UserActions)