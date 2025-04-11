import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './screens/Login';
import Menu from './screens/Menu';
import Register from './screens/Register';

import Memoria from './screens/Memoria';
import Logica from './screens/Logica';
import Lectura from './screens/Lectura';
import Cultura from './screens/Cultura';
import Analisis from './screens/Analisis';

import Loading1 from './screens/Loading';
import Loading2 from './screens/Loading2';
import Loading3 from './screens/Loading3';
import Loading4 from './screens/Loading4';
import Loading5 from './screens/Loading5';
import Juegos from './screens/Juegos';
import Fiesta from './screens/Fiesta';
import Zen from './screens/Zen';
import ZenJuegos from './screens/ZenJuego';

import FiestaJuegos from './screens/FiestaJuego';
import { initSound, playSound, stopSound } from './src/Components/AudioManager';
import { getMusicEnabled } from './src/Components/MusicControler';

export default function App() {
  const Stack = createStackNavigator();

  useEffect(() => {
    initSound();
  }, []);

  const handleStateChange = async (state) => {
    const route = state.routes[state.index];
    const routeName = route?.name;

    // Detener música en Login y Register
    if (routeName === 'Login' || routeName === 'Register') {
      stopSound();
      return;
    }

    // Reproducir o detener según el estado
    const enabled = await getMusicEnabled();
    if (enabled) {
      playSound();
    } 
  };

  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            headerShown: false,
            title: 'Logus',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#34008f' },
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'LOGIN',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#34008f' },
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: 'LOGIN',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#34008f' },
          }}
        />
        <Stack.Screen
          name="Juegos"
          component={Juegos}
          options={{
            title: 'Juegos',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#34008f' },
          }}
        />
        <Stack.Screen
          name="Memoria"
          component={Memoria}
          initialParams={{ isSoundEnabled: false }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Logica"
          component={Logica}
          initialParams={{ isSoundEnabled: false }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Lectura"
          component={Lectura}
          initialParams={{ isSoundEnabled: false }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Cultura"
          component={Cultura}
          initialParams={{ isSoundEnabled: false }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Analisis"
          component={Analisis}
          initialParams={{ isSoundEnabled: false }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoadingM"
          component={Loading1}
          initialParams={{ isSoundEnabled: false }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoadingL"
          component={Loading2}
          initialParams={{ isSoundEnabled: false }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Loadingl"
          component={Loading3}
          initialParams={{ isSoundEnabled: false }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoadingC"
          component={Loading4}
          initialParams={{ isSoundEnabled: false }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoadingA"
          component={Loading5}
          initialParams={{ isSoundEnabled: false }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FiestaL"
          component={Fiesta}
          initialParams={{ isSoundEnabled: false }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FiestaJuego"
          component={FiestaJuegos}
          initialParams={{ isSoundEnabled: false }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ZenL"
          component={Zen}
          initialParams={{ isSoundEnabled: false }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ZenJuego"
          component={ZenJuegos}
          initialParams={{ isSoundEnabled: false }}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer onStateChange={handleStateChange}>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
