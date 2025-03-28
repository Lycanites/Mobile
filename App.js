import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet,View,Text } from 'react-native';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Menu from './screens/Menu';
import Register from './screens/Register';
import Perfil from './screens/Perfil';



export default function App() {

  const Stack = createStackNavigator()
  
  function MyStack() {
    return(
     <Stack.Navigator>
        <Stack.Screen name='Menu' component={Menu} 
        options={{
          headerShown: false,
          title:'Logus',
          headerTintColor:'white',
          headerTitleAlign:'center',
          headerStyle:{backgroundColor:'#34008f'}
        }}/>
        <Stack.Screen name='Login' component={Login}
      options={{
        title:'LOGIN',
        headerTintColor:'white',
        headerTitleAlign:'center',
        headerStyle:{backgroundColor:'#34008f'}
      }}/>
       <Stack.Screen name='Register' component={Register}
      options={{
        headerShown: false,
        title:'LOGIN',
        headerTintColor:'white',
        headerTitleAlign:'center',
        headerStyle:{backgroundColor:'#34008f'}
      }}/>
     </Stack.Navigator>
    )
  }
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})