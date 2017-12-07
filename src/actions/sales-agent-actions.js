var alt = require("../alt-application.js")

import config   from 'config'
import request  from 'superagent'
import cookie   from 'js-cookie'

class UserActions {
  constructor(){ }

  getSalesAgent = (username) => {
  	return (dispatch) => {
  	  request
        .get( `${config.api}/snapconnect_api/snapconnectuser/${username}` )
        .set('Accept', 'application/json')
        .set('X-Token', cookie.get('token'))
        .end( function(err,res){
          dispatch( JSON.parse(res.text) )
        })
    } // end dispatch
  }

}

module.exports = alt.createActions(UserActions)
