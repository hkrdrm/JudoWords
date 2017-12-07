require('styles/App.css');
require('styles/pro.min.css')
require('styles/scss/bootstrap.scss');

import Assignment        from 'material-ui/svg-icons/action/assignment'
import Avatar            from 'material-ui/Avatar'
import Divider           from 'material-ui/Divider'
import Drawer            from 'material-ui/Drawer'
import FontIcon          from 'material-ui/FontIcon'
import { Link }          from 'react-router-dom'
import {List, ListItem}  from 'material-ui/List'
import React             from 'react'
import Styles            from '../styles/GlobalStyles'
import Subheader         from 'material-ui/Subheader'
import Home              from './Home'
import Quiz              from './Quiz'
import { 
  Collapse,
  Nav,
  Navbar,
  NavLink,
  NavItem,
  NavbarToggler,
  DropdownToggle,
  NavbarBrand   }        from 'reactstrap'

import { BrowserRouter as Router,
         IndexRoute,
         Route, Switch}  from 'react-router-dom'


class Navigation extends React.Component {

  constructor({location}){
    super()
    this.state = {open: false}
  }

  openMenu = () => {
    this.setState({open: true})
  }

  closeMenu () { this.setState({open: false})}

  render() {
    return (

      <div>
        <Navbar style={{zIndex: 1021}} dark color='primary' expand='md'>
          <NavbarBrand href='/'>Judo Quiz</NavbarBrand>
          <Nav className="mr-auto" navbar >
            <NavLink>Home</NavLink>
          </Nav>

        </Navbar>


      </div>

    )
  }
}

export default Navigation
