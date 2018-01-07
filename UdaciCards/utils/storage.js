import { AsyncStorage } from 'react-native'

export const DECKS_DB = 'DECKS_DB';

export const getDecks = () => {
  return AsyncStorage.getItem(DECKS_DB)
    .then(response => JSON.parse(response));
}

export const getDeck = (id) => {
  return getDecks().then(decks => decks[id]);
}

export const saveDeckTitle = (title) => {
  return getDecks()
    .then(parsedResponse => {
      console.log('parsedResponse', parsedResponse);
      if (parsedResponse.hasOwnProperty(title)) {
        throw 'Already exist!';
      }
      const newDeck = { title: title, questions: [] };
      return AsyncStorage.setItem(DECKS_DB,
          JSON.stringify({...parsedResponse, [title]: newDeck})
        )
    });
}

export const addCardToDeck = (title, card) => {
  return getDecks()
    .then(decks => ({
        ...decks,
        [title]: {
          ...decks[title],
          questions: [...decks[title]['questions'], card]
        }
      })
    )
    .then(decks => {
      return AsyncStorage.setItem(DECKS_DB, JSON.stringify(decks));
    })
    .catch(res => {
      console.log('error', res);
    });
}

export const removeADeck = (title, deletedValue) => {
  return getDecks()
    .then(decks => {
        const {[title]: deletedValue, ...deckRest} = decks;
        return deckRest;
      }
    )
    .then(decks => {
      return AsyncStorage.setItem(DECKS_DB, JSON.stringify(decks));
    })
    .catch(res => {
      console.log('error', res);
    });
}

// {
//   React: {
//     title: 'React',
//     questions: [
//       {
//         question: 'What is React?',
//         answer: 'A library for managing user interfaces'
//       },
//       {
//         question: 'Where do you make Ajax requests in React?',
//         answer: 'The componentDidMount lifecycle event'
//       }
//     ]
//   },
//   JavaScript: {
//     title: 'JavaScript',
//     questions: [
//       {
//         question: 'What is a closure?',
//         answer: 'The combination of a function and the lexical environment within which that function was declared.'
//       }
//     ]
//   }
// }
//
// getDecks: return all of the decks along with their titles, questions, and answers.
// getDeck: take in a single id argument and return the deck associated with that id.
// saveDeckTitle: take in a single title argument and add it to the decks.
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
