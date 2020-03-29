import React , { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from 'react-native'

import NumberContainer from '../components/NumberContainer' 
import Card from '../components/Card'
import TitleText from '../components/TitleText'
import BodyText from '../components/BodyText'
import MainBtn from '../components/MainBtn'
import { Ionicons } from '@expo/vector-icons'
import colors from '../constants/colors'

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
  const [turnLayoutWidth, setTurnLayoutWidth] = useState(Dimensions.get('window').width)
  const [turnLayoutHeight, setTurnLayoutHeight] = useState(Dimensions.get('window').height)
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
  
  // this is done when rendering to change the layout , remove eventlistener and add one for checking 
  // if the dive turn
  useEffect(() => {
    const updateLayout = () =>{
      setTurnLayoutWidth(Dimensions.get('window').width),
      setTurnLayoutHeight(Dimensions.get('window').height)
    }

    Dimensions.addEventListener('change', updateLayout)
  
    return () => {
      Dimensions.removeEventListener('change', updateLayout)
    }

  })


  // destructure for not making useEffect render if userChoise or onGameOver changes
  const { userChoise, onGameOver } = props

  useEffect(() => {
    if (currentGuess === userChoise){
      onGameOver(pastGuesses.length) 
    }

  }, [currentGuess, onGameOver , userChoise])
  
  // to make the changes to layout when screen is changing size
  let listContainerStyle = styles.listContainer
  if (turnLayoutWidth < 350) {
    listContainerStyle = styles.listContainerBig
  }

  if (turnLayoutHeight < 500) {
    return (
      <View style={styles.screen}>
        <TitleText>Computers Choise</TitleText>
        <View style = {styles.turnLayout}>
          <MainBtn onPressBtn={nextGuessHandler.bind(this,'lower')}><Ionicons name='md-remove' size={20}/> </MainBtn>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainBtn onPressBtn={nextGuessHandler.bind(this,'higher')}><Ionicons name='md-add' size={20}/></MainBtn>
        </View>
        <View style = {listContainerStyle}>
          {/* <ScrollView contentContainerStyle = {styles.list}>{pastGuesses.map((guess, index) => listValueHandeler(guess, pastGuesses.length  - index))}</ScrollView> */}
          <FlatList keyExtractor={(item) => item} 
            data={ pastGuesses } 
            renderItem={listValueHandeler.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}/>
        </View>
      </View>

    )
  }



  return (
    <View style={styles.screen}>
      <TitleText>Computers Choise</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonsContainer}>
        <MainBtn onPressBtn={nextGuessHandler.bind(this,'lower')}><Ionicons name='md-remove' size={20}/> </MainBtn>
        <MainBtn onPressBtn={nextGuessHandler.bind(this,'higher')}><Ionicons name='md-add' size={20}/></MainBtn>
      </Card>
      <View style = {listContainerStyle}>
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
    marginTop: Dimensions.get('window').height > 600 ? 30 : 10,
    width: 300,
    maxWidth: '80%'
  },

  turnLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '60%'

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
    flex: 1,
    width: Dimensions.get('window').width > 600 ? '50%' : '80%'
    
  },
  listContainerBig: {
    flex: 1,
    width: Dimensions.get('window').width > 600 ? '50%' : '80%'
  }
})

export default GameScreen