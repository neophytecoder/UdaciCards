import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

const Question = ({question, onAnswer}) => (
  <View>
    <Text>{question}</Text>
    <TouchableOpacity onPress={onAnswer}>
      <View>
        <Text>Answer</Text>
      </View>
    </TouchableOpacity>
  </View>
)

const Answer = ({answer, onQuestion}) => (
  <View>
    <Text>{answer}</Text>
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
      <View>
        <Text>{questionNo + 1}/{length}</Text>
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
        <TouchableOpacity onPress={onCorrect}>
          <View>
            <Text>correct</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onIncorrect}>
          <View>
            <Text>incorrect</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const FinishCard = ({correct, totalCard}) => (
  <View>
    <Text>Finish {correct}/{totalCard}</Text>
  </View>
)

export {Card, FinishCard};
