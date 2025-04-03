import { useState } from "react";
import { SafeAreaView,StyleSheet,View,Text, Image } from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView} from "@react-navigation/drawer";
import Areas from "./Areas";
import Juegos from "./Juegos";
import Perfil from "./Perfil";
import Settings from "./Settings";
import MenuButtonItem from "../src/Components/MenuButtonItem";
import Login from "./Login";
import { useSound } from "../src/Components/useSounds";


const Drawer = createDrawerNavigator()

export default function Menu(){

  useSound(require('../src/Music/backmusic.mp3'), true);
{
    return (    
        <Drawer.Navigator  
  screenOptions={{
    headerStyle: { backgroundColor: '#34008f' }, 
    headerTintColor: 'white', 
    headerTitleAlign: 'center'
  }}
  drawerContent={(props) => <MenuItems {...props} />}
>
  <Drawer.Screen name="Areas" component={Areas} />
  <Drawer.Screen name="Perfil" component={Perfil} />
  <Drawer.Screen name="Ajustes" component={Settings} />
  <Drawer.Screen name="Juegos" component={Juegos} />
  <Drawer.Screen name="Salir de Logus" component={Login} options={{
    drawerLockMode: 'locked-closed'}} />
</Drawer.Navigator>

    )
}
}

const MenuItems = ({ navigation }) => {
    return (
     <DrawerContentScrollView
        style={styles.container}>
            <Text style={styles.title}>Menú</Text>
            <View style={ styles.menuContainer }>
            <MenuButtonItem
            text='Perfil'
            onPress= { () => navigation.navigate('Perfil') }
            image={require('../src/Assets/img/Perfil.png')}
            />
              <MenuButtonItem 
            text='Áreas'
            onPress= { () => navigation.navigate('Areas') }
            image={require('../src/Assets/img/Areas.png')}
            />
              <MenuButtonItem 
            text='Ajustes'
            onPress= { () => navigation.navigate('Ajustes') }
            image={require('../src/Assets/img/Ajustes.png')}
            />
              <MenuButtonItem 
            text='Juegos'
            onPress= { () => navigation.navigate('Juegos') }
            image={require('../src/Assets/img/Juegos.png')}
            />
            </View>
            <View style={ styles.logout }>
            <MenuButtonItem 
            salida
            text='Salir de Logus'
            onPress= { () => navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }], 
            }) }
            image={require('../src/Assets/img/Salida.png')}
            />
            </View>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create ({
    menuContainer: {
      flexGrow: 1,
    },

    logout:{
      marginTop: 'auto',
      marginBottom: 20,
      
    },

    container:{
        flexGrow:1,
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