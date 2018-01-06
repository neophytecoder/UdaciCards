import React from 'react'
import {View, Text, StatusBar, StyleSheet } from 'react-native'
import { Constants } from 'expo'

const MyStatusBar = ({backgroundColor, title, ...props}) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    <Text>
      {title}
    </Text>
  </View>
)

export { MyStatusBar };
