import { saveDeckTitle, getDecks } from '../utils/storage'

export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';

export const addDeck = (deck) => ({
  type: ADD_DECK,
  deck
});

export const removeDeck = (deck) => ({
  type: REMOVE_DECK,
  deck
});

export const addDeckAsync = (deck) => (dispatch) => {
  const newDeck = {...deck, questions: []};
  saveDeckTitle(newDeck.title)
    .then(res => dispatch(addDeck(newDeck)));
}

export const fetchDecksAsync = (dispatch) => {
  return getDecks().then(decks => {
      console.log('decks', decks);
      Object.keys(decks).map(title =>
        dispatch(addDeck(decks[title]))
      );
      return decks;
    }
  ).catch(error => ({}))
}
