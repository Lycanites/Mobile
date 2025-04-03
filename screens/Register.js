import { Component } from "react";
import { StyleSheet,View,Text, TextInput, TouchableOpacity, } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useSound } from "../src/Components/useSounds";
import { useRoute } from '@react-navigation/native';

export default function Login(){

    const route = useRoute(); 
    const { isSoundEnabled } = route.params || {};
    
        useSound(require('../src/Music/backmusic.mp3'), isSoundEnabled);

    const navigation = useNavigation(); 

    {
    return (

        <View style={styles.padre}>
            
            <View>
                <Image source={require('../src/Assets/img/Logo.jpeg')} style={styles.profile} />
            </View>
            <View>
                <Text style={styles.textit}>Registro de Usuario</Text>
            </View>
            <View style={styles.card}>
                <View style={styles.cajatexto}>
                    <TextInput placeholder="Nombre de Usuario"  placeholderTextColor="gray" style={{paddingHorizontal:15, color:'gray'}} />
                </View>
                <View style={styles.cajatexto}>
                    <TextInput placeholder="Email"  placeholderTextColor="gray" style={{paddingHorizontal:15 , color:'gray'}} />
                </View>
                <View style={styles.cajatexto}>
                    <TextInput placeholder="Contraseña" placeholderTextColor="gray" style={{paddingHorizontal:15, color:'gray'}} />
                </View>
                <View style={styles.cajatexto}>
                    <TextInput placeholder="Confirmar Contraseña"  placeholderTextColor="gray" style={{paddingHorizontal:15, color:'gray'}} />
                </View>
                <View style={styles.padrebutton}>
                    <TouchableOpacity style={styles.button2}>
                        <Text style={styles.textbutton2}>Registrarse</Text>
                        </TouchableOpacity>
                </View>
                <View style={styles.padrebutton}>
                    <TouchableOpacity style={styles.button}
                    onPress= { () => navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }], 
                      }) }>
                        <Text style={styles.textbutton}>Inicio de Sesión</Text>
                        </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
}

const styles = StyleSheet.create ({
    padre: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },

    profile: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderColor: 'white'
    },
    card: {
        margin:20,
        backgroundColor: 'white',
        borderRadius: 20,
        width:'90%',
        padding: 17.5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity:0.25,
        shadowRadius:4,
        elevation:5
    },
    textit: {
        fontFamily: 'CreamBeige',
        fontSize: 24,
        color: '#34008f',
    },
    cajatexto: {
        paddingVertical: 15,
        backgroundColor: '#cccccc40',
        borderRadius:20,
        marginVertical:7.5
    },
    padrebutton: {
        alignItems:'center',
    },
    button: {
        backgroundColor: '#996ee5',
        borderRadius:30,
        paddingVertical:20,
        width:150,
        marginTop:15
    },
    button2: {
        backgroundColor: 'white',
        borderRadius:20,
        paddingVertical:10,
        width:100,
        marginTop:10
    },
    textbutton:{
        textAlign:'center',
        color:'white'
    },
    textbutton2:{
        textAlign:'center',
        color:'black'
    }
})