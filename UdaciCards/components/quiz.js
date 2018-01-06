import React, {Component} from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'

import {Card, FinishCard} from './card'

class Quiz extends Component {
  static navigationOptions = {
    title: 'Quiz',
  }

  constructor(props) {
    super(props);
    this.state = {
      question: 0, correct: 0, showQuestion: true,
      totalCard: this.props.questions.length
    };
  }

  isQuizEnd = () => {
    return this.state.question >= this.props.questions.length;
  }

  nextQuestion = () => {
    if (!this.isQuizEnd()) {
      this.setState({question: this.state.question + 1});
    }
  }

  onCorrect = () => {
    this.setState({correct: this.state.correct + 1});
    this.nextQuestion();
  }

  render() {
    if (!this.isQuizEnd()) {
      return (
        <Card question={this.props.questions[this.state.question]}
            questionNo={this.state.question}
            length={this.state.totalCard}
            onCorrect={this.onCorrect}
            onIncorrect={this.nextQuestion}
         />
      )
    } else {
      return (
        <FinishCard correct={this.state.correct}
          totalCard={this.state.totalCard} />
      )
    }
  }
}

const mapStateToProps = (state, props) => {
  const title = props.navigation.state.params.title;
  return {
    questions: state.decks ? state.decks[title].questions : {},
    title,
    ...props
  }
}

const mapDispatchToProps = dispatch => ({})


export default connect(mapStateToProps, mapDispatchToProps)(Quiz);