import React, {Animated, ImageBackground, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

export default function Loading3() {

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
        <ImageBackground source={require('../src/Assets/img/LecturaLogo.jpeg')} resizeMode='cover' style={styles.back}>
        <View style={styles.content}>

                <Text style={styles.texto}>Lectura</Text>
        <View style={styles.container}>
          <TouchableOpacity style={styles.buttone}
          onPress= { () => navigation.navigate('Lectura') }>
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
    fontSize:responsiveFontSize(4),
    color:'#c18600',
    alignSelf:'center',
    marginTop:120,
    marginBottom:200
},
container:{
    alignItems:'center',
    marginTop:250,
    marginBottom:20,
},
buttone:{
    width:responsiveWidth(70),
    alignItems:'center',
    backgroundColor:'#se78a3b',
    borderRadius:10,
    height:responsiveHeight(10),
    justifyContent:'center'
},
buttonecontext:{
    fontFamily:'CreamBeige',
    color:'white',

}
   
})