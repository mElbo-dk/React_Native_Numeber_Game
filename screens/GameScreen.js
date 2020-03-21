import React , { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Alert, ScrollView, FlatList } from 'react-native'

import NumberContainer from '../components/NumberContainer' 
import Card from '../components/Card'
import TitleText from '../components/TitleText'
import BodyText from '../components/BodyText'
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

const listValueHandeler = (listLength, itemData) => (
  <View style = {styles.listItems}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View> 
)

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100 , props.userChoise)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])
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
    setPastGuesses( curPastGuesses => [nextNumber.toString() , ...curPastGuesses])
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
      <View style = {styles.listContainer}>
        {/* <ScrollView contentContainerStyle = {styles.list}>{pastGuesses.map((guess, index) => listValueHandeler(guess, pastGuesses.length  - index))}</ScrollView> */}
        <FlatList keyExtractor={(item) => item} 
          data={ pastGuesses } 
          renderItem={listValueHandeler.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}/>
      </View>
    </View>
  )

}



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
    
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: 300,
    maxWidth: '80%'
  },

  list: {
    flexGrow: 1,
    // backgroundColor: 'green',
    alignContent: 'center',
    justifyContent: 'flex-end'
    
    
  },

  listItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1 , 
    borderColor: '#ccc',
    borderRadius: 20,
    // backgroundColor: 'yellow',
    marginVertical: 5,
    padding: 15 
    
  },
  listContainer: {
    width: 200,
    maxWidth: '50%',
    height: '60%',
    maxHeight: '50%'
    
  }

})

export default GameScreen