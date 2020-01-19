import React from 'react'
import { View, StyleSheet } from 'react-native'

const Card = props => {
  return (
    //the ...props.style is used to overwrite with the local created styling to card object.
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    shadowColor: 'black',               // only ios
    shadowOffset: { width: 0, height: 2 },// only ios
    shadowOpacity: 0.26,// only ios
    shadowRadius: 6,// only ios
    elevation: 5,  //only android
    borderRadius: 20
  }

})

export default Card