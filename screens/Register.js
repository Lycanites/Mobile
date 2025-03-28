import { Component } from "react";
import { StyleSheet,View,Text, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function Login(){

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
                    <TextInput placeholder="Nombre de Usuario" style={{paddingHorizontal:15}} />
                </View>
                <View style={styles.cajatexto}>
                    <TextInput placeholder="Email" style={{paddingHorizontal:15}} />
                </View>
                <View style={styles.cajatexto}>
                    <TextInput placeholder="Contraseña" style={{paddingHorizontal:15}} />
                </View>
                <View style={styles.cajatexto}>
                    <TextInput placeholder="Confirmar Contraseña" style={{paddingHorizontal:15}} />
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
    },
    cajatexto: {
        paddingVertical: 20,
        backgroundColor: '#cccccc40',
        borderRadius:30,
        marginVertical:10
    },
    padrebutton: {
        alignItems:'center',
    },
    button: {
        backgroundColor: '#996ee5',
        borderRadius:30,
        paddingVertical:20,
        width:150,
        marginTop:20
    },
    button2: {
        backgroundColor: 'white',
        borderRadius:20,
        paddingVertical:10,
        width:100,
        marginTop:14
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