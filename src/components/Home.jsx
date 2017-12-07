require('normalize.css');
require('styles/App.css');

import config  from 'config'
import React   from 'react'
import Checkbox from 'material-ui/Checkbox'
import { Alert }         from 'react-bootstrap'

class Home  extends React.Component {

  constructor(){
    super()
  }
  render() {

    let error = null
    try{
      error = (
        <Alert bsStyle='warning'>
          <strong>{this.props.location.state.error}</strong>
        </Alert>
      )
    }
    catch(e){}

    return (

      <div>
          {error}
        <div className="center_wrapper">
          <div style={{marginTop: 10, width: '70%', padding: 20}} className="jumbotron">
            <p className="lead">
              Welcome to the SnapConnect sales app. Create a new customer to get started 
              with a quote.
            </p>
            <p className="lead">
              <a className="btn btn-primary btn-lg" href={`#`} role="button">
                Start Quiz
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
export default Home

