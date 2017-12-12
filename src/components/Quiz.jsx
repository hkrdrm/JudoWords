require('normalize.css');
require('styles/App.css');
require('animate.css')

import Home             from './Home'
import React            from 'react'
import Navigation       from './navigation'
import Redis            from './Redis'
import config           from 'config'
import _                from 'lodash'
import { BrowserRouter as Router,
         IndexRoute,
         Route, Switch}  from 'react-router-dom'

import orange_belt      from '../data/orange_belt.json'

const questions = orange_belt
class Answer extends React.Component {

  constructor(){
    super()
    this.state = {isHovered: false}
  }
  handleHover = () => {
    this.setState({isHovered: !this.state.isHovered})
  }
  render(){
    const btnClass = this.state.isHovered ? 'animated pulse ' : ''
    return (
      <span style={{margin: 5}} className={`${btnClass}badge badge-primary`} onTouchTap={this.props.onTouchTap} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>{this.props.answer}</span>
    ) 
  }
}

class Quiz extends React.Component {

  constructor({location}){
    super()
    this.state = {
      questions: questions,
      unanswered_questions: _.shuffle(_.clone(questions)),
      answered_questions: [],
      score: 0,
      question_counter: 1,
      correct: 0,
      incorrect: 0
    }
  }

  componentWillMount(){
    this.setState({
      questions: _.shuffle(this.reverseQuestionAnswer(this.state.questions)), 
      unanswered_questions: this.reverseQuestionAnswer(this.state.unanswered_questions)
    })
  }

  reverseQuestionAnswer(ary){
    return _.map(ary, (q) => {return {question: q.answer, answer: q.question}} )
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

  buildAnswersPanel = () => {
    let ary = _.map(this.state.questions, (q)=> {
      return <Answer key={q.answer} onTouchTap={()=>{this.answerQuestion(q.answer)}} answer={q.answer} />
    })
    return (
      <div style={{marginTop: 25}} className='card'>
        <div className='card-body'>
          <h4 className='card-title'>Choices</h4>
          {ary}
        </div>
      </div>
    )
  }

  answerQuestion(answer){
    if(this.state.unanswered_questions.length > 0){
      let q = this.state.unanswered_questions.pop()   
      q.question_number = this.state.question_counter
      if(answer === q.answer){
        q.correct = true
        this.state.correct++
      }
      else{
        q.correct = false
        this.state.incorrect++
      }
      q.response = answer
      this.state.answered_questions.push(q)
      this.state.question_counter++
      this.forceUpdate()
    }
  }
  buildAnsweredPanel = () => {
    let correct = (
      <div className="alert alert-success" role="alert">
        <strong>Well done!</strong> Your answer was correct.
      </div>
    )
    let incorrect = (
      <div className="alert alert-danger" role="alert">
        <strong>Oh snap!</strong> Your answer was incorrect. 
      </div>
    )
    return _.map(_.reverse(this.state.answered_questions), (q)=>{
      return (
        <div key={q.question_number} style={{marginTop: 25, alignSelf: 'flex-start'}} className='card'>
          <div className='card-body'>
            <h4 className='card-title'>Question {q.question_number}</h4>
            <p className='card-text'>{q.question}</p>
            <p className='card-text'>Your Answer: {q.response}</p>
            <p className='card-text'>Correct Answer: {q.answer}</p>
            {(q.correct ? correct : incorrect)}
          </div>
        </div>
      ) 
    })
  }

  buildScorePanel = () => {
    return(
      <div style={{marginTop: 25, alignSelf: 'flex-start'}} className='card'>
        <div className='card-body'>
          <h4 className='card-title'>Score</h4>
          {this.state.correct + this.state.incorrect > 0 ? <p style={{whiteSpace: 'nowrap'}} className='card-text'>Percentage: {Math.round((this.state.correct/(this.state.incorrect + this.state.correct))*100)}%</p> : null }
          <p style={{whiteSpace: 'nowrap'}} className='card-text'>Correct: {this.state.correct}</p>
          <p style={{whiteSpace: 'nowrap'}} className='card-text'>Incorrect: {this.state.incorrect}</p>
        </div>
      </div>
    )
  }

  render() {
    let question = null
    if(this.state.unanswered_questions.length > 0){
      question = this.buildQuestionPanel(_.last(this.state.unanswered_questions))
    }

    let answered = this.buildAnsweredPanel()
    let answers = this.buildAnswersPanel()
    let score_panel = this.buildScorePanel()
    return (
      <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexFlow: 'row-wrap'}}>
        <div style={{display: 'flex', flexGrow: 2, flexFlow: 'column', alignSelf: 'flex-start', alignItems: 'flex-start', margin: 10}}>
          {question}
          {answers}
          {answered}
        </div>
        <div style={{display: 'flex', flexGrow: 3, flexFlow: 'row', alignSelf: 'flex-start', alignItems: 'flex-start', margin: 10}}>
          {score_panel}
        </div>
      </div>
    )
  }
}

export default Quiz
