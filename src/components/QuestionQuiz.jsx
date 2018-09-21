require('normalize.css');
require('styles/App.css');
require('animate.css')

import Home             from './Home'
import React            from 'react'
import Navigation       from './navigation'
import Redis            from './Redis'
import Textbox          from 'material-ui/Textbox'
import config           from 'config'
import _                from 'lodash'
import { BrowserRouter as Router,
         IndexRoute,
         Route, Switch}  from 'react-router-dom'

import all_questions     from '../data/all_questions.json'

class Quiz extends React.Component {

  constructor({location}){
    super()
    this.state = {questions: JSON.parse, answer_value: ""}
  }

  buildQuestionPanel = (top) => {
    return (
      <div style={{alignSelf: 'stretch', marginTop: 25}} className='card'>
        <div className='card-body'>
          <h4 className='card-title'>Question {this.state.question_counter}</h4>
          <p className='card-text'>{top.question}</p>
        </div>
      </div>
    ) 
  }

  render() {
    let question = null
    if(this.state.unanswered_questions.length > 0){
      question = this.buildQuestionPanel(_.last(this.state.unanswered_questions))
    }

    return (
      <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexFlow: 'row-wrap'}}>
        <div style={{display: 'flex', flexGrow: 2, flexFlow: 'column', alignSelf: 'flex-start', alignItems: 'flex-start', margin: 10}}>
          {question}
          <Textbox value={this.state.answer_value} />
        </div>
        <div style={{display: 'flex', flexGrow: 3, flexFlow: 'row', alignSelf: 'flex-start', alignItems: 'flex-start', margin: 10}}>
          {score_panel}
        </div>
      </div>
    )
  }
}

export default Quiz
