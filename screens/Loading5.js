import React, {Animated, ImageBackground, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";

export default function Loading5() {

    const opacity = useRef(new Animated.Value(1)).current;
      const navigation = useNavigation(); 
    
    
      useEffect(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(opacity, {
              toValue: 0, 
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }, []);
      
    return(
        <ImageBackground source={require('../src/Assets/img/AnalisisLogo.jpeg')} resizeMode='cover' style={styles.back}>
        <View style={styles.content}>

                <Text style={styles.texto}>Analisis</Text>
        <View style={styles.container}>
          <TouchableOpacity style={styles.buttone}
          onPress= { () => navigation.navigate('Analisis') }>
            <Animated.Text style={[styles.buttonecontext, { opacity }]}>
              Haz Clic aqui para continuar
            </Animated.Text>
          </TouchableOpacity>
        </View>
        </View>
        </ImageBackground>
    )

}

const styles = StyleSheet.create ({ back:{
    flex:1,
},
texto:{
    fontFamily:'CreamBeige',
    fontSize:24,
    color:'#0a2d68',
    alignSelf:'center',
    marginTop:200,
    marginBottom:40
},
container:{
    alignItems:'center',
    marginTop:250,
    marginBottom:20,
},
buttone:{
    width:250,
    alignItems:'center',
    backgroundColor:'#7bcbff',
    borderRadius:10,
    height:60,
    justifyContent:'center'
},
buttonecontext:{
    fontFamily:'CreamBeige',
    color:'white',

}
   
})