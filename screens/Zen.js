import React, {Animated, ImageBackground, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { useRef } from 'react';
import { useEffect,useContext } from 'react';
import { useNavigation } from "@react-navigation/native";
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { MusicContext } from '../src/Components/MusicContext';

export default function Zen() {

        const opacity = useRef(new Animated.Value(1)).current;
           const navigation = useNavigation(); 
      
          return(
              <ImageBackground source={require('../src/Assets/img/Zen.jpeg')} resizeMode='cover' style={styles.back}>
                  <View style={styles.content}>
      
                      <Text style={styles.texto}>Modo Zen</Text>
              <View style={styles.container}>
                <TouchableOpacity style={styles.buttone}
                onPress= { () => navigation.navigate('ZenJuego') }>
                  <Animated.Text style={[styles.buttonecontext, { opacity }]}>
                    Haz Clic aqui para continuar
                  </Animated.Text>
                </TouchableOpacity>
              </View>
              </View>
              </ImageBackground>
          )
}

const styles = StyleSheet.create ({
    back:{
        flex:1,
    },
    texto:{
        fontFamily:'CreamBeige',
        fontSize:responsiveFontSize(4),
        color:'#49a193',
        alignSelf:'center',
        marginTop:150,
        marginBottom:180,
        justifyContent:'center',
        marginEnd:35,
        marginStart:35,
        textAlign:'center'
    },
    container:{
        alignItems:'center',
        marginTop:250,
        marginBottom:20,
    },
    buttone:{
        width:responsiveWidth(70),
        alignItems:'center',
        backgroundColor:'#aff3ef',
        borderRadius:10,
        height:responsiveHeight(10),
        justifyContent:'center'
    },
    buttonecontext:{
        fontFamily:'CreamBeige',
        color:'white',
        textAlign:'center'

    }
})