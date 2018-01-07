import React from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#EFEBE9',
    borderRadius: Platform.OS === 'ios'? 12 : 2,
    margin: 10,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    alignItems: 'stretch',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  child1: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 15,
    paddingTop: 10
  },
  child2: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#D7CCC8',
  },
  buttonText: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 15
  },
  divider: {
    backgroundColor: '#A1887F',
    width: 2
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  questions: {
    fontSize: 15,
    marginTop: 5
  }
})

export const IndividualCard = ({title, totalQuestions, startQuiz, deleteDeck}) => (
  <View style={styles.card}>
    <View style={styles.child1}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.questions}>{totalQuestions} questions</Text>
    </View>
    <View style={styles.child2}>
      <TouchableOpacity onPress={startQuiz} style={{flex: 1}}>
        <View>
          <Text  style={styles.buttonText}>Start quiz</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity onPress={deleteDeck} style={{flex: 1}}>
        <View>
          <Text  style={styles.buttonText}>Delete</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
)
