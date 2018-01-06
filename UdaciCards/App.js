import React from 'react'
import {RootNavigator} from './main/routes'
import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { deckReducers } from './reducers/deckReducers'

const reducers = combineReducers({
  decks: deckReducers
});

const store = createStore(reducers, applyMiddleware(thunk));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator/>
      </Provider>
    );
  }
}
