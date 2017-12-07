require("babel-polyfill")

import React               from 'react'
import ReactDOM            from 'react-dom'


import App              from './components/App'
import cookie           from 'js-cookie'
import createHistory    from 'history/createBrowserHistory'
import Home             from './components/Home'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// Render the main component into the dom

const history = createHistory()
const location = history.location
history.listen((location, action) => {
  console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
  console.log(`The last navigation action was ${action}`)
})
// Listen for changes to the current location.
const unlisten = history.listen((location, action) => {
  // location is an object like window.location
  console.log(action, location.pathname, location.state)
})


// To stop listening, call the function returned from listen().
unlisten()

ReactDOM.render(
  <App history={history} location={location} />,
  document.getElementById('app')
)
