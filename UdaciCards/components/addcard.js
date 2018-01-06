import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'

import { addCardAsync } from '../actions/card'

class AddCard extends Component {
  static navigationOptions = {
    title: 'New Card',
  }

  constructor (props) {
    super(props);
    this.state = {question: '', answer: ''};
  }

  onAddCard = () => {
    const card = {...this.state};
    this.props.addCard(this.props.title, card).then(res => {
      this.props.navigation.goBack();
    });
  }

  render() {
    return (
      <View>
        <Text>{this.props.title}</Text>
        <TextInput style={{width: 200, height: 30, borderWidth: 2}} onChangeText={text => this.setState({'question': text})} />
        <TextInput style={{width: 200, height: 30, borderWidth: 2}} onChangeText={text => this.setState({'answer': text})} />
        <TouchableOpacity onPress={this.onAddCard}>
          <View>
            <Text>Add card</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({
  title: props.navigation.state.params.title,
  ...props
})

const mapDispatchToProps = dispatch => ({
  addCard: (title, card) => addCardAsync(title, card)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
