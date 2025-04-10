import { StyleSheet, View, Text, TouchableOpacity,  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import Fiesta from "./Fiesta";
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';


export default function Modos() {

    const navigation = useNavigation(); 

    return(
        <View style={styles.content}>
            <View>
                <Text style={styles.texto}>Modos de Juego</Text>
            <TouchableOpacity style={styles.botons1}
            onPress={() => navigation.navigate('FiestaL')}>
            <Text style={styles.text}>Fiesta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botons2}
            onPress={() => navigation.navigate('Juegos')}>
            <Text style={styles.text}>Clasico</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botons3}
            onPress={() => navigation.navigate('ZenL')}>
            <Text style={styles.text}>Zen</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
content:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    alignContent:'center',
    
},
texto:{
    fontFamily:'CreamBeige',
    marginBottom:30,
    fontSize:responsiveFontSize(4),
    color:'#34008f',
    alignSelf:'center',
},
botons1:{
    alignSelf:'center',
    width:responsiveWidth(55),
    height:responsiveHeight(12.5),
    backgroundColor:'#fd5892',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:50,
    borderRadius:20,
},
botons2:{
    alignSelf:'center',
    width:responsiveWidth(55),
    height:responsiveHeight(12.5),
    backgroundColor:'#76ff9a',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:50,
    borderRadius:20,
},
botons3:{
    alignSelf:'center',
    width:responsiveWidth(55),
    height:responsiveHeight(12.5),
    backgroundColor:'#76c8ff',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
},
text:{
    fontFamily:'CreamBeige',
    fontSize:20,
    color:'white'
}
})