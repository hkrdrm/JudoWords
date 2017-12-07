var alt                 = require("../alt-application.js")

import cookie           from 'js-cookie'
import CustomerActions  from '../actions/customer-actions'
import UserStore        from './user-store'
import _                from 'lodash'

class CustomerStore {
  constructor() {
    this.bindListeners({
      onGetCustomers: CustomerActions.getCustomers,
      onGetAddresses: CustomerActions.getAddresses,
      onSetNewCustomerId: CustomerActions.setNewCustomerId,
      onCreateCustomer: CustomerActions.createCustomer,
      onGetCustomer: CustomerActions.getCustomer,
      onAddAddress: CustomerActions.addAddress,
      onClearCustomer: CustomerActions.clearCustomer,
      refreshCustomers: [CustomerActions.addAddress, CustomerActions.removeAddress, CustomerActions.updateCustomer]
    })
    this.customers = []
    this.customer_hash = {}
    this.new_customer_id = null
    this.current_customer = {addresses: []}
  }

  onClearCustomer = () => {
    this.current_customer = {addresses: []}
  }
  onGetGooglePlaceDetails = (place) =>{
    return place
  }
  onGetCustomer = (customer) => {
    this.current_customer = customer
  }
  onAddAddress = (address) => {
    this.current_customer.addresses.push(address)
  }
  onGetAddresses = (obj) =>{
    try{
      this.customer_hash[obj[0].customer_id].addresses = obj
    }
    catch(e){
    }
  }
  onGetCustomers = (obj) => {
    let ary = _.filter(obj, function(o){return o.sales_agent == UserStore.getState().user || o.sales_agent == UserStore.getState().mg_username})
    this.customers = ary
    this.customer_hash = _.keyBy(this.customers, 'id')
  }


  onSetNewCustomerId = (id) => {
    this.selected_customer = id
  }

  refreshCustomers = (obj) => {
    CustomerActions.getCustomers()
  }

  onCreateCustomer = (obj) => {
    this.new_customer_id = parseInt(obj, 10)
  }


}

module.exports = alt.createStore(CustomerStore, 'CustomerStore')
