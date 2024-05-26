import { StyleSheet, View } from 'react-native';
import List from './screens/List';
import Profile from './screens/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons"; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import { AuthProvider } from './context/authContext';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const MyTabs = () => {
  return (
    <Tab.Navigator initialRouteName='List' screenOptions={{
      tabBarStyle: { backgroundColor: '#1e5996', paddingBottom: 5, paddingTop: 5, borderColor: 0},
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: '#9fa3a7',
      tabBarLabelStyle:{fontSize: 13, fontWeight: 400},
    }}>
      <Tab.Screen 
      name="List" 
      component={List} 
      options={{
        headerShown: false,
        tabBarLabel: "To do",
        tabBarIcon: ({focused})=>{
          return <Ionicons 
          name="list"
          size={24} 
          color={focused ? "white" : "#9fa3a7"} 
        /> 
        }
      }}
      />
      <Tab.Screen 
      name="Profile" 
      component={Profile} 
      options={{
        headerShown: false,
        tabBarLabelStyle: {fontSize: 13},
        tabBarIcon: ({focused})=>{
          return <Ionicons 
          name="person"
          size={24} 
          color={focused ? "white" : "#9fa3a7"} 
        /> 
        }
      }}
      />
    </Tab.Navigator>
  );
};


export default function App() {

  return (
    <AuthProvider>
      <View style={{backgroundColor: "#0e274a", flex: 1}}>
          <NavigationContainer>
              <StatusBar backgroundColor="#0e274a" barStyle="light-content"/>
              <Stack.Navigator>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ headerShown: false}}
                />
                <Stack.Screen
                  name="SignUp"
                  component={SignUp}
                  options={{ headerShown: false}}
                />
                <Stack.Screen name="Main" component={MyTabs}  options={{ headerShown: false }}/>
              </Stack.Navigator>
            </NavigationContainer>
      </View>
    </AuthProvider>
    
  );
}

const styles = StyleSheet.create({

});
