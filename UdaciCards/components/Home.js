import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux'

import { fetchDecksAsync, removeDeckAsync } from '../actions/deck'
import { MyStatusBar } from './statusbar'
import { IndividualCard } from './individualcard'
import { setLocalNotification, clearNotification } from '../utils/notification'

class Home extends React.Component {
  static navigationOptions = {
    title: 'UdaciCards',
  }

  onCreateDeck = () => {
    console.log(this.props);
    this.props.navigation.navigate('CreateDeck');
  }

  onCardDetail = (title) => {
    this.props.navigation.navigate('DeckDetail', {title: title});
  }

  startQuiz = (title) => {
    this.props.navigation.navigate('Quiz', {title});
    clearNotification().then(setLocalNotification);
  }

  componentDidMount() {
    this.props.fetchDeck();
    setLocalNotification();
  }

  render() {
    const { decks } = this.props;
    return (
      <View style={styles.container}>
        {Object.keys(decks).length > 0 &&
          <DeckListView
            decks={decks}
            onCardDetail={this.onCardDetail}
            startQuiz={this.startQuiz}
            removeDeck={this.props.removeDeck} /> }
        {Object.keys(decks).length === 0 &&
            <EmptyView onCreateDeck={this.onCreateDeck}/>
          }
      </View>
    );
  }
}

const EmptyView = ({onCreateDeck}) => (
    <View style={styles.emptyDeck}>
          <TouchableOpacity style={styles.button} onPress={onCreateDeck}>
              <Text>Create a new deck</Text>
          </TouchableOpacity>
    </View>
)

const DeckListView = ({decks, onCardDetail, startQuiz, removeDeck}) => (
  <ScrollView>
    {
      Object.keys(decks).map(title => {
        const deck = decks[title];
        return (
            <TouchableOpacity  key={deck.title} onPress={() => onCardDetail(deck.title)}>
              <View>
                <IndividualCard title={deck.title}
                  totalQuestions={deck.questions.length}
                  startQuiz={() => startQuiz(deck.title)}
                  deleteDeck={() => removeDeck(deck)}
                />
              </View>
            </TouchableOpacity>
        )
      })
    }
  </ScrollView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  emptyDeck: {
    alignItems: 'center',
    padding: 5
  },
  button: {
    backgroundColor: '#ff0000',
    padding: 10
  }
});

const mapStateToProps = (state, props) => ({
  ...props,
  decks: state.decks
})

const mapDispatchToProps = (dispatch) => ({
  fetchDeck: () => fetchDecksAsync(dispatch),
  removeDeck: (deck) => removeDeckAsync(deck)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
