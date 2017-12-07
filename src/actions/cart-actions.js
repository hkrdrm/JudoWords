var alt = require("../alt-application.js")

import cookie   from 'js-cookie'
import config   from 'config'
import request  from 'superagent'
import ProductStore from '../stores/product-store'
import _        from 'lodash'


class CartActions {
  constructor(){ }

  addItem = (product, quantity) => {
    console.log(product)
    return (  {product: product, quantity: quantity}  )
  }
  updateItem = (product, quantity) => {
    console.log(product)
    return (  {product: product, quantity: quantity}  )
  }
  addOtherItem = (product, quantity) => {
    console.log(product)
    return (  {product: product, quantity: quantity}  )
  }
  updateOtherItem = (product, quantity) => {
    console.log(product)
    return (  {product: product, quantity: quantity}  )
  }
  applyDiscount = (label, percentage) => {
    return {label: label, percentage: percentage}
  }
  removeItem = (id, description) => {
    return {id: id, description: description}
  }
  clearCart = () => {
    return true
  }

  toggleEditMode = (mode, id) => {
    return {mode, id}
    //return dispatch => {  dispatch({mode, id})  }
  }

  getProposalCart = (proposal) => {
    return  (dispatch) => {
      this.clearCart()
      let t = this
      return request
        .post( `${config.api}/snapconnect_api/snapconnectproposalitems/proposal_items` )
        .set('Accept', 'application/json')
        .set('X-Token', cookie.get('token'))
        .send( proposal )
        .end( function(err,res){
          dispatch({items: res.body, proposal: proposal})
        })
      }
  }

  getCartForEmail = (proposal) => {
    return  new Promise((resolve, reject) => {
      this.clearCart()
      let t = this
      return request
        .post( `${config.api}/snapconnect_api/snapconnectproposalitems/proposal_items` )
        .set('Accept', 'application/json')
        .set('X-Token', cookie.get('token'))
        .send( proposal )
        .end( function(err,res){
          if(res) {
            let item_ary = _.map(res.body, (item) => {
              let prod = _.clone(ProductStore.getState().prod_hash[item.product_id])
              return {
                product: prod,
                quantity: item.quantity 
              }
            })
            resolve({items: item_ary, proposal: proposal})
          } 
          else{
            reject('there was an error')
          }
        })
      })
  }

  setLock = (locked) => { return locked }

  saveCart = (cart_items, proposal_id) => {
    return (dispatch) => {
      let ary = _.map(cart_items, (item) => {
        return {
          proposal_id:       proposal_id,
          product_id:        item.product.id,
          quantity:          item.quantity,
          other_description: item.product.other_description,
          other_price:       item.product.other_price * .01,
          taxable:           item.product.taxable,
          deleted:           0
        }
      }) 
      request
        .post( `${config.api}/snapconnect_api/snapconnectproposalitems/delete_proposal_items` )
        .set('Accept', 'application/json')
        .set('X-Token', cookie.get('token'))
        .send( ary )
        .end( function(err,res){
          request
            .post( `${config.api}/snapconnect_api/snapconnectproposalitems/insert` )
            .set('Accept', 'application/json')
            .set('X-Token', cookie.get('token'))
            .send( ary )
            .end( function(err,res){
              //dispatch(res.text)
            })
          dispatch('ok')
        })
    }
  }

}

module.exports = alt.createActions(CartActions)
