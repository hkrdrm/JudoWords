var alt                 = require("../alt-application.js")

import ProductActions  from '../actions/product-actions'
import _               from 'lodash'

class ProductStore {
  constructor() {
    this.products = []
    this.bindListeners({
      onGetProducts: ProductActions.getProducts,
      onSetSelected: ProductActions.setSelected
    })
    this.state = {
      products: [],
      prod_hash: {},
      selected: null,
    }
  }

  onGetProducts = (obj) => {
    let ary = _.map(obj, ::this.helper_filter)
    ary = _.filter(ary, function(o){return o.type == 'SALE'})
    this.setState({products: ary, prod_hash: _.keyBy(ary, 'id')})
  }

  onSetSelected = (id) => {
    this.setState({selected: id})
  }

  helper_filter(p){
    if(!p.description.includes('SALE') && !p.description.includes('LEASE')){
        p.type = 'SALE'
        p.saleprice *= 100
        return p
    }
    else{
      let sp = _.split(p.description, ' - ')
      p.type = sp[0]
      p.description = sp[1] + ` - ${p.partNo}`
      p.saleprice *= 100
      return p
    }
  }
}

module.exports = alt.createStore(ProductStore, 'ProductStore')
