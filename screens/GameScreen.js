import React , { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Button, Alert, ScrollView, Text } from 'react-native'

import NumberContainer from '../components/NumberContainer' 
import Card from '../components/Card'
import TitleText from '../components/TitleText'
import MainBtn from '../components/MainBtn'
import { Ionicons } from '@expo/vector-icons'

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
  const initialGuess = generateRandomBetween(1, 100 , props.userChoise)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [pastGuesses, setPastGuesses] = useState([initialGuess])
  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < props.userChoise) || (direction === 'higher' && currentGuess > props.userChoise) ){
      Alert.alert('Is that correct ?', 'You pressed the wrong diretion!',[{ text: 'Sorry' , style: 'cancel' }])
      return
    } if (direction === 'lower') {
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess + 1

    }
    // creating next number for the guess
    const nextNumber = generateRandomBetween(currentLow.current,currentHigh.current,currentGuess)
    // setting next number in state
    setCurrentGuess(nextNumber)
    // sending old numbers 
    setPastGuesses( curPastGuesses => [nextNumber, ...curPastGuesses])
  }
  
  // destructure for not making useEffect render if userChoise or onGameOver changes
  const { userChoise, onGameOver } = props

  useEffect(() => {
    if (currentGuess === userChoise){
      onGameOver(pastGuesses.length) 
    }

  }, [currentGuess, onGameOver , userChoise])
  
  return (
    <View style={styles.screen}>
      <TitleText>Computers Choise</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonsContainer}>
        <MainBtn onPressBtn={nextGuessHandler.bind(this,'lower')}><Ionicons name='md-remove' size={20}/> </MainBtn>
        <MainBtn onPressBtn={nextGuessHandler.bind(this,'higher')}><Ionicons name='md-add' size={20}/></MainBtn>
      </Card>
      <ScrollView>
        {pastGuesses.map(guess => 
          <View key={guess}>
            <Text>{guess}</Text>
          </View>)}
      </ScrollView>
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