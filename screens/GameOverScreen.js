import React from 'react'
import { Text, StyleSheet, Button } from 'react-native'

import Card from '../components/Card'
import Colors from '../constants/colors'

const GameOverScreen = props => {
  return (
    <Card style={styles.gameOver}>
      <Text>GameOver</Text>
      <Text>The number was guessed in {props.roundsNumber} guesses.</Text>
      <Text>The number was {props.userNumber}.</Text>
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
    
  }

})

export default GameOverScreen