require('normalize.css')
require('styles/App.css')

import React from 'react'
import _     from 'lodash'

const defaultStyle = {
  width: 256,
  marginTop: 20
}
class Checkbox extends React.Component {
  constructor(props){
    super()
  }
  componentWillReceiveProps(nextProps){
    //this.setState({checked: nextProps.checked})
  }
  onChange = (e) => {
   this.props.onCheck(e, !this.props.checked)
  }
  render() {

    let unique = _.uniqueId('input_')
    let value = this.props.checked
    return (
      <div className='md-form form-sm'>
        <input
          type='checkbox'
          className='filled-in'
          id={unique}
          name={unique}
          onChange={this.onChange}
          checked={value} /> 
        <label
          htmlFor={unique}>
          {this.props.label}
        </label>
      </div>
    )
  }
}

export default Checkbox
