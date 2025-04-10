import { StyleSheet, View, Text, TouchableOpacity,  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import Fiesta from "./Fiesta";


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
},
texto:{
    fontFamily:'CreamBeige',
    marginBottom:30,
    fontSize:25,
    color:'#34008f',
    alignSelf:'center',
},
botons1:{
    margin:20,
    width:200,
    height:100,
    backgroundColor:'#fd5892',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:40,
    borderRadius:20,
},
botons2:{
    margin:20,
    width:200,
    height:100,
    backgroundColor:'#76ff9a',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:40,
    borderRadius:20,
},
botons3:{
    margin:20,
    width:200,
    height:100,
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