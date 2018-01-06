import React from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: Platform.OS === 'ios'? 16 : 2,
    padding: 20,
    margin: 10,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  }
})

export const IndividualCard = ({title, totalQuestions}) => (
  <View style={styles.card}>
    <Text>{title}</Text>
    <Text>{totalQuestions} questions</Text>
  </View>
)
