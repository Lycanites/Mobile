import { useState } from "react";
import { SafeAreaView,StyleSheet,View,Text, Image } from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView} from "@react-navigation/drawer";
import Areas from "./Areas";
import Juegos from "./Juegos";
import Perfil from "./Perfil";
import Settings from "./Settings";
import MenuButtonItem from "../src/Components/MenuButtonItem";
import Login from "./Login";


const Drawer = createDrawerNavigator()

export default function Menu(){
{
    return (    
        <Drawer.Navigator  
  screenOptions={{
    headerStyle: { backgroundColor: '#34008f' }, 
    headerTintColor: 'white', 
  }}
  drawerContent={(props) => <MenuItems {...props} />}
>
  <Drawer.Screen name="Perfil" component={Perfil} />
  <Drawer.Screen name="Areas" component={Areas} />
  <Drawer.Screen name="Ajustes" component={Settings} />
  <Drawer.Screen name="Juegos" component={Juegos} />
  <Drawer.Screen name="Salir de Logus" component={Login} />
</Drawer.Navigator>

    )
}
}

const MenuItems = ( navigation ) => {
    return (
     <DrawerContentScrollView
        style={styles.container}>
            <Text style={styles.title}>Mi menu</Text>
            <MenuButtonItem
            text='Perfil'
            onPress= { () => navigation.navigate('Perfil') }
            Image={require('../../Assets/img/Perfil.png')}
            />
              <MenuButtonItem 
            text='Áreas'
            onPress= { () => navigation.navigate('Areas') }
            Image={require('../../Assets/img/Areas.png')}
            />
              <MenuButtonItem 
            text='Ajustes'
            onPress= { () => navigation.navigate('Ajustes') }
            Image={require('../../Assets/img/Ajustes.png')}
            />
              <MenuButtonItem 
            text='Juegos'
            onPress= { () => navigation.navigate('Juegos') }
            Image={require('../../Assets/img/Juegos.png')}
            />
            <MenuButtonItem 
            salida
            text='Salir de Logus'
            onPress= { () => navigation.navigate('Login') }
            Image={require('../../Assets/img/Salida.png')}
            />
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create ({
    container:{
        padding: 15,
        backgroundColor:'#34008f'
    },

    title:{
        fontSize:20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white'
    }

    
})