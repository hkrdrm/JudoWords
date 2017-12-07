require('normalize.css');
require('styles/App.css');

import config  from 'config'
import React   from 'react'

class Root  extends React.Component {

  constructor(){
    super()
  }
  componentWillMount(){
    if(this.props.location.pathname === `/`){
      this.props.history.push(`/app`)
    }
  }
  render() {

    return (

      <div>
      </div>
    )
  }
}

export default Root
