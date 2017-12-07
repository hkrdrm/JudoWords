require('normalize.css')
require('styles/App.css')
//require('styles/pro.min.css')
//require('mdbootstrap/css/bootstrap.css')
//require('styles/mdb.css')

import Accounting          from 'accounting'
import Avatar              from 'material-ui/Avatar'
import config              from 'config'
import Fuse                from 'fuse.js'
import { Input }           from 'reactstrap'
import { List, 
         ListItem, 
         makeSelectable }  from 'material-ui/List'
import Menu                from 'material-ui/Menu'
import MenuItem            from 'material-ui/MenuItem'
import NoPhoto             from 'material-ui/svg-icons/action/visibility-off';
import Popover             from 'material-ui/Popover'
import React               from 'react';
import Styles              from '../styles/GlobalStyles'
import TextField           from 'material-ui/TextField'
import _                   from 'lodash'
import $                   from 'jquery'


class FuzzySearch extends React.Component {
  constructor(){
    super()
    this.state = {  search_key: '', popoverOpen: false, results: []  }
    this.fuzzyDebounce = _.debounce(::this.fuzzySearch, 330, {leading: false, trailing: true})
  }

  componentDidMount(){
    //this.refs.search.focus()
  }

  handleTextChange(e){
    console.log(e.currentTarget)
    this.setState(  {search_key: e.target.value, popoverOpen: true, popoverAnchor: e.currentTarget}  )
    this.fuzzyDebounce.cancel()
    this.fuzzySearch()
  }
  handlePopoverOpen = () => {
    this.setState(  {popoverOpen: true}  )
  }
  handlePopoverClose = () => {
    this.setState(  {popoverOpen: false}  )
  }

  fuzzySearch = () => {
    let f = new Fuse(this.props.data, {keys: this.props.keys})
    let r = f.search(this.search_field.value)
    r = this.props.maxResults ? r.slice(0, this.props.maxResults) : r
    if(this.props.returnResults){this.props.returnResults(r)}
    this.setState({results: r, popoverOpen: true})
  }

  selectItem = (i) => {
    this.props.onIndexChange(i)
    this.handlePopoverClose()
  }

  render() {
    let open = true
    let r = this.state.results
    let results = []
    let imgSrc = require('../images/nocamera.png')
    let prodImg = config.root + imgSrc
    for(let i in r){
      if(r[i].url){
        prodImg = config.root + r[i][this.props.imageKey]
      }

      results.push(
        <li 
          key={i} 
          onTouchTap={this.selectItem.bind(this, r[i].id)}
          style={Styles.ChromeHack}
        >
          {this.props.imageKey ? <img style={{width: 50, height: 50}} src={prodImg} /> : null}
          <span className='filtrable'>
            <div>{r[i][this.props.searchKey]}</div>
            <div>{Accounting.formatMoney(r[i][this.props.secondaryText] * .01)}</div>
          </span>
        </li>
      )
    }
    let unique = _.uniqueId('search-')
    let popover = null
    if(this.props.popover === true){
      popover = (
        <ul id={unique} style={open ? {opacity: 1, display: 'block'} : null} className='dropdown-content select-dropdown active ul-search'>
          {results}
        </ul>
      ) 
    }
    return (
      <div>
        <div style={{width: '100%', marginTop: 20}} className='md-form form-sm mdb-select'>
          <i className='fa fa-search prefix' />
          <input ref={ ref => this.search_field = ref} className='select-dropdown active' placeholder='Search' type='text' name='search' id='search' data-activates={unique} onChange={_.debounce(this.fuzzySearch, 50)} />
          {this.state.popoverOpen ? popover : null}
        </div>
      </div>
    )
  }
}

export default FuzzySearch
