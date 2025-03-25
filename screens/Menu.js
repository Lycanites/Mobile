import { useState } from "react";
import { SafeAreaView,StyleSheet,View,Text, Image } from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView} from "@react-navigation/drawer";
import Inicio from "./Settings";
import Areas from "./Areas";
import Juegos from "./Juegos";
import { Colors } from "react-native/Libraries/NewAppScreen";


const Drawer = createDrawerNavigator()

export default function Menu(){
{
    return (

        <SafeAreaView style={styles.container}>
            <View style={{justifyContent: 'flex-start'}}>
            <Image source={require('../Assets/img/Logo.jpeg')} style={{
                flex:1,
                justifyContent: 'center',
                alignItems: 'center',
                resizeMode: 'cover',
            }}/>
            </View>
        </SafeAreaView>
    )
}
}

const MenuItems = ( navigation ) => {
    return (
        <DrawerContentScrollView>
            <Text>Mi menu</Text>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create ({
    container:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center'
    },
})