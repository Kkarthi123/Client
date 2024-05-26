import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../context/authContext';
import {useContext, useEffect, useState} from 'react';



export default function Profile({navigation}) {
  const {userInfo, logOut} = useContext(AuthContext);

  const signOut = ()=>{
    logOut();
    navigation.replace("Login")
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#0e274a", padding: 10, justifyContent:"center", alignItems: "center"}}>
      <View style={{alignItems: "center", width: 250, height: "auto", borderWidth: 1, borderRadius:10, backgroundColor: "#ffffff14", borderColor: "#ffffff38",position: "relative", padding: 25, paddingTop: 40}}>
         <Pressable style={{padding: 2, paddingHorizontal: 8, backgroundColor: "#3e637a", borderRadius: 5, position: "absolute", right: 10, top: 10, justifyContent:"center", flex: 1, flexDirection:"row", alignItems: "center", columnGap: 5}} onPress={signOut}>
           <Text style={{textAlign: "center", color: "white"}}>Logout</Text><Feather name="lock" size={14} color="white"/>
          </Pressable>
        <View style={{borderWidth: 2, borderColor: "#051d33", padding: 10, borderRadius: 70, width: 90, height: 90, alignItems:"center"}}>
          <FontAwesome5 name="user-alt" size={60} color="#051d33"/>        
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={{color: "rgb(212 212 212)", fontSize: 20}}>{userInfo.name}</Text>
        </View>
        <View>
          <Text style={{color: "whitesmoke", fontSize: 15, fontStyle: "italic"}}>{userInfo.email}</Text>
        </View>
        <View style={{padding: 5, paddingVertical: 8, marginTop: 30, backgroundColor: "#1e5996", width: 100, borderRadius: 5}}>
          <Pressable>
            <Text style={{textAlign: "center", color: "whitesmoke"}}>Edit</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>  
  )
}

const styles = StyleSheet.create({})