import React, {Component} from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform } from 'react-native'
import {NavigationActions } from 'react-navigation'

import {Card, FinishCard} from './card'

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'flex-start'
  },
})

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

  restartQuiz = () => {
    this.setState({question: 0, correct: 0, showQuestion: true});
  }

  goBack = () => {
    this.props.navigation.goBack();
    this.props.navigation.navigate('DeckDetail', { title: this.props.title });
  }

  goToHome = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Tabs'})
      ]
    })
    this.props.navigation.dispatch(resetAction);
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
        <View style={styles.container}>
          <Card
            question={this.props.questions[this.state.question]}
              questionNo={this.state.question}
              length={this.state.totalCard}
              onCorrect={this.onCorrect}
              onIncorrect={this.nextQuestion} />
         </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <FinishCard correct={this.state.correct}
            totalCard={this.state.totalCard}
            restartQuiz={this.restartQuiz}
            goBack={this.goBack}
            goToHome={this.goToHome}/>
        </View>
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
