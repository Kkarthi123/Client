import { FlatList, Pressable, SectionList, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import { useState, useRef, useContext, useEffect  } from 'react';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/authContext';
import { LinearGradient } from "expo-linear-gradient";
import axios from 'axios';



export default function List({navigation}) {
  const [text, setText] = useState('');
  const [list, setList] = useState([]);
  const [editedTodoIdx, setEditedTodoIdx] = useState(null);
  const inputRef = useRef();
  const {userInfo} = useContext(AuthContext);



  const config = {
    authorization: `Bearer ${userInfo?.token}`
  }

  useEffect(()=>{
    async function fetchList() {
      axios.get("http://192.168.29.92:5000/getList", { headers: config}).then((allList)=>{
        console.log(allList.data, "getting")
        setList(allList.data)
      });
    }
    if(!userInfo){
      navigation.replace("Login")
    }else{
      fetchList()
    }
  }, [])

  const addItem = ()=>{
    if(text){
      if(editedTodoIdx!=null){

        axios.put("http://192.168.29.92:5000/updateItem", {
          oldItem: list[editedTodoIdx],
          newItem: text
        }, { headers: config})
        list[editedTodoIdx] = text;

        console.log(list, "added")
        setEditedTodoIdx(null)
      }else{
        axios.post('http://192.168.29.92:5000/list', {
          todo: text
        }, { headers: config}).then(() => {
          setList([text, ...list]);
        })
      }
  
      setText("");
    }else{
      inputRef.current.focus();
    }
  }

  const editItem = (toDoItem, i)=>{
    setText(toDoItem);
    setEditedTodoIdx(i);
    inputRef.current.focus();
  }

  const deleteItem = (toDoId)=>{
    let newTodo = list.filter((data, id)=>{ return id!=toDoId });
    axios.post('http://192.168.29.92:5000/deleteList', {todo: list[toDoId]}, { headers: config})
    setList(newTodo)
  }

  const TodoComp = ({data, idx})=>{
    return(
      <View style={{ fontSize: 25, backgroundColor: "#ffffff14", marginVertical: 8, padding: 8, borderRadius: 5, flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#ffffff30"}} key={idx}>
        <Text id={data} style={{ fontWeight: "600", flex: 1, color: "#d2d2d2" }}>{data}</Text>
        <Pressable onPress={() => { editItem(data, idx) }} style={{ marginRight: 12, bottom: -1 }}>
          <FontAwesome name="edit" size={18} color="#148d46bd" />
        </Pressable>
        <Pressable onPress={() => { deleteItem(idx) }}>
          <MaterialIcons name="delete" size={18} color="#a53131" />
        </Pressable>
      </View>
    )
  }
    
  const EmptyTodoTemplate = ()=>{
    return(
      <View style={{alignItems: "center", justifyContent: "center"}}>
        <Image source={require("../assets/todo.png")} style={{width: 250, height: 250, opacity: 0.4}}/>
        <Text style={{color: "whitesmoke", opacity: 0.5, marginTop: 10, fontSize: 18}}>Start Adding Your Task!</Text>
      </View>
    )
  }
  return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{ flex: 1, backgroundColor: "#0e274a", padding: 10 }}>
          <View style={{justifyContent: "center", alignItems:"center"}}>
            <Text style={{color: "#0096c7", fontSize: 20}}>Welcome {userInfo.name}😊</Text>
          </View>
          <View style={{ margin: 10, marginTop: 20 }}>
            <TextInput
              style={styles.input}
              placeholder="Type Your Todo Here..."
              placeholderTextColor={"#b8b8b8"}
              value={text}
              onChangeText={(newText) => setText(newText)}
              ref={inputRef}
            />
            <Pressable onPress={addItem} style={{ backgroundColor: "#1e5996", padding: 10, marginTop: 20, borderRadius: 20, alignItems: "center" }}>
              <Text style={{ color: "whitesmoke", fontWeight: "600", fontSize: 15 }}>{editedTodoIdx!=null ? "Update" : "Add"}</Text>
            </Pressable>
          </View>
          <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
            <FlatList
              data={list}
              renderItem={({ item, index }) => <TodoComp data={item} idx={index} />}
              style={{ marginBottom: 20 }}
            />
              {
                list.length <= 0 && <EmptyTodoTemplate />
              }
          </View>
        </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "white",
    fontWeight: "700"
  },

})