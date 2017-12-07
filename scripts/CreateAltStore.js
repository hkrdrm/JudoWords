var fs = require('fs');
var _ = require('lodash');

var model = `Status`
var store_filename = model.toLowerCase() + '-store.js'
var actions_filename = model.toLowerCase() + '-actions.js'

var my_store = 
`var alt                 = require("../alt-application.js")

import ${model}Actions  from '../actions/${model}-actions'

class ${model}Store {
  constructor() {
    this.bindListeners({
      onGet${model}: ${model}Actions.get${model}
    })
    this.${model.toLowerCase()} = {}
  }

  onGet${model} = (obj) => {
    this.${model.toLowerCase()} = obj
  }
}

module.exports = alt.createStore(${model}Store, '${model}Store')`

var my_actions = 
`var alt = require("../alt-application.js")

import config   from 'config'
import request  from 'superagent'
import cookie   from 'js-cookie'

class ${model}Actions {
  constructor(){ }

  get${model} = () => {
    return (dispatch) => {
      request
        .get( ` + "`${config.api}/`" + ` )
        .set('Accept', 'application/json')
        .set('X-Token', cookie.get('token'))
        .end( function(err,res){
          dispatch( res.body )
        })
    } // end dispatch
  }
}

module.exports = alt.createActions(${model}Actions)
`

fs.writeFile(`../src/stores/${store_filename}`, my_store, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The store file was created!");
}); 

fs.writeFile(`../src/actions/${actions_filename}`, my_actions, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The actions file was created!");
}); 