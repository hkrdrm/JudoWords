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

const questions = [
  { 
    question: 'Sensei', 
    answer:   'Teacher or Instructor'
  },
  {
    question: 'Dojo',
    answer:   'Place or club where Judo is practiced'
  },
  {
    question: 'Gi (Judogi)',   
    answer:   'Judo Uniform'
  },
  {
    question: 'Seiza',   
    answer:   'Kneeling position'
  },
  {
    question: 'Anza',   
    answer:   'Sitting position with legs crossed'
  },
]

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
      <div style={{width: '100%', alignSelf: 'flex-start', margin: 25}} className='card'>
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
      <div style={{width: '100%', margin: 25}} className='card'>
        <div className='card-body'>
          <h4 className='card-title'>Answers</h4>
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
      this.state.answered_questions.push(q)
      this.state.question_counter++
      this.forceUpdate()
    }
  }
  buildAnsweredPanel = () => {
    return _.map(_.reverse(this.state.answered_questions), (q)=>{
      return (
        <div key={q.question_number} style={{width: '100%', margin: 25, alignSelf: 'flex-start'}} className='card'>
          <div className='card-body'>
            <h4 className='card-title'>Question {q.question_number}</h4>
            <p className='card-text'>{q.question}</p>
            <p className='card-text'>{(q.correct ? 'Correct' : 'Incorrect')}</p>
          </div>
        </div>
      ) 
    })
  }

  buildScorePanel = () => {
    return(
      <div style={{width: '100%', margin: 25, alignSelf: 'flex-start'}} className='card'>
        <div className='card-body'>
          <h4 className='card-title'>Score</h4>
          <p className='card-text'>Correct: {this.state.correct}</p>
          <p className='card-text'>Incorrect: {this.state.incorrect}</p>
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
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'row-wrap'}}>
        <div style={{display: 'inline-flex', flexFlow: 'column', alignSelf: 'flex-start', alignItems: 'flex-start', margin: 10}}>
          {question}
          {answered}
        </div>
        <div style={{display: 'flex', flexFlow: 'row', alignSelf: 'flex-start', alignItems: 'flex-start', margin: 10}}>
          {answers}
          {score_panel}
        </div>
      </div>
    )
  }
}

export default Quiz
