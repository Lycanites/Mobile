import { useState } from "react";
import { StyleSheet,View,Text, ImageBackground } from 'react-native';
import Sliders from "../src/Components/Sliders";

// const imagen = require('../src/Assets/img/Hero.jpeg');


export default function Areas(){
    return(
     <Sliders />
    
    )
}

const styles = StyleSheet.create ({
img:{
    flex:1,
    justifyContent:'center',
    width:'100%',
    height:'100%'
}
})