import CustomerActions from '../actions/customer-actions'
import Immutable       from 'immutable'
import ProductActions  from '../actions/product-actions' 
import ProposalActions from '../actions/proposal-actions' 
import UserActions     from '../actions/user-actions'
import _               from 'lodash'
import alt             from '../alt-application'
import cookie          from 'js-cookie'
import jwt_decode      from 'jwt-decode'

class SalesAgentStore {
  constructor() {
    this.bindListeners({
      onGetSalesAgent: UserActions.setUser
    })
  }

  onGetSalesAgent = (obj) =>{
    if(obj !== null){
      this.setState(JSON.parse(obj))
    }else{
      this.setState(null)
    }
  }
}

module.exports = alt.createStore(UserStore, 'SalesAgentStore')
