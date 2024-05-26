import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function AuthPageImage({titleText, titleText2}) {
  return (
    <View style={{alignItems:"center"}}>
      <Image source={require("../assets/checklist.png")} style={{width: 60, height: 60}}/>
      <Text style={{color:"whitesmoke", fontSize: 18, padding: 10}}>{titleText}</Text>
      <Text style={{color:"whitesmoke", fontSize: 18}}>{titleText2}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})