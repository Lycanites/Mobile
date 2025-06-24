import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

export default function Modos() {
    const navigation = useNavigation(); 
    const [loading, setLoading] = useState(false);

    const handlePress = (screen) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.navigate(screen);
        }, 1500); // Simula 1.5 segundos de carga
    };

    return (
        <View style={styles.content}>
            <View>
                <Text style={styles.texto}>Modos de Juego</Text>

                <TouchableOpacity style={styles.botons1} onPress={() => handlePress('FiestaL')}>
                    <Text style={styles.text}>Fiesta</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botons2} onPress={() => handlePress('Juegos')}>
                    <Text style={styles.text}>Clasico</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botons3} onPress={() => handlePress('ZenL')}>
                    <Text style={styles.text}>Zen</Text>
                </TouchableOpacity>
            </View>

            <Modal transparent={true} visible={loading} animationType="fade">
                <View style={styles.loadingOverlay}>
                    <View style={styles.loadingBox}>
                        <ActivityIndicator size="large" color="#34008f" /> 
                        <Text style={styles.loadingText}>Cargando...</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        fontFamily: 'CreamBeige',
        marginBottom: 30,
        fontSize: responsiveFontSize(4),
        color: '#34008f',
        alignSelf: 'center',
    },
    botons1: {
        alignSelf: 'center',
        width: responsiveWidth(55),
        height: responsiveHeight(12.5),
        backgroundColor: '#fd5892',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
        borderRadius: 20,
    },
    botons2: {
        alignSelf: 'center',
        width: responsiveWidth(55),
        height: responsiveHeight(12.5),
        backgroundColor: '#76ff9a',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
        borderRadius: 20,
    },
    botons3: {
        alignSelf: 'center',
        width: responsiveWidth(55),
        height: responsiveHeight(12.5),
        backgroundColor: '#76c8ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    text: {
        fontFamily: 'CreamBeige',
        fontSize: 20,
        color: 'white',
    },
    loadingOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingBox: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: '#34008f',
        fontFamily: 'CreamBeige',
    }
});
