var alt                 = require("../alt-application.js")

import CartActions      from '../actions/cart-actions'
import CartStore        from '../stores/cart-store'
import CustomerStore    from '../stores/customer-store'
import CustomerActions  from '../actions/customer-actions'
import moment           from 'moment'
import ProposalActions  from '../actions/proposal-actions'
import UserStore        from '../stores/user-store'
import _                from 'lodash'
import Redis            from '../components/Redis'

class ProposalStore {
  constructor() {
    this.on('init', ::this.init)
    this.bindListeners({
      onGetProposal:      ProposalActions.getProposal,
      onSetCustomer:      ProposalActions.setCustomer,
      onSetField:         ProposalActions.setField,
      onNewProposal:      ProposalActions.newProposal,
      onGetProposal:      ProposalActions.getProposal,
      onGetAll:           ProposalActions.getAll,
      onGetBySalesAgent:  ProposalActions.getBySalesAgent,
      onGetStatuses:      ProposalActions.getStatuses,
      onGetAddresses:     ProposalActions.getAddresses,
      onSetChecked:       ProposalActions.setChecked,
      onFilterByChecked:  ProposalActions.filterByChecked,
      onClearCustomer:    ProposalActions.clearCustomer,
      onNewProposal:      ProposalActions.newProposal,
      onUpdateProposal:   ProposalActions.updateProposal,
      onCreateProposal:   ProposalActions.createProposal
    })
  }

  init () {
    let p = {
      customer_id: null,
      create_date: null,
      expire_date: null,
      subscriber: null,
      physical_address_id: null,
      billing_address_id: null,
      terms: null,
      discount: null,
      fees: null,
      sales_agent: null,
      telapex_company: null,
      status: null,
      recurring_total: 1070,
      total: null,
      commissions: null,
      accepted_date: null,
      notes: '',
      inside_city: null,
      tax_exempt: null,
      tax_id: null,
      payment_terms: null,
      access_fee: null
    }
    this.current_proposal = p
    this.proposals = []
    this.proposal_hash = {}
    this.agent_proposals = []
    this.filtered_proposals = []
    this.statuses_filter = []
    this.address_hash = {}
    this.count = 0

    this.customer = {addresses: []}

  }

  onNewProposal = (obj) => {
		let d = moment(Date.now()).add(1, 'M').toDate()
    let p = {
      customer_id: null,
      create_date: moment(Date.now()).toDate(),
      expire_date: new Date(moment(Date.now()).add(1, 'M').toDate()),
      subscriber: null,
      physical_address_id: null,
      billing_address_id: null,
      terms: null,
      discount: null,
      fees: null,
      sales_agent: null,
      telapex_company: null,
      status: null,
      recurring_total: 1070,
      total: null,
      commissions: null,
      accepted_date: null,
      notes: '',
      inside_city: null,
      tax_exempt: null,
      tax_id: null,
      payment_terms: null,
      access_fee: null
    }
    this.current_proposal = p
    this.proposals = []
    this.proposal_hash = {}
    this.agent_proposals = []
    this.filtered_proposals = []
    this.statuses_filter = []
    this.address_hash = {}

    this.customer = {addresses: []}
    CustomerActions.clearCustomer.defer()
  }

  onGetStatuses = (obj) => {
    this.count += 1
    console.log('user', `${UserStore.getState().user}:config:statuses`)
    Redis.getString(`${UserStore.getState().user}:config:statuses`)
      .then((res) => {
        console.log('res here here', res)
        console.log("count", this.count)
        if(res){ 
          console.log(res)
          this.statuses_filter = JSON.parse(res)
        }
        else{
          let s = _.each(obj,  (o) => {o.checked = true}  )
          this.statuses_filter = s
          this.statuses_hash = _.keyBy(s, 'id')
        }
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  onGetAddresses = (obj) => {
    this.address_hash = _.keyBy(obj, 'id')
  }

  onSetChecked = (obj) => {
    this.statuses_filter[obj.id-1].checked = obj.checked
    Redis.setString(`${UserStore.getState().user}:config:statuses`, JSON.stringify(this.statuses_filter))
      .then((res) => {
        console.log(res)
      })
  }

  onFilterByChecked = () => {
    let enabled = []
    _.each(this.statuses_filter, (o) => {
      (o.checked ? enabled.push(o.status) : null)
    })
    this.filtered_proposals = _.filter(  this.agent_proposals, (o) => {return enabled.includes(o.status)}  )
  }

  onGetAll = (obj) => {
    this.proposals = obj
		this.proposal_hash = null
    this.proposal_hash = _.keyBy(this.proposals, 'id')
    ProposalActions.getBySalesAgent.defer(UserStore.getState().user, UserStore.getState().mg_username)
    ProposalActions.filterByChecked.defer()
    //ProposalActions.getStatuses.defer()
  }

  onGetBySalesAgent = (obj) => {
    this.agent_proposals = obj
    ProposalActions.getStatuses.defer()
    //this.filtered_proposals = obj
  }

  onGetProposal = (obj) => {
		console.log('obj ongetproposal')
		console.log(obj)
		this.current_proposal = null
    this.current_proposal = this.proposal_hash[obj]
		ProposalActions.getAddresses.defer()
    try{
		console.log('currentprop')
		  console.log(this.current_proposal)
      CustomerActions.getCustomer.defer(this.current_proposal.customer_id)
			//CartActions.getProposalCart.defer(this.current_proposal)
      //this.customer = CustomerStore.getState().customer_hash[this.current_proposal.customer_id]
    }
    catch(e){
		  console.log('ongetproposal')
			console.log(e)
		}
  }
  onSetCustomer = (obj) => {
    this.customer = obj
    this.subscriber = (this.customer === '' ? `${obj.first_name} ${obj.last_name}` : obj.company)
  }
  onClearCustomer = (obj) => {
    this.customer = {addresses: []}
  }

  onSetField = (hash) => {
    this.current_proposal[hash.key] = hash.value
  }
  saveCart (state) {
    this.cart = state
    this.total = this.cart.total
    this.commissions = this.cart.subtotal * .1
  }
  onCreateProposal = (obj) =>{
		ProposalActions.getAll.defer()
    ProposalActions.getBySalesAgent.defer(UserStore.getState().user, UserStore.getState().mg_username)
    this.current_proposal.id = obj.proposal.id
    CartActions.saveCart.defer(obj.items, obj.proposal.id)
  }
  onUpdateProposal = (obj) => {
    ProposalActions.getAll.defer()
    ProposalActions.getBySalesAgent.defer(UserStore.getState().user, UserStore.getState().mg_username)
    CartActions.saveCart.defer(obj.items, obj.proposal.id)
  }
}

module.exports = alt.createStore(ProposalStore, 'ProposalStore')
