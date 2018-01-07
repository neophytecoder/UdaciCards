import React, {Component} from 'react'
import { Platform, View, Text, TouchableOpacity, ScrollView} from 'react-native'
import { connect } from 'react-redux'

import { fetchCardsAsync } from '../actions/card'
import { IndividualCard } from './individualcard'
import { setLocalNotification, clearNotification } from '../utils/notification'

const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15
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

  child2: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  }
}

class DeckDetail extends Component {
  static navigationOptions = {
    title: 'Deck',
  }

  addCard = () => {
    this.props.navigation.navigate('AddCard', {title: this.props.title});
  }

  startQuiz = () => {
    this.props.navigation.navigate('Quiz', {title: this.props.title});
    clearNotification().then(setLocalNotification);
  }

  componentDidMount = () => {
    this.props.fetchCards(this.props.title);
  }

  render() {
    const {title, deck } = this.props;
    console.log('CardDetail', deck);
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>
          {title}
        </Text>
        <Text style={{fontSize: 15, marginTop: 5}}>
          {deck.questions.length} questions
        </Text>
        <View style={styles.child2}>
          <TouchableOpacity style={styles.button} onPress={this.addCard} >
            <View>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>Add a card</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.startQuiz}>
            <View>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>Start quiz</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({
  deck: state.decks[props.navigation.state.params.title],
  title: props.navigation.state.params.title,
  ...props
})

const mapDispatchToProps = dispatch => ({
  fetchCards: (title) => fetchCardsAsync(title)(dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);
