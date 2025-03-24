import { useState } from "react";
import { StyleSheet,View,Text } from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView} from "@react-navigation/drawer";
import Inicio from "./Inicio";
import Areas from "./Areas";
import Juegos from "./Juegos";


const Drawer = createDrawerNavigator()

export default function Menu(){
{
    return (
       <Drawer.Navigator
       drawerContent={ (props) => <MenuItems {...props} />}>
        <Drawer.Screen  name="Inicio" component={ Inicio }/>
        <Drawer.Screen  name="Areas" component={ Areas }/>
        <Drawer.Screen  name="Jugar" component={ Juegos }/>
       </Drawer.Navigator>
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

})