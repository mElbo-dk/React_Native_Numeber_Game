import React , { useState, useRef, useEffect } from 'react'
import { View,Text, StyleSheet, Button, Alert } from 'react-native'

import NumberContainer from '../components/NumberContainer' 
import Card from '../components/Card'

const generateRandomBetween = (min,max,exclude)=>{
  min = Math.ceil(min)
  max = Math.floor(max)
  const randomNumber = Math.floor(Math.random() * (max - min) + min)
  if (randomNumber === exclude) {
    return generateRandomBetween(min,max,exclude)
  } else {
    return randomNumber
  }
}

const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = 
  useState(generateRandomBetween(1, 100 , props.userChoise)
  )
  const [rounds, setRounds] = useState(0)
  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < props.userChoise) || (direction === 'higher' && currentGuess > props.userChoise) ){
      Alert.alert('Is that correct ?', 'You pressed the wrong diretion!',[{ text: 'Sorry' , style: 'cancel' }])
      return
    } if (direction === 'lower') {
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess
    }
    const nextNumber = generateRandomBetween(currentLow.current,currentHigh.current,currentGuess)
    setCurrentGuess(nextNumber)
    setRounds( curRounds => curRounds + 1)
  }
  
  // destructure for not making useEffect render if userChoise or onGameOver changes
  const { userChoise, onGameOver } = props

  useEffect(() => {
    if (currentGuess === userChoise){
      onGameOver(rounds) 
    }

  }, [currentGuess, onGameOver , userChoise])
  
  return (
    <View style={styles.screen}>
      <Text>Computers Choise</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonsContainer}>
        <Button title='LOWER' onPress={nextGuessHandler.bind(this,'lower')}/>
        <Button title='HIGER' onPress={nextGuessHandler.bind(this,'higher')}/>
      </Card>
    </View>
  )

}

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: 300,
    maxWidth: '80%'

  }

})

export default GameScreen