import { ADD_DECK, REMOVE_DECK } from '../actions/deck'
import { ADD_CARD, REMOVE_CARD } from '../actions/card'
import { filterUnwanted } from '../utils'

export const deckReducers = (decks = {}, action) => {
  switch (action.type) {
    case ADD_DECK:
      return {...decks, [action.deck.title]: action.deck};
    case REMOVE_DECK:
      const {[action.deck.title]: deletedValue, ...rest} = decks;
      return rest;
    case ADD_CARD:
      return {
        ...decks,
        [action.title]: {
          ...decks[action.title],
          questions: [...decks[action.title]['questions'], action.card]
        }
      };
    default:
      return decks;
  }
}
