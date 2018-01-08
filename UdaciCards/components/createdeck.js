import React, { Component } from 'react'
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'

import {addDeckAsync, fetchDecksAsync} from '../actions/deck'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderColor: '#8D6E63',
    borderWidth: 2,
    height: 40,
    margin: 10
  },
  button: {
    fontSize: 15,
    color: 'white',
    padding: 15
  },
  addNew: {
    backgroundColor: '#D7CCC8',
    borderRadius: Platform.OS === 'ios'? 12 : 2,
    margin: 10,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  success: {
    backgroundColor: '#A5D6A7',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15
  },
  fail: {
    backgroundColor: '#EF9A9A',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15
  }
});

class CreateDeck extends Component {
  static navigationOptions = {
    title: 'New Deck',
    onSubmit: false,
    successful: false,
    err: ''
  }

  constructor(props) {
    super(props);
    this.state = {title: 'new deck'};
  }

  createDeck = () => {
    if (this.state.title === '') {
      this.setState({onSubmit: true, successful: false, err: 'empty title'});
      return;
    }

    this.props.addDeck({title: this.state.title})
      .then(res => {
        //this.setState({onSubmit: true, successful: true});
        this.props.navigation.goBack();
        this.props.navigation.navigate('DeckDetail', {title: this.state.title})
      })
      .catch(err => {
        this.setState({onSubmit: true, successful: false, err});
      })
  }

  componentDidMount() {
    this.props.fetchDeck();
  }

  render() {
    console.log(this.props.decks);
    const { onSubmit, successful, err } = this.state;
    return (
      <View>
        <TextInput
          style={styles.input} value={this.state.title}
          onChangeText={text => this.setState({title: text})} />
        <TouchableOpacity style={styles.addNew}  onPress={this.createDeck}>
          <Text style={styles.button}>Add new</Text>
        </TouchableOpacity>
        {onSubmit && successful &&
          <SuccessView />
        }
        {onSubmit && !successful &&
          <FailureView err={err}/>
        }
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

const mapStateToProps = (state, props) => ({decks: state.decks});
const mapDispatchToProps = (dispatch) => ({
  addDeck: (deck) => addDeckAsync(deck)(dispatch),
  fetchDeck: () => fetchDecksAsync(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeck);
