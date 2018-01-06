import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native'

const styles = StyleSheet.create({
  btn: {
    
  }
});

export const StyledButton = (text, onPress) => (
  <TouchableOpacity onPress={onPress}>
    <View>
      <Text>{text}</Text>
    </View>
  </TouchableOpacity>
)
