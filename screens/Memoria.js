import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const preguntasOriginal = [
  {
    pregunta: "De acuerdo con las posiciones, ¿en qué número se encontraba la fresa?",
    imagen: require("../public/imagenes/m_ej1.png"),
    opciones: ["2", "9", "4", "8"],
    correcta: 1,
  },
  {
    pregunta: "De acuerdo con las posiciones, ¿en qué número se encontraba la manzana?",
    imagen: require("../public/imagenes/m_ej2.png"),
    opciones: ["4", "3", "8", "6"],
    correcta: 2,
  },
  {
    pregunta: "De acuerdo con las posiciones, ¿en qué número se encontraba el globo?",
    imagen: require("../public/imagenes/m_ej3.png"),
    opciones: ["7", "1", "3", "5"],
    correcta: 0,
  },
  {
    pregunta: "De acuerdo con las posiciones, ¿en qué número se encontraba el oso?",
    imagen: require("../public/imagenes/m_ej5.png"),
    opciones: ["1", "4", "9", "6"],
    correcta: 2,
  },
  {
    pregunta: "De acuerdo con las posiciones, ¿en qué número se encontraba el perro?",
    imagen: require("../public/imagenes/m_ej6.png"),
    opciones: ["9", "7", "4", "1"],
    correcta: 1,
  },
  {
    pregunta: "¿Qué objeto era pareja con la naranja?",
    imagen: require("../public/imagenes/m_ej7.png"),
    opciones: ["El auto", "El barco", "El camión", "La moto"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué objeto era pareja con la pera?",
    imagen: require("../public/imagenes/m_ej8.png"),
    opciones: ["El barco", "El camión", "El avión", "La moto"],
    correcta: 2,
  },
  {
    pregunta: "¿Qué objeto era pareja con el gato?",
    imagen: require("../public/imagenes/m_ej9.png"),
    opciones: ["Un helado", "La pelota", "Un trébol", "La sombrilla"],
    correcta: 2,
  },
  {
    pregunta: "¿Qué objeto era pareja con la mariposa?",
    imagen: require("../public/imagenes/m_ej10.png"),
    opciones: ["El perro", "El león", "La pelota", "El girasol"],
    correcta: 3,
  },
  {
    pregunta: "De acuerdo con las posiciones, ¿en qué número se encontraba el barco?",
    imagen: require("../public/imagenes/m_ej4.png"),
    opciones: ["6", "2", "9", "7"],
    correcta: 3,
  },
];

function shuffle(array) {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const screenWidth = Dimensions.get("window").width;

export default function Memoria() {
  const DURATION = 10000;
  const OBSERVATION_DELAY = 7000;

  const progress = useRef(new Animated.Value(1)).current;
  const animationRef = useRef(null);
  const timeoutRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [puntos, setPuntos] = useState(0);
  const [preguntas, setPreguntas] = useState(() => shuffle(preguntasOriginal));
  const [indicePregunta, setIndicePregunta] = useState(0);
  const [mostrarPregunta, setMostrarPregunta] = useState(false);
  const [puntajeAcumulado, setPuntajeAcumulado] = useState(0);

  const preguntaActual = preguntas[indicePregunta];

  // Cargar puntaje acumulado al iniciar
  useEffect(() => {
    const cargarPuntaje = async () => {
      try {
        const almacenado = await AsyncStorage.getItem("puntajes");
        if (almacenado) {
          const datos = JSON.parse(almacenado);
          setPuntajeAcumulado(datos["Memoria"] || 0);
        }
      } catch (error) {
        console.error("Error al cargar puntaje acumulado:", error);
      }
    };
    cargarPuntaje();
  }, []);

  const startTimer = (duration = DURATION) => {
    progress.setValue(1);
    animationRef.current = Animated.timing(progress, {
      toValue: 0,
      duration,
      useNativeDriver: false,
    });
    animationRef.current.start(({ finished }) => {
      if (finished) guardarPuntajeYMostrarModal();
    });
  };

  // Guarda el puntaje sumándolo al acumulado y muestra modal
  const guardarPuntajeYMostrarModal = async () => {
  try {
    const almacenado = await AsyncStorage.getItem("puntaje_memoria");
    const puntajePrevio = almacenado ? parseInt(almacenado) : 0;
    const nuevoPuntaje = puntajePrevio + puntos;

    await AsyncStorage.setItem("puntaje_memoria", nuevoPuntaje.toString());

    setPuntajeAcumulado(nuevoPuntaje);
    setPuntos(0);
  } catch (error) {
    console.error("Error al guardar puntaje acumulado:", error);
  }
  setShowModal(true);
};

  // Maneja la visualización de la pregunta y el inicio del temporizador con delay u sin delay
  const mostrarPreguntaConDelay = (delay) => {
    setMostrarPregunta(false);
    if (animationRef.current) animationRef.current.stop();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setMostrarPregunta(true);
      startTimer();
    }, delay);
  };

  // Cuando cambia pregunta, muestra la imagen 7s, luego la pregunta con temporizador 10s
  useEffect(() => {
    mostrarPreguntaConDelay(OBSERVATION_DELAY);
    return () => {
      if (animationRef.current) animationRef.current.stop();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [indicePregunta]);

  const reiniciarJuego = () => {
    if (animationRef.current) animationRef.current.stop();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setShowModal(false);
    setPuntos(0);
    const nuevasPreguntas = shuffle(preguntasOriginal);
    setPreguntas(nuevasPreguntas);
    setIndicePregunta(0);

    mostrarPreguntaConDelay(OBSERVATION_DELAY);
  };

  const responder = (index) => {
    if (index === preguntaActual.correcta) {
      setPuntos((prev) => prev + 1);

      if (animationRef.current) animationRef.current.stop();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      const siguiente = indicePregunta + 1;
      if (siguiente < preguntas.length) {
        setIndicePregunta(siguiente);
        // Mostrar siguiente pregunta SIN delay y con temporizador desde 10s
        setMostrarPregunta(true);
        startTimer(DURATION);
      } else {
        guardarPuntajeYMostrarModal();
      }
    } else {
      if (animationRef.current) animationRef.current.stop();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      guardarPuntajeYMostrarModal();
    }
  };

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.screen}>
      {mostrarPregunta && (
        <View style={styles.tiempo}>
          <Animated.View style={[styles.barra, { width: widthInterpolated }]} />
        </View>
      )}

      <View style={styles.card}>
        {!mostrarPregunta ? (
          <>
            <Text style={styles.texto}>Observa la imagen...</Text>
            {preguntaActual.imagen && (
              <Image source={preguntaActual.imagen} style={styles.imagen} />
            )}
          </>
        ) : (
          <Text style={styles.texto}>{preguntaActual.pregunta}</Text>
        )}
      </View>

      {mostrarPregunta && (
        <View style={styles.opciones}>
          {preguntaActual.opciones.map((opcion, i) => (
            <TouchableOpacity
              key={i}
              style={styles.opcion}
              onPress={() => responder(i)}
              activeOpacity={0.7}
            >
              <Text style={styles.opcionTexto}>{opcion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.marcador}>
        <Text style={styles.marcadorTexto}>Puntos: {puntos}</Text>
      </View>

      <Modal visible={showModal} transparent animationType="fade">
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
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#ff8ee1",
    flex: 1,
  },
  marcador: {
    position: "absolute",
    bottom: 10,
    left: 15,
    backgroundColor: "#ff8ee1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#5e0b3c",
    elevation: 4,
  },
  marcadorTexto: {
    fontSize: 16,
    fontFamily: "CreamBeige",
    color: "#5e0b3c",
    textAlign: "center",
  },
  tiempo: {
    height: 20,
    backgroundColor: "#5e0b3c",
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  barra: {
    height: "100%",
    backgroundColor: "#ff8ee1",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 50,
    marginHorizontal: 15,
    borderRadius: 15,
    alignItems: "center",
    maxHeight: 350,
  },
  texto: {
    fontWeight: "bold",
    color: "#3f003f",
    textAlign: "center",
  },
  imagen: {
    width: screenWidth * 0.9,
    height: 160,
    marginTop: 20,
    resizeMode: "contain",
  },
  opciones: {
    marginTop: 5,
    marginHorizontal: 20,
  },
  opcion: {
     backgroundColor: "#fff",
    paddingVertical: 20,
    borderRadius: 8,
    marginHorizontal: 130,
    marginLeft: 15,
    marginTop: 10,
  },
  opcionTexto: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#ffffff",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 22,
    fontFamily: "CreamBeige",
    color: "#34008f",
    marginBottom: 15,
  },
  boton: {
    backgroundColor: "#34008f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "CreamBeige",
    textAlign: "center",
  },
});
