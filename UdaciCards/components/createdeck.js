import React, { Component } from 'react'
import {View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import {addDeckAsync, fetchDecksAsync} from '../actions/deck'

const styles = StyleSheet.create({
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    width: 200,
    height: 30
  },
  button: {
    borderWidth: 2,
    color: 'white',
    backgroundColor: 'black'
  }
});

class CreateDeck extends Component {
  static navigationOptions = {
    title: 'New Deck',
  }

  constructor(props) {
    super(props);
    this.state = {title: ''};
  }

  createDeck = () => {
    this.props.addDeck({title: this.state.title});
  }

  componentDidMount() {
    this.props.fetchDeck();
  }

  render() {
    console.log(this.props.decks);
    return (
      <View>
        <Text>New deck</Text>
        <TextInput style={styles.input} onChangeText={text => this.setState({title: text})} />
        <TouchableOpacity  onPress={this.createDeck}>
          <Text style={styles.button}>Add new</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({decks: state.decks});
const mapDispatchToProps = (dispatch) => ({
  addDeck: (deck) => addDeckAsync(deck)(dispatch),
  fetchDeck: () => fetchDecksAsync(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeck);
