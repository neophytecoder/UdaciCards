import {StackNavigator, TabNavigator} from 'react-navigation'
import {Home, CreateDeck, DeckDetail, AddCard, Quiz} from '../components'
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react'

export const tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: () => (
        <Icon name='ios-home' size={30} color='black'/>
      )
    }
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarIcon: () => (
        <Icon name='ios-create' size={30} color='black'/>
      )
    }
  },
})

export const RootNavigator = StackNavigator({
  Tabs: {
    screen: tabs
  },
  DeckDetail: {
    screen: DeckDetail
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen: Quiz
  }
});
