var alt                 = require('../alt-application.js')

import StatusActions  from '../actions/status-actions'
import _              from 'lodash'

class StatusStore {
  constructor() {
    this.bindListeners({
      onGetStatuses: StatusActions.getStatuses
    })
    this.statuses_hash = {}
    this.statuses = []
  }

  onGetStatuses = (obj) => {
    this.statuses = obj
    this.statuses_hash = _.keyBy(obj, 'status')
  }
}

module.exports = alt.createStore(StatusStore, 'StatusStore')