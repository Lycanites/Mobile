import React from 'react'
import { View, Text, Touchable, TouchableOpacity, StyleSheet} from 'react-native'

const MenuButtonItem = ( {text, onPress} ) => {
    return(
        <TouchableOpacity
        style = { styles.buttonContainer }
        onPress={ onPress }>
                <Text>{ text }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create ({
    buttonContainer:{
        backgroundColor:'skyblue',
        borderRadius:10,
        marginBottom:15,
        padding:20,
    },
})

export default MenuButtonItem