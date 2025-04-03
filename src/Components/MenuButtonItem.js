import React from 'react'
import { View, Text, Touchable, TouchableOpacity, StyleSheet, Image} from 'react-native'
import { TextStyles } from '../styles/TextStyles';


const MenuButtonItem = ({ text, onPress, salida, image, style, ...props }) => {
    return(
      <TouchableOpacity
        style={[styles.buttonContainer, salida && styles.salida, style]}
        onPress={onPress}
        {...props}
      > 
       <Image source={image} style={styles.img} />
        <Text style={styles.texto}>{text}</Text>
      </TouchableOpacity>
    )
  }

const styles = StyleSheet.create ({
    img:{
        width:45,
        height:45,
        borderRadius:23,
    },
    buttonContainer:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#996ee5',
        borderRadius:12,
        flexDirection:'row',
        marginBottom:15,
        padding:15,
    },
    salida:{
      alignItems:'center',
        backgroundColor:'#ac2774',
        borderRadius:12,
        padding:15,
        marginTop: 'auto',
        marginBottom: 20,
    },
    texto:{
        color:'white',
        marginStart:10,
        fontFamily:'CreamBeige'
    }
})

export default MenuButtonItem