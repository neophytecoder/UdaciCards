import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  questionNumber: {
    alignSelf: 'flex-start',
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20
  },
  child1: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonGroup: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#D7CCC8',
    borderRadius: Platform.OS === 'ios'? 12 : 2,
    margin: 10,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    alignItems: 'stretch',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    padding: 15
  },
})

const Question = ({question, onAnswer}) => (
  <View style={styles.body}>
    <Text style={styles.title}>{question}</Text>
    <TouchableOpacity onPress={onAnswer}>
      <View>
        <Text>Answer</Text>
      </View>
    </TouchableOpacity>
  </View>
)

const Answer = ({answer, onQuestion}) => (
  <View style={styles.body}>
    <Text style={styles.title}>{answer}</Text>
    <TouchableOpacity onPress={onQuestion}>
      <View>
        <Text>Question</Text>
      </View>
    </TouchableOpacity>
  </View>
)

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {showQuestion: true};
  }

  onToggleChange = () => {
    this.setState({showQuestion: !this.state.showQuestion});
  }

  render() {
    const {question, questionNo, length, onCorrect, onIncorrect} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.questionNumber}>
          <Text>{questionNo + 1}/{length}</Text>
        </View>

          <View style={styles.body}>
            {this.state.showQuestion &&
              (
                <Question question={question.question}
                  onAnswer={this.onToggleChange} />
              )
            }
            {!this.state.showQuestion &&
              (
                <Answer answer={question.answer}
                    onQuestion={this.onToggleChange} />
              )
            }
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity onPress={onCorrect} style={styles.button}>
              <View>
                <Text>correct</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onIncorrect} style={styles.button}>
              <View>
                <Text>incorrect</Text>
              </View>
            </TouchableOpacity>
          </View>

      </View>
    );
  }
}

const FinishCard = ({correct, totalCard}) => (
  <View style={styles.body}>
    <Text style={styles.title}>Finish!</Text>
    <Text style={{fontSize: 15}}>
      Answers correctly: {correct}/{totalCard}
    </Text>
  </View>
)

export {Card, FinishCard};
