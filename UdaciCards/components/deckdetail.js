import React, {Component} from 'react'
import {View, Text, TouchableOpacity, ScrollView} from 'react-native'
import { connect } from 'react-redux'

import { fetchCardsAsync } from '../actions/card'

class DeckDetail extends Component {
  static navigationOptions = {
    title: 'Deck',
  }

  addCard = () => {
    this.props.navigation.navigate('AddCard', {title: this.props.title});
  }

  startQuiz = () => {
    this.props.navigation.navigate('Quiz', {title: this.props.title});
  }

  componentDidMount = () => {
    this.props.fetchCards(this.props.title);
  }

  render() {
    const { decks } = this.props;
    console.log('CardDetail', decks);
    return (
      <View>
        <Text>Card detail</Text>
        <Text>{this.props.title}</Text>
        <Text>{JSON.stringify(this.props.decks)}</Text>
        <TouchableOpacity onPress={this.addCard}>
          <View>
            <Text>add a card</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.startQuiz}>
          <View>
            <Text>Start quiz</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({
  decks: state.decks[props.navigation.state.params.title],
  title: props.navigation.state.params.title,
  ...props
})

const mapDispatchToProps = dispatch => ({
  fetchCards: (title) => fetchCardsAsync(title)(dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);
