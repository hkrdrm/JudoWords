var alt = require("../alt-application.js")
var jsonp = require('superagent-jsonp')

import config   from 'config'
import request  from 'superagent'
import cookie   from 'js-cookie'
import _        from 'lodash'
import PhoneFormat from '../libs/phone-format'
import $        from 'jquery'

class CustomerActions {
  constructor(){ }

  getCustomers = () => {
    return (dispatch) => {
      request
        .get( `${config.api}/snapconnect_api/snapconnectcustomer/get_all` )
        .set('Accept', 'application/json')
        .set('X-Token', cookie.get('token'))
        .end( function(err,res){
          let ary = JSON.parse(res.body)
          dispatch( ary )
        })
    } // end dispatch
  }

  getCustomer = (id) => {
    return (dispatch) => {
      request
        .get( `${config.api}/snapconnect_api/snapconnectcustomer/get_by_id/${id}` )
        .set('Accept', 'application/json')
        .set('X-Token', cookie.get('token'))
        .end( function(err,res){
          console.log(res.body)
          dispatch( res.body )
        })
    } // end dispatch
  }

  getAddresses = (customer) => {
    return(dispatch) => {
      request
          .post( `${config.api}/snapconnect_api/snapconnectcustomer/get_customer_addresses` )
          .set('Accept', 'application/json')
          .set('X-Token', cookie.get('token'))
          .send( customer )
          .end( function(err,res){
            console.log(res)
            console.log(err)
            dispatch(res.body)
          })
    }
  }

  setNewCustomerId = (id) => {
    return id
  }

  createCustomer = (obj) => {
    obj.customer.phone = PhoneFormat.strip_formatting(obj.customer.phone)
    obj.customer.phone2 = PhoneFormat.strip_formatting(obj.customer.phone2)

    return(dispatch) => {
      request
          .post( `${config.api}/snapconnect_api/snapconnectcustomer/insert` )
          .set('Accept', 'application/json')
          .set('X-Token', cookie.get('token'))
          .send( obj.customer )
          .end( function(err,res){
            dispatch(res.body)
            obj.history.push(`/app/customer/profile/${res.body}`)
          })
    }
  }

  updateCustomer = (obj) => {
    obj.customer.phone = PhoneFormat.strip_formatting(obj.customer.phone)
    obj.customer.phone2 = PhoneFormat.strip_formatting(obj.customer.phone2)

    return(dispatch) => {
      request
          .post( `${config.api}/snapconnect_api/snapconnectcustomer/update` )
          .set('Accept', 'application/json')
          .set('X-Token', cookie.get('token'))
          .send( obj.customer )
          .end( function(err,res){
            dispatch(res.body)
            obj.history.push(`/app/customer/profile/${obj.customer.id}`)
          })
    }
  }

  phone_helper(phone){

  }

  addAddress = (address) => {
    return(dispatch) => {
      request
        .post( `${config.api}/snapconnect_api/snapconnectaddress/insert` )
          .set('Accept', 'application/json')
          .set('X-Token', cookie.get('token'))
          .send(address)
          .end( function(err,res){
            if(res.ok){
              dispatch(address)
            }
          })
    } 
  }

  clearCustomer = () => {
    return (dispatch) => {
      dispatch(null)
    }
  }

  removeAddress = (address) => {
    address.deleted = 1
    return(dispatch) => {
      request
        .post( `${config.api}/snapconnect_api/snapconnectaddress/update` )
          .set('Accept', 'application/json')
          .set('X-Token', cookie.get('token'))
          .send(address)
          .end( function(err,res){
            dispatch(address)
          })
    } 
  }


}

module.exports = alt.createActions(CustomerActions)
