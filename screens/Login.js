import { Component } from "react";
import { StyleSheet,View,Text, TextInput} from 'react-native';
import { Image } from 'react-native';

export default function Login(){

{
    return (
        <View style={styles.padre}>
            
            <View>
                <Image source={require('../Assets/img/Logo.jpeg')} style={styles.profile} />
            </View>
            <View>
                <Text style={styles.textit}>Inicio de Sesión</Text>
            </View>
            <View style={styles.card}>
                <View style={styles.cajatext}>
                    <TextInput placeholder="Usuario o Correo" style={{paddingHorizontal:15}} />
                </View>
                <View style={styles.cajatext}>
                    <TextInput placeholder="Contraseña" style={{paddingHorizontal:15}} />
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
    borderRadius: 50,
    borderColor: 'white'
    },
    card: {
        margin:20,
        backgroundColor: 'white',
        borderRadius: 20,
        width:'90%',
        padding: 20,
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
        fontSize: 24,
        color: 'purple',
}})