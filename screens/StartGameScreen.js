import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Button, Keyboard, TouchableWithoutFeedback, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native'

import Color from '../constants/colors'
import Card from '../components/Card'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainBtn from '../components/MainBtn'


const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('')
  const [confirmed , setConfirmed] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState()
  const [buttonWidth, setButtonWith] = useState(Dimensions.get('window').width / 4)

  const inputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''))
  }
  
  const resetInputHandler = () => {
    setEnteredValue('')
    setConfirmed(false)   
  }

  
  // this is when a change is happening check runs for the screen size
  useEffect(() => {
    const updateLayout = () => {
      setButtonWith(Dimensions.get('window').width / 4 )
    }
    // adding event listener
    Dimensions.addEventListener('change', updateLayout)
    
    // this removes the eventlistener before making a new
    return () => {
      Dimensions.removeEventListener('change', updateLayout)
         
    }
  })


  // input handler for typing correct number
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue)
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
      Alert.alert('Invalid input!',
        'Number must be between 0 - 99', [{ text: 'OK', style: 'destructive', onPress: resetInputHandler }])
      return
    }
    setConfirmed(true)
    setSelectedNumber(chosenNumber)
    setEnteredValue('')
    Keyboard.dismiss()
  }

 
  // function to set the value for the game 
  let confirmedOutput

  if (confirmed) {
    confirmedOutput = 
    <Card style={styles.numberContainer}>
      <BodyText>You Selected</BodyText>
      <NumberContainer>{selectedNumber}</NumberContainer>
      <MainBtn onPressBtn={() => props.onStartGame(selectedNumber)}>
          START GAME
      </MainBtn>
    </Card>
  }


  // Render on the screen 
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset='30'>
        <TouchableWithoutFeedback 
          onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen} >
            <TitleText>Guess a Number!</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Select a number</BodyText>
              <Input style={styles.input} 
                keyboardType='number-pad' 
                blurOnSubmit
                autoCapitalize='none' 
                maxLength={2}
                onChangeText={inputHandler}
                value={enteredValue}/>
              <View style={styles.buttonContainer}>
                <View style={{ width: buttonWidth }}><Button title='Reset' color={Color.secondary} onPress={resetInputHandler}/></View>
                <View style={{ width: buttonWidth }}><Button title='Confirm' color={Color.primary} onPress={confirmInputHandler}/></View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    padding: 10 ,
    alignItems: 'center',
    justifyContent: 'flex-start'
    
  },

  title: {
    fontSize: 20,
    marginVertical: 10
  },

  inputContainer: {
    // width: Dimensions.get('screen').width / 2,
    maxWidth: '80%',
    padding: 10,
    alignItems: 'center'
  },

  buttonContainer: {
    flexDirection: 'row',
    // width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
   
  },

  // btn: {
  // width: '100%'
  //   width: Dimensions.get('screen').width / 4
  // },

  input: {
    width: 50,
    textAlign: 'center'
  },

  numberContainer: {
    padding: 10,
    marginVertical: 10,
    alignItems: 'center'
  }


})

export default StartGameScreen