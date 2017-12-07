import CustomerActions from '../actions/customer-actions'
import Immutable      from 'immutable'
import ProductActions  from '../actions/product-actions' 
import ProposalActions from '../actions/proposal-actions' 
import UserActions      from '../actions/user-actions'
import _                from 'lodash'
import alt              from '../alt-application'
import cookie           from 'js-cookie'
import jwt_decode       from 'jwt-decode'
import SalesAgent       from '../components/SalesAgent'

class UserStore {
  constructor() {
    this.bindListeners({
      onSetUser: UserActions.setUser
    })
    this.logged_out = true
  }

  onSetUser = (obj) =>{
    if(obj !== null){
      let decoded_token = jwt_decode(obj)
      this.setState(decoded_token)
      this.logged_out = false
      let t = this
      SalesAgent.getSalesAgent(decoded_token.user).then((res) => {
        console.log(res)
        t.setState({email: res.email}) 
      })
      ProposalActions.getStatuses.defer()
      ProductActions.getProducts.defer()
      CustomerActions.getCustomers.defer()
      ProposalActions.getAll.defer()
      ProposalActions.getAddresses.defer()
    }else{
      this.setState(null)
      this.logged_out = true
    }
  }
}

module.exports = alt.createStore(UserStore, 'UserStore')
/*
  static config = {
    onSerialize: (data) => {
      // do something here
      // optional return of data to be used in snapshot
      // return mySnapshotData
    },
    onDeserialize: (data) => {
      this.token = data
      return data
    }
  }
  */
