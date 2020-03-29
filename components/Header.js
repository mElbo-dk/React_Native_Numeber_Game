import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'

import Color from '../constants/colors'
import TitleText from '../components/TitleText'

const Header = props => {
  return (
    <View style={styles.header}>
      <TitleText style={styles.headerTitle}>{props.title}</TitleText>
    </View>

  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Platform.OS === 'ios' ?  'white' : Color.primary,
    justifyContent: 'center'

  },
  headerTitle: {
    textAlign: 'center'
  }
})

export default Header