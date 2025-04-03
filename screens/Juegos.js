import { useState } from "react";
import { StyleSheet,View,Text, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';

export default function Juegos(){

    const navigation = useNavigation(); 

    return(
        <View style={styles.container}> 
    <TouchableOpacity style={styles.button1}
      onPress= { () => navigation.reset({
    
      routes: [{ name: 'A' }], 
    }) }>
    <Text style={styles.textbutton}>Memoria</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button1}
      onPress= { () => navigation.reset({
    
      routes: [{ name: 'A' }], 
    }) }>
    <Text style={styles.textbutton}></Text>
    </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create ({
   container:{
        alignItems:'center',
        justifyContent:'center',
        padding:15,
        marginTop:45,
        marginBottom:45,
    
    },
    button1:{
        backgroundColor: '#ac2774',
        borderRadius:20,
        paddingVertical:20,
        width:300,
        marginTop:15,
        alignContent:'center',
        height:50,
    },
})