import { useState } from "react";
import { SafeAreaView,StyleSheet,View,Text, Image } from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView} from "@react-navigation/drawer";
import Areas from "./Areas";
import Juegos from "./Juegos";
import Perfil from "./Perfil";
import Settings from "./Settings";
import MenuButtonItem from "../src/Components/MenuButtonItem";


const Drawer = createDrawerNavigator()

export default function Menu(){
{
    return (    
        <Drawer.Navigator
        drawerContent={ (props) => <MenuItems {...props} />}>
            <Drawer.Screen name="Perfil" component={Perfil} />
            <Drawer.Screen name="Areas" component={Areas}/>
            <Drawer.Screen name="Ajustes" component={Settings}/>
            <Drawer.Screen name="Juegos" component={Juegos}/>
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
            />
              <MenuButtonItem 
            text='Areas'
            onPress= { () => navigation.navigate('Areas') }
            />
              <MenuButtonItem 
            text='Ajustes'
            onPress= { () => navigation.navigate('Ajustes') }
            />
              <MenuButtonItem 
            text='Juegos'
            onPress= { () => navigation.navigate('Juegos') }
            />
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create ({
    container:{
        padding: 15,
    },

    title:{
        fontSize:20,
        fontWeight: 'bold',
        marginBottom: 20,
    }

    
})