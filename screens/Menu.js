import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { initSound, playSound, stopSound } from '../src/Components/AudioManager';
import { getMusicEnabled } from '../src/Components/MusicControler';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigationState } from "@react-navigation/native";
import Areas from "./Areas";
import Juegos from "./Juegos";
import Perfil from "./Perfil";
import Settings from "./Settings";
import MenuButtonItem from "../src/Components/MenuButtonItem";
import Login from "./Login";
import Modos from "./Modos";

const Drawer = createDrawerNavigator();


const NavigationStateHandler = () => {
  const navigationState = useNavigationState(state => state);

  useEffect(() => {
    if (navigationState) {
      const routes = navigationState.routes;
      const currentRoute = routes[routes.length - 1];
      
      if (currentRoute?.name === 'Login' || currentRoute?.name === 'Register') {
        stopSound();
      } else {
        // Aquí podrías verificar getMusicEnabled() para decidir si reproducir o no
        const isMusicEnabled = getMusicEnabled();
        if (isMusicEnabled) {
          playSound();
        }
      }
    }
  }, [navigationState]);

  return null; 
};

const MenuItems = ({ navigation }) => {
  return (
    <DrawerContentScrollView
      style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <View style={styles.menuContainer}>
        <MenuButtonItem
          text='Perfil' 
          onPress={() => navigation.navigate('Perfil')}
          image={require('../src/Assets/img/Perfil.png')}
          style={styles.texto}
        />
        <MenuButtonItem 
          text='Areas'
          onPress={() => navigation.navigate('Areas')}
          image={require('../src/Assets/img/Areas.png')}
          style={styles.texto}
        />
        <MenuButtonItem 
          text='Ajustes'
          onPress={() => navigation.navigate('Ajustes')}
          image={require('../src/Assets/img/Ajustes.png')}
          style={styles.texto}
        />
        <MenuButtonItem 
          text='jugar'
          onPress={() => navigation.navigate('Modos')}
          image={require('../src/Assets/img/Juegos.png')}
          style={styles.texto}
        />
      </View>
      <View style={styles.logout}>
        <MenuButtonItem 
          salida
          text='Salir de Logus'
          onPress={() => navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }], 
          })}
          image={require('../src/Assets/img/Salida.png')}
          style={styles.texto}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default function Menu() {
  
  useEffect(() => {
    initSound();
  }, []);

  return (
    <>
      <NavigationStateHandler />
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#34008f' }, 
          headerTintColor: 'white', 
          headerTitleAlign: 'center'
        }}
        drawerContent={(props) => <MenuItems {...props} />}
      >
        <Drawer.Screen name="Perfil" component={Perfil} />  
        <Drawer.Screen name="Areas" component={Areas} />
        <Drawer.Screen name="Ajustes" component={Settings} />
        <Drawer.Screen 
          name="Modos" 
          component={Modos} 
          options={{
            title:'Juegos',
            headerTintColor:'white',
            headerTitleAlign:'center',
            headerStyle:{backgroundColor:'#34008f'}
          }} 
        />
        <Drawer.Screen 
          name="Salir de Logus" 
          component={Login} 
          options={{
            drawerLockMode: 'locked-closed'
          }} 
        />
      </Drawer.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flexGrow: 1,
  },
  logout: {
    marginTop: 'auto',
    marginBottom: 20,
  },
  container: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: '#34008f'
  },
  title: {
    fontSize: 20,
    fontFamily: 'CreamBeige',
    marginBottom: 20,
    color: 'white'
  },
});