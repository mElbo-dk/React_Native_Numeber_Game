
import React from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'

import Colors from '../constants/colors'

const MainBtn = props => {
  return (
    <TouchableOpacity onPress={ props.onPressBtn}>
      <View style = {styles.button}>
        <Text style={styles.text}>{props.children}</Text>
      </View> 
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12 ,
    paddingHorizontal: 30
  },
  text: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18
  }

})

export default MainBtn
