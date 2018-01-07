import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'

import { addCardAsync } from '../actions/card'
import { styles } from './createdeck'

const addedStyles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20,
  }
})

class AddCard extends Component {
  static navigationOptions = {
    title: 'New Card',
  }

  constructor (props) {
    super(props);
    this.state = {question: 'Type question...', answer: 'the answer'};
  }

  onAddCard = () => {
    const card = {...this.state};
    this.props.addCard(this.props.title, card).then(res => {
      this.props.navigation.goBack();
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={addedStyles.title}>{this.props.title}</Text>
        <TextInput style={styles.input} value={this.state.question}
          onChangeText={text => this.setState({'question': text})} />
        <TextInput style={styles.input} value={this.state.answer}
          onChangeText={text => this.setState({'answer': text})} />
        <TouchableOpacity style={styles.addNew} onPress={this.onAddCard}>
          <View>
            <Text style={styles.button}>Add card</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const SuccessView = () => (
  <Text style={styles.success}>
    Successful
  </Text>
)

const FailureView = ({err}) => (
  <Text style={styles.fail}>
    Fail: {err}! Please, retry!
  </Text>
)

const mapStateToProps = (state, props) => ({
  title: props.navigation.state.params.title,
  ...props
})

const mapDispatchToProps = dispatch => ({
  addCard: (title, card) => addCardAsync(title, card)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
