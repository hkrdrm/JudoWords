var alt                 = require("../alt-application.js")

import CartActions   from '../actions/cart-actions'
import ProductStore  from '../stores/product-store'
import ProposalStore from '../stores/proposal-store'
import Cookie        from 'js-cookie'
import _             from 'lodash'

class CartStore {
  constructor() {
    this.on('init', ::this.bootstrap)

    this.bindListeners({
      onAddItem: CartActions.addItem,
      onUpdateItem: CartActions.updateItem,
      onAddOtherItem: CartActions.addOtherItem,
      onUpdateOtherItem: CartActions.updateOtherItem,
      onGetProposalCart: CartActions.getProposalCart,
      onApplyDiscount: CartActions.applyDiscount,
      onRemoveItem: CartActions.removeItem,
      onClearCart: CartActions.clearCart,
      onToggleEditMode: CartActions.toggleEditMode,
      onSetLock: CartActions.setLock
    })
  }

  bootstrap(){
    this.discount_amount = 0
		this.discount_label = null
    this.commissions = 0
    this.items = []
    this.total_items = 0
    this.subtotal = 0
    this.taxable_subtotal = 0
    this.nontaxable_subtotal = 0
    this.sales_tax = 0
    this.tax_percentage = .07
    this.total = 0
    this.locked = true
    this.monthly_recurring_total = 0
    this.discount = ProposalStore.getState().current_proposal.discount
    let discount = ProposalStore.getState().current_proposal.discount
    this.discount_label = `${discount}% Discount`
    this.edit_mode = true
    this.edit_mode_id = null
  }

  onAddItem = (item) => {
    let c_item = _.find(  this.items, (i) => { return item.product.id == i.product.id}  )
    let temp = this.items
    if(c_item){
      c_item.quantity += item.quantity
      c_item.taxable = item.product.taxable
    }
    else{
      temp.push(item)
    }
    this.items = temp

    this.calculate_totals()
  }


  onUpdateItem = (item) => {
    let c_item = _.find(  this.items, (i) => { return item.product.id == i.product.id}  )
    if(c_item){
      c_item.quantity = item.quantity
      c_item.product.taxable = item.product.taxable
    }

    this.calculate_totals()
  }

  onAddOtherItem = (item) => {
    let p = item.product
    let c_item = _.find(  this.items, (i) => { 
      return (p.id == i.product.id && p.other_description == i.product.other_description && p.other_price == i.product.other_price)
    })
    let temp = this.items
    c_item == null ? this.items.push(item) : c_item.quantity += 1
    this.items = temp

    this.calculate_totals()
  }

  onUpdateOtherItem = (item) => {
    let c_item = _.find(  this.items, (i) => { return (item.product.cart_item_id == i.product.cart_item_id) })
    if(c_item){
      c_item.product.other_description = item.product.other_description
      c_item.quantity = item.quantity 
      c_item.product.taxable = item.product.taxable
      c_item.product.other_price = item.product.other_price
      c_item.product.saleprice = item.product.other_price
    }

    this.calculate_totals()
  }

  onToggleEditMode = (obj) => {
    this.edit_mode = obj.mode
    this.edit_mode_id = obj.id
  }
  onAddItem2(item) {
    let c_item = _.find(  this.items, (i) => { return item.product.id == i.product.id}  )
    let temp = this.items
    c_item == null ? temp.push(item) : c_item.quantity += 1
    this.items = temp

  }

  onGetProposalCart = (obj) => {

			this.discount_amount = 0
			this.commissions = 0
			this.items = []
			this.total_items = 0
			this.subtotal = 0
      this.taxable_subtotal = 0
      this.nontaxable_subtotal = 0
			this.sales_tax = 0
			this.monthly_recurring_total = 0
			this.tax_percentage = .07
			this.total = 0
			this.locked = true
			let discount = obj.proposal.discount
			this.discount_label = `${discount}% Discount`

      this.discount_amount = discount
			try{
				let prod_hash = ProductStore.getState().prod_hash
				let t = this
				_.each(obj.items, (item) => {
          if(item.other_description != null){
            let prod = _.clone(prod_hash[item.product_id])
            prod.saleprice = item.other_price * 100
            prod.other_price = item.other_price * 100
            prod.other_description = item.other_description
            prod.taxable = item.taxable
            prod.cart_item_id = item.id
            //let i = {proposal_id: item.proposal_id, id: item.product_id, other_description: item.other_description, saleprice: item.other_price, other_price: item.other_price, taxable: item.taxable, deleted: 0}
            t.onAddOtherItem({product: prod, quantity: item.quantity}) 
          }
          else{
					  t.onAddItem2({product: prod_hash[item.product_id], quantity: item.quantity})
          }
				})
			}
			catch(e){
        console.log(e)
			}
			this.edit_mode = false
			this.edit_mode_id = null
			this.calculate_totals()
  }


  onApplyDiscount = (obj) => {
/*    this.discount = parseInt(0)
    this.calculate_totals()
    if(obj.percentage != 0){
      this.discount = obj.percentage * this.subtotal * .0001 
      this.discount_label = obj.label
    }
*/
      this.calculate_totals()
  }

  onRemoveItem = (obj) => {
    let id = obj.id
    let description = obj.description
    if(id == 65 || id == 66){
      this.items = _.filter(this.items, (i) => {
        return i.product.id != id || i.product.other_description != description
      }) 
    }
    else{
      this.items = _.filter(this.items, (i) => { return i.product.id != id})
    }
    this.calculate_totals()
  }

  onClearCart = () => {
    ::this.bootstrap()
  }

  onSetLock = (locked) => { this.locked = locked }


  //helper functions

  before_totals(){
    let gateway = _.find(  this.items, (i) => { return 1 == i.product.id}  )
    if(gateway){
      let access_fee = _.find(  this.items, (i) => { return 80 == i.product.id}  )
      if(access_fee){
        access_fee.quantity = gateway.quantity
        access_fee.taxable = gateway.taxable
      }
      else{
        this.items.push({product: ProductStore.getState().prod_hash[80], quantity: gateway.quantity}) 
      }
    }
  }
  calculate_totals() {
    this.before_totals()
    let discount = null
    try{
      discount = ProposalStore.getState().current_proposal.discount
      this.discount = discount
    }
    catch(e){
      console.log(e)
    }
    this.subtotal = 0
    this.taxable_subtotal = 0
    this.nontaxable_subtotal = 0
    this.quantity = 0
    this.monthly_recurring = 0
    this.discount_amount = 0

    console.log('items', this.items)
    for(let i of this.items){
      this.monthly_recurring += (i.product.recurring === 'yes' ? i.product.saleprice : 0)
      let discounted_price = null
      if(i.product.taxable === true){
        discounted_price = i.product.saleprice
        if(i.product.discountable === 'yes'){
          discounted_price = i.product.saleprice - Math.round(i.product.saleprice * discount * .01)
        }
        this.taxable_subtotal += discounted_price * i.quantity
      }
      else{
        discounted_price = i.product.saleprice
        if(i.product.discountable === 'yes'){
          discounted_price = i.product.saleprice - Math.round(i.product.saleprice * discount * .01)
        }
        this.nontaxable_subtotal += discounted_price * i.quantity
      }

      this.quantity += i.quantity
      if(i.product.commissionable == 'yes'){
        this.commissions += Math.round(i.product.commission * discounted_price * i.quantity)
        console.log('item commission', Math.round(i.product.commission * discounted_price * i.quantity))
        console.log('commissions total', this.commissions)
      }
      //if(i.product.discountable === 'yes'){
      //  this.discount_amount += i.product.saleprice * i.quantity * discount * .01
      //}
    }

    this.sales_tax = this.tax_percentage * this.taxable_subtotal
    this.total = (this.taxable_subtotal + this.nontaxable_subtotal) + this.sales_tax
  }
}

module.exports = alt.createStore(CartStore, 'CartStore')
