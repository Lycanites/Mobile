import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Modal,
  TouchableOpacity,
} from "react-native";

export default function Cultura() {

    const DURATION = 15000;
      const progress = useRef(new Animated.Value(1)).current;
      const animationRef = useRef(null); // Referencia para controlar la animación
      const [showModal, setShowModal] = useState(false);
    
      const startTimer = () => {
        progress.setValue(1);
    
        // Iniciar nueva animación y guardarla en referencia
        animationRef.current = Animated.timing(progress, {
          toValue: 0,
          duration: DURATION,
          useNativeDriver: false,
        });
    
        animationRef.current.start(({ finished }) => {
          if (finished) {
            setShowModal(true); // Solo mostrar si terminó normalmente
          }
        });
      };
    
      useEffect(() => {
        startTimer();
      }, []);
    
      const reiniciarJuego = () => {
        // Detener cualquier animación previa
        if (animationRef.current) {
          animationRef.current.stop();
        }
    
        setShowModal(false);
    
        // Reiniciar animación después de cerrar el modal
        setTimeout(() => {
          startTimer();
        }, 100);
      };
    
      const widthInterpolated = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
      });

    return(
         <View style={styles.screen}>
              <View style={styles.tiempo}>
                <Animated.View style={[styles.barra, { width: widthInterpolated }]} />
              </View>
                <View style={styles.card}>
                
              </View>
        
              <Modal
                visible={showModal}
                transparent
                animationType="fade"
                onRequestClose={() => {}}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalBox}>
                    <Text style={styles.modalText}>⏳ ¡Perdiste!</Text>
                    <TouchableOpacity style={styles.boton} onPress={reiniciarJuego}>
                      <Text style={styles.botonTexto}>Reintentar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
    )
}

const styles = StyleSheet.create({
screen:{
    backgroundColor:'#ddff8e',
    flex:1,
},
tiempo: {
    height: 20,
    backgroundColor: "#445d1c",
    marginTop: 30,
    marginHorizontal: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  barra: {
    height: "100%",
    backgroundColor: "#ddff8e",
  },
  card: {
    backgroundColor: "#ffff",
    padding: 60,
    marginTop: 50,
    marginHorizontal: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  texto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3f003f",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#ffffff",
    padding: 40,
    borderRadius: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 22,
    fontFamily:'CreamBeige',
    color: "#34008f",
    marginBottom: 15,
  },
  boton: {
    backgroundColor: "#f7b3ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})