import { Button, Pressable, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native'
import {useContext, useEffect, useState} from 'react';
import AuthPageImage from '../compoenent/AuthPageImage';
import { AuthContext } from '../context/authContext';
import axios from 'axios';


export default function Login({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {userInfo, login} = useContext(AuthContext);
    const [isLoading, setLoading] = useState(false)


    useEffect(()=>{
      if(userInfo){
        navigation.replace('Main')
      }
    },[userInfo])

    const gotoSignUp = ()=>{
        navigation.navigate('SignUp')
    }

    const signInUser = async()=>{ 
      try{
        
        if (email && password) {
          setLoading(true)
          let { data } = await axios.post("http://192.168.29.92:5000/api/user/login", {
            email: email,
            password: password
          });
          
          if (data) {
            login(data);
            setLoading(false)
          }
        }
        else {
          // messageHandler("Please fill all the fields")
        }
      }
      catch({response: {data}}){
        // messageHandler(data.message)
        setLoading(false)
      }
    }

  return (
    <View style={{backgroundColor:"#0e274a", flex:1, justifyContent: "center"}}>
      <View style={{margin: 20, padding: 20, borderWidth: 1, borderRadius: 10, backgroundColor: "#ffffff12", borderColor: "#ffffff37"}}>
        <AuthPageImage titleText="Sign In" titleText2="To Continue Your Journey😊" />
        <View style={{marginTop: 30}}>
            <Text style={{color: "whitesmoke", marginLeft: 3}}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Type your Email"
                placeholderTextColor={"#b8b8b8"}
                onChangeText={(newText) => setEmail(newText)}
            />
            <Text style={{color: "whitesmoke", marginLeft: 3, marginTop: 15}}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Type your Password"
                placeholderTextColor={"#b8b8b8"}
                secureTextEntry={true}
                onChangeText={(newText) => setPassword(newText)}
            />
        </View>
        <Pressable style={{backgroundColor: "#1e5996", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 30, flexDirection:"row", justifyContent:"center"}} onPress={signInUser}>
            {isLoading ? <ActivityIndicator/>: <Text style={{color:"whitesmoke", fontSize: 15, fontWeight: "600", marginRight: 10}}>Login</Text>}
        </Pressable>
        <View style={{marginTop: 15, flexDirection: "row"}}>
            <Text style={{color: "#ffffffc9"}}>Start a new journey?</Text><Pressable onPress={gotoSignUp}>
            <Text style={{
                    textDecorationLine: 'underline',
                    marginLeft: 3,
                    color: "hsl(210,77%,46%)"
                }}>Sign Up</Text>
            </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({ input: {
    height: 35,
    borderRadius: 5,
    padding: 8,
    backgroundColor: "white",
    fontWeight: "700",
    marginVertical: 8
  }})