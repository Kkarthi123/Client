import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import {useState, useContext, useEffect} from 'react';
import AuthPageImage from '../compoenent/AuthPageImage';
import { AuthContext } from '../context/authContext';
import axios from 'axios';


export default function SignUp({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [cPassword, setConfirmPassword] = useState('');
    const {userInfo, login} = useContext(AuthContext);


    useEffect(()=>{
        if(userInfo){
            console.log(userInfo,"l")
            navigation.replace('Main', {screen: "Profile"})
        }
    }, [userInfo])
      

    const registerNewUser = async()=>{
        try{
            if(user && email && password && cPassword){
              if(password !== cPassword){
                messageHandler("Password Doesn't match")
              }else{
                let {data} = await axios.post("http://192.168.29.92:5000/api/user/create",{
                  name: user,
                  email: email,
                  password: password
                });
                if(data){
                  console.log("ddd", data)
                  login(data)
                }
              }
            }
            else{
            //   messageHandler("Please fill all the fields")
            }
          }
          catch({response: {data}}){
            //   messageHandler(data.message)
          }
    }
    

    const gotoLogin = ()=>{
        navigation.push('Login')
    }


  return (
    <View style={{backgroundColor:"#0e274a", flex:1, justifyContent: "center"}}>
    <View style={{margin: 20, padding: 20, borderWidth: 1, borderRadius: 10, backgroundColor: "#ffffff12", borderColor: "#ffffff37"}}>
      <AuthPageImage titleText="Sign Up" titleText2="To Start a New Journey😊" />
      <View style={{marginTop: 30}}>
         <Text style={{color: "whitesmoke", marginLeft: 3}}>Name</Text>
          <TextInput
              style={styles.input}
              placeholder="Type your Name"
              placeholderTextColor={"#b8b8b8"}
              onChangeText={(newText) => setUser(newText)}
          />
          <Text style={{color: "whitesmoke", marginLeft: 3, marginTop: 5}}>Email</Text>
          <TextInput
              style={styles.input}
              placeholder="Type your Email"
              placeholderTextColor={"#b8b8b8"}
              onChangeText={(newText) => setEmail(newText)}
          />
          <Text style={{color: "whitesmoke", marginLeft: 3, marginTop: 5}}>Password</Text>
          <TextInput
              style={styles.input}
              placeholder="Type your Password"
              placeholderTextColor={"#b8b8b8"}
              secureTextEntry={true}
              onChangeText={(newText) => setPassword(newText)}
          />
          <Text style={{color: "whitesmoke", marginLeft: 3, marginTop: 5}}>Confirm Password</Text>
          <TextInput
              style={styles.input}
              placeholder="Type your confirm password"
              placeholderTextColor={"#b8b8b8"}
              secureTextEntry={true}
              onChangeText={(newText) => setConfirmPassword(newText)}
          />
      </View>
      <Pressable style={{backgroundColor: "#1e5996", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 30}} onPress={registerNewUser}>
          <Text style={{color:"whitesmoke", fontSize: 15, fontWeight: "600"}}>Register</Text>
      </Pressable>
      <View style={{marginTop: 15, flexDirection: "row"}}>
          <Text style={{color: "#ffffffc9"}}>Already in journey?</Text><Pressable onPress={gotoLogin}>
          <Text style={{
                  textDecorationLine: 'underline',
                  marginLeft: 3,
                  color: "hsl(210,77%,46%)"
              }}>Sign In</Text>
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
    marginVertical: 7
  }})