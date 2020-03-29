import React from 'react'
import { StyleSheet, Button, Image, View, Text, Dimensions, ScrollView } from 'react-native'

import Card from '../components/Card'
import Colors from '../constants/colors'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainBtn from '../components/MainBtn'


const GameOverScreen = props => {
  return (
    <ScrollView >
      <Card style={styles.gameOver}>
        <TitleText>GameOver</TitleText>
        <View style={styles.imageContainer}>
          <Image fadeDuration={1000} source={require('../assets/success.png') } style={styles.image}/>
        </View>
        <View style={styles.textContainer}>
          <BodyText style={styles.resultText}>The number <Text style={styles.highlight}>{props.userNumber}</Text> was guessed by your phone in <Text style={styles.highlight}>{props.roundsNumber}</Text> guesses.</BodyText>
        </View>
        <MainBtn onPressBtn={props.onRestart}>
      Restart Game
        </MainBtn>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

  gameOver: {
    
    padding: 10,
    color: Colors.secondary,
    alignItems: 'center'
    // justifyContent: 'center'  
  },

  imageContainer: {
    margin: 30,
    width: Dimensions.get('window').width * 0.7 ,
    height: Dimensions.get('window').width * 0.7,
    borderWidth: 2,
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30 
  },

  image: {
    height: '100%',
    width: '100%'
  },

  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
    
  },
  textContainer: {
    marginHorizontal: 30,
    marginVertical: 15
  },

  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height > 600 ? 16 : 20,
    padding: 30
  }
  

})

export default GameOverScreen