import { addCardToDeck } from '../utils/storage'
import { makeid } from '../utils'
import { getDeck } from '../utils/storage'
import { addDeck } from './deck'

export const ADD_CARD = 'ADD_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';

export const addCard = (title, card) => ({
  type: ADD_CARD,
  title,
  card
})

export const removeCard = (title, card) => ({
  type: REMOVE_CARD,
  title,
  card
})

export const addCardAsync =  (title, card) => dispatch => {
  const newCard = {...card, id: makeid(30)};
  return addCardToDeck(title, newCard)
    .then(res => {
      return dispatch(addCard(title, newCard));
    });
}

export const fetchCardsAsync = (title) => dispatch => {
  return getDeck(title).then(deck => {
    console.log('fetchCardsAsync', title, deck);
    dispatch(addDeck(deck));
  })
}
