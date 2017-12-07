var alt = require("../alt-application.js")

import CartActions    from '../actions/cart-actions'
import config         from 'config'
import request        from 'superagent'
import cookie         from 'js-cookie'
import moment         from 'moment'
//import ProposalStore  from '../stores/proposal-store'

class ProposalActions {
  constructor(){ }

  getAll = () => {
    return (dispatch) => {
      request
        .get( `${config.api}/snapconnect_api/snapconnectproposals/get_all` )
        .set('Accept', 'application/json')
        .set('X-Token', cookie.get('token'))
        .end( function(err,res){
          dispatch( res.body )
        })
    }
  }

  sendCommissionEmail = (email) => {
    return (dispatch) => {
      request
        .post( `${config.api}/snapconnect_api/snapconnectemail/send_mail` )
        .set('Accept', 'application/json')
        .set('X-Token', cookie.get('token'))
        .send( email )
        .end( function(err,res){
          console.log(err)
          console.log(res)
          dispatch()
        })
    }
  }

  setChecked = (obj) => {
    return (dispatch) => {dispatch(obj)}
  }

  filterByChecked = () => {
    return (dispatch) => {dispatch()}
  }

  getBySalesAgent = (corp_username, mg_username) => {
    return (dispatch) => {
      request
        .get( `${config.api}/snapconnect_api/snapconnectproposals/get_all` )
        .set('Accept', 'application/json')
        .set('X-Token', cookie.get('token'))
        .end( function(err,res){
          dispatch( _.filter(res.body, (p) => { return p.sales_agent === corp_username || p.sales_agent === mg_username}) )
        })
    }
  }

  getProposal = (id) => {
		console.log('ongetproposal')
		console.log(id)
    return (dispatch) => {
		  console.log('ongetproposal')
      dispatch(id)
    }
    /*
    return (dispatch) => {
      request
        .get( `${config.api}/snapconnect_api/snapconnectproposals/get/${id}` )
        .set('Accept', 'application/json')
        .set('X-Token', cookie.get('token'))
        .end( function(err,res){
          dispatch( res.body )
        })
    } // end dispatch
    */
  }

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

  getAddresses = () =>{
    return (dispatch) => {
      request
        .get( `${config.api}/snapconnect_api/snapconnectaddress/get_all` )
        .set('Accept', 'application/json')
        .set('X-Token', cookie.get('token'))
        .end( function(err,res){
          dispatch( res.body )
        })
    } //
  }


  newProposal = (obj) => {
    return (dispatch) => {dispatch(obj)}
  }
  createProposal = (proposal, items) => {
    let p = proposal
    return(dispatch) => {
      request
        .post( `${config.api}/snapconnect_api/snapconnectproposals/insert` )
        .set('Accept', 'application/json')
        .set('X-Token', cookie.get('token'))
        .send( proposal )
        .end( function(err,res){
          let p = proposal
          p.id = res.text
          dispatch({proposal: p, items: items})
        })
    }
  }
  updateProposal = (proposal, items) => {
    let p = proposal
    let t = this
    return(dispatch) => {
      request
        .post( `${config.api}/snapconnect_api/snapconnectproposals/update` )
        .set('Accept', 'application/json')
        .set('X-Token', cookie.get('token'))
        .send( proposal )
        .end( function(err,res){
          if (err || !res.ok) {
            console.log(err)
          } else {
            dispatch({proposal: proposal, items: items})
          }
        })
    }
  }
  setCustomer = (customer) => {
    return customer
  }
  clearCustomer = () => {
    return (dispatch) => {
      dispatch(null)
    }
  }
  setField = (hash) => {
    return hash
  }
}

module.exports = alt.createActions(ProposalActions)
