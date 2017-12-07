var alt = require("../alt-application.js")

import config   from 'config'
import request  from 'superagent'
import cookie   from 'js-cookie'

class ProductActions {
  constructor(){ }

  getProducts = () => {
  	return (dispatch) => {
  	  request
        .get( `${config.api}/snapconnect_api/snapconnectproducts/get` )
        .set('Accept', 'application/json')
        .set('X-Token', cookie.get('token'))
        .end( function(err,res){
          dispatch( JSON.parse(res.text) )
        })
    } // end dispatch
  }

  newProposal = () =>{
    return null
  }

  setSelected = (id) => {
    return id
  }

}

module.exports = alt.createActions(ProductActions)