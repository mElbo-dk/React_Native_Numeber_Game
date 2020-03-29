import React, { useState } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import * as Fonts from  'expo-font'
import { AppLoading } from 'expo'

import Header from './components/Header'

import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

const getFonts = () => {
  return Fonts.loadAsync({
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf')

  })
}

export default function App() {
  const [userNumber,setUserNumber] = useState()
  const [gameRounds, setGameRounds] = useState(0)
  const [fontLoaded, setFontLoaded] = useState(false)
  
  if (!fontLoaded) {
    return <AppLoading  startAsync={getFonts}
      onFinish ={() => setFontLoaded(true)}
      onError = {(err) => console.log(err)
      }
    />
  }
  const newgameHandler = () => {
    setGameRounds(0)
    setUserNumber(null)

  }


  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber)
    
  }

  const gameRoundsHandler = numOfRounds => {
    setGameRounds(numOfRounds)
  }

  let content =  <StartGameScreen onStartGame={startGameHandler}/>

  if (userNumber && gameRounds <= 0) {
    content = <GameScreen userChoise={userNumber} onGameOver={gameRoundsHandler}/>
  } else if (gameRounds > 0 ){
    content = <GameOverScreen roundsNumber={gameRounds} userNumber={userNumber} onRestart={newgameHandler}/> 
  }

  

  return (
    <SafeAreaView style={styles.screen}>
      <Header title='Guess Number Game'/>
      {content}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    fontFamily: 'open-sans-bold'

  }
  
})
