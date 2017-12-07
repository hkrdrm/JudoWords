var alt = require('../alt-application.js')

import config   from 'config'
import request  from 'superagent'
import cookie   from 'js-cookie'

class StatusActions {
  constructor(){ }

  getStatuses = () =>{
    return (dispatch) => {
      request
        .get( `${config.api}/snapconnect_api/snapconnectproposalstatuses/get_all` )
        .set('Accept', 'application/json')
        .set('X-Token', cookie.get('token'))
        .end( function(err,res){
          dispatch( res.body )
        })
    } //
  }
}

module.exports = alt.createActions(StatusActions)
