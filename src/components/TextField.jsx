require('normalize.css')
require('styles/App.css')

import React from 'react'
import _     from 'lodash'

const defaultStyle = {
  width: 256,
  marginTop: 20
}
class TextField extends React.Component {
  constructor(){
    super()
    this.state = {active: false, value: '', focus: false}
  }
  componentWillMount(){
    this.setState({value: this.props.defaultValue})
  }
  onChange = (e) => {
    this.setState({value: e.target.value}) 
    this.props.onChange ? this.props.onChange(e) : null
  }
  render() {

    let unique = _.uniqueId('input_')
    let value = null
    if(this.props.value){
      value = this.props.value
    }
    else{
      value = (this.state.value ? this.state.value : '')
    }
    return (
      <div style={this.props.style ? this.props.style : defaultStyle} className='md-form form-sm'>
        <input
          style={{padding: 0}}
          ref={this.props.inputRef}
          type={this.props.type ? this.props.type : 'text'}
          className='form-control'
          id={unique}
          name={unique}
          onChange={this.onChange}
          onKeyDown={this.props.onKeyDown}
          onFocus={ ()=>{ this.setState({focus: true}) } }
          onBlur={ ()=>{ this.setState({focus: false}) } }
          value={value} /> 
        <label
          className={ (this.state.focus || value.length > 0) ? 'active' : '' }
          htmlFor={unique}>
          {this.props.floatingLabelText}
        </label>
      </div>
    )
  }
}

export default TextField
