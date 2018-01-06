import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux'

import { fetchDecksAsync } from '../actions/deck'
import { MyStatusBar } from './statusbar'
import { IndividualCard } from './individualcard'

class Home extends React.Component {
  static navigationOptions = {
    title: 'UdaciCards',
  }

  onPress = () => {
    console.log(this.props);
    this.props.navigation.navigate('CreateDeck');
  }

  onCardDetail = (title) => {
    this.props.navigation.navigate('DeckDetail', {title: title});
  }

  componentDidMount() {
    this.props.fetchDeck();
  }

  render() {
    const { decks } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
            <Text>Create a new deck</Text>
        </TouchableOpacity>
        <ScrollView>
          {
            Object.keys(decks).map(title => {
              const deck = decks[title];
              return (
                  <TouchableOpacity  key={deck.title} onPress={() => this.onCardDetail(deck.title)}>
                    <View>
                      <IndividualCard title={deck.title} totalQuestions={30} />
                    </View>
                  </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  fetchDeck: () => fetchDecksAsync(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
