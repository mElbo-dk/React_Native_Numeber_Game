import React from 'react'
import { StyleSheet, Button, Image, View } from 'react-native'

import Card from '../components/Card'
import Colors from '../constants/colors'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'

const GameOverScreen = props => {
  return (
    <Card style={styles.gameOver}>
      <TitleText>GameOver</TitleText>
      <Image source={require('../assets/success.png') } style={styles.image}/>
      <BodyText>The number was guessed in {props.roundsNumber} guesses.</BodyText>
      <BodyText>The number was {props.userNumber}.</BodyText>
      <Button title='Restart game' onPress={props.onRestart}/>
    </Card>
  )
}

const styles = StyleSheet.create({

  gameOver: {
    
    padding: 10,
    color: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center' 
    
  },
  image: {
    height: '46%',
    width: '60%',
    borderWidth: 2,
    borderRadius: 200
    
    
  }
  

})

export default GameOverScreen