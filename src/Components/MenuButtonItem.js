import React from 'react'
import { View, Text, Touchable, TouchableOpacity, StyleSheet, Image} from 'react-native'


const MenuButtonItem = ({ text, onPress, salida, image, style, ...props }) => {
    return(
      <TouchableOpacity
        style={[styles.buttonContainer, salida && styles.salida, styles.img, style]}
        onPress={onPress}
        {...props}
      > 
       <Image source={image} style={styles.icon} />
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
        backgroundColor:'#996ee5',
        borderRadius:10,
        marginBottom:15,
        padding:20,
    },
    salida:{
        backgroundColor:'#ac2774',
        borderRadius:10,
        marginBottom:15,
        padding:20,
    },
    texto:{
        color:'white'
    }
})

export default MenuButtonItem