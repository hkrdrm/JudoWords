require('normalize.css');
require('styles/App.css');

var alt = require("../alt-application.js")

import Home       from './Home'
import Quiz       from './Quiz'
import React      from 'react'
import Navigation from './navigation'
import Redis      from './Redis'
import config     from 'config'

import { BrowserRouter as Router,
         IndexRoute,
         Route, Switch}  from 'react-router-dom'

class App extends React.Component {

  constructor({location}){
    super()
  }


  render() {
    return (
      <div>
        <Router basename={config.root}>
          <div>
              <Navigation />
              <Route path={`/Home`} component={Home} />
              <Route path={`/Quiz`} component={Quiz} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
