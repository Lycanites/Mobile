import { useState } from "react";
import { StyleSheet,View,Text, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import { Image } from "react-native";
import Memoria from "./Memoria";

export default function Juegos(){

    const navigation = useNavigation(); 

    return(
        <View style={styles.container}> 
        <Text style={styles.title}>Juegos</Text>
    <TouchableOpacity style={styles.button1}
        onPress={() => navigation.navigate('LoadingM')}>
    <Image source={require('../src/Assets/img/MiniMemoria.png')} style={styles.logo1}/>
    <Text style={styles.textbutton}>Memoria</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button2}
      onPress= { () => navigation.navigate('LoadingL') }>
    <Image source={require('../src/Assets/img/MiniLogica.png')} style={styles.logo2}/>
    <Text style={styles.textbutton}>Logica</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button3}
      onPress= { () => navigation.navigate('Loadingl') }>
    <Image source={require('../src/Assets/img/MiniLectura.png')} style={styles.logo3}/>
    <Text style={styles.textbutton}>Lectura</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button4}
      onPress= { () => navigation.navigate('LoadingC') }>
    <Image source={require('../src/Assets/img/MiniCultura.png')} style={styles.logo4}/>
    <Text style={styles.textbutton}>Cultura</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button5}
      onPress= { () => navigation.navigate('LoadingA') }>
    <Image source={require('../src/Assets/img/MiniAnalisis.png')} style={styles.logo5}/>
    <Text style={styles.textbutton}>Analisis</Text>
    </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create ({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:15,
        marginTop:45,
        marginBottom:45,
  },
    title:{
      fontFamily:'CreamBeige',
      padding:20,
      fontSize:25,
      color:'#34008f', 
    },
    button1:{
        flexDirection:'row',
        backgroundColor: '#ff8ee1',
        borderRadius:20,
        paddingVertical:20,
        width:280,
        marginTop:15,
        alignContent:'center',
        height:75,
  },
    button2:{
        flexDirection:'row',
        backgroundColor: '#e78a3b',
        borderRadius:20,
        paddingVertical:20,
        width:280,
        marginTop:15,
        alignContent:'center',
        height:75,
  },
    button3:{
        flexDirection:'row',
        backgroundColor: '#ffd77f',
        borderRadius:20,
        paddingVertical:20,
        width:280,
        marginTop:15,
        alignContent:'center',
        height:75,
},
button4:{
      flexDirection:'row',
      backgroundColor: '#6ba02e',
      borderRadius:20,
      paddingVertical:20,
      width:280,
      marginTop:15,
      alignContent:'center',
      height:75,
},
button5:{
      flexDirection:'row',
      backgroundColor: '#1a74c7',
      borderRadius:20,
      paddingVertical:20,
      width:280,
      marginTop:15,
      alignContent:'center',
      height:75,
},
  textbutton:{
      color:'white',
      fontFamily:'CreamBeige',
      textAlign:'right',
      marginRight:20,
      justifyContent:'center',
      marginTop:10,
      marginBottom:10,
  },
  logo1:{
    height:40,
    width:40,
    borderRadius:25,
    backgroundColor:'#5e0b3c',
    marginLeft:'20',
    marginRight:'auto',
  },
  logo2:{
    height:40,
    width:40,
    borderRadius:25,
    backgroundColor:'#6d2906',
    marginLeft:'20',
    marginRight:'auto',
  },
  logo3:{
    height:40,
    width:40,
    borderRadius:25,
    backgroundColor:'#c18600',
    marginLeft:'20',
    marginRight:'auto',
  },
  logo4:{
    height:40,
    width:40,
    borderRadius:25,
    backgroundColor:'#445d1c',
    marginLeft:'20',
    marginRight:'auto',
  },
  logo5:{
    height:40,
    width:40,
    borderRadius:25,
    backgroundColor:'#0a2d68',
    marginLeft:'20',
    marginRight:'auto',
  },
})