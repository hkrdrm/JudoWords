require('normalize.css')
require('styles/App.css')

import React from 'react'
import { Link }    from 'react-router'


class NavLink extends React.Component {

  render() {

    return (
      <li className={`nav-item${location.pathname === this.props.path ? ' active' : ''}`} >
        <Link className='nav-link' to={this.props.path}>{this.props.text}</Link>
      </li>
    )
  }
}

export default NavLink