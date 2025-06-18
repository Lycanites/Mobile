import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Modal,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Analisis() {
  const DURATION = 15000;
  const progress = useRef(new Animated.Value(1)).current;
  const animationRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [preguntasAleatorias, setPreguntasAleatorias] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [puntos, setPuntos] = useState(0);

  const preguntas = [
    {
      pregunta: "Me ves en el agua, pero nunca me mojo.",
      opciones: ["El reflejo", "Un pez", "Un barco", "Las nubes"],
      correcta: 0,
    },
    {
      pregunta: "No es camino, pero anda, no es campana, pero suena.",
      opciones: ["La bicicleta", "El reloj", "El tambor", "La brújula"],
      correcta: 1,
    },
    {
      pregunta:
        "Tiene forma de anillo y agua en su interior, todos te lo ofrecen como prenda de amor.",
      opciones: ["La alianza", "Un vaso", "Una pecera", "Las llaves"],
      correcta: 0,
    },
    {
      pregunta: "En medio del mar está y a la orilla no puede llegar.",
      opciones: ["Un barco", "El delfín", "La estrella de mar", "El pez globo"],
      correcta: 2,
    },
    {
      pregunta: "Tiene hojas, pero no es árbol, tiene lomo, pero no es animal.",
      opciones: ["La mochila", "El cuaderno", "El maestro", "El libro"],
      correcta: 3,
    },
    {
      pregunta: "Pasa por ciudades y campos, pero nunca se mueve.",
      opciones: ["El camino", "El río", "El viento", "El tren"],
      correcta: 0,
    },
    {
      pregunta:
        "Si me miras te miraré, si me tocas te tocaré, pero si te ríes, yo también lo haré.",
      opciones: ["Un perro", "Un cuadro", "El espejo", "La sombra"],
      correcta: 2,
    },
    {
      pregunta: "Lleno de agujeros y aun así guarda agua.",
      opciones: ["El colador", "La esponja", "Un cubo", "Una red"],
      correcta: 1,
    },
    {
      pregunta: "Es redondo y no es queso, rueda sin ser balón.",
      opciones: ["La moneda", "El plato", "La luna", "El sol"],
      correcta: 3,
    },
    {
      pregunta: "Vuelo sin alas, lloro sin ojos.",
      opciones: ["La cascada", "El río", "Las olas", "La nube"],
      correcta: 3,
    },
  ];

  useEffect(() => {
    const preguntasMezcladas = [...preguntas].sort(() => Math.random() - 0.5);
    setPreguntasAleatorias(preguntasMezcladas);
  }, []);

  useEffect(() => {
    if (preguntasAleatorias.length > 0) startTimer();
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [preguntasAleatorias]);

  // Función para guardar el puntaje en AsyncStorage
  const guardarPuntaje = async (valor) => {
    try {
      // Obtener el puntaje guardado para 'puntaje_analisis'
      const guardado = await AsyncStorage.getItem("puntaje_analisis");
      const puntajePrevio = guardado ? parseInt(guardado) : 0;

      // Guardar sólo si el nuevo puntaje es mayor
      if (valor > puntajePrevio) {
        await AsyncStorage.setItem("puntaje_analisis", valor.toString());
      }
    } catch (error) {
      console.error("Error guardando puntaje análisis:", error);
    }
  };

  const startTimer = () => {
    progress.setValue(1);
    animationRef.current = Animated.timing(progress, {
      toValue: 0,
      duration: DURATION,
      useNativeDriver: false,
    });

    animationRef.current.start(({ finished }) => {
      if (finished) {
        setMensaje("⏳ ¡Perdiste!");
        setShowModal(true);
        guardarPuntaje(puntos);
      }
    });
  };

  const manejarRespuesta = (index) => {
    const actual = preguntasAleatorias[indiceActual];
    if (index === actual.correcta) {
      setPuntos((prev) => prev + 1);
      if (animationRef.current) animationRef.current.stop();

      if (indiceActual < preguntasAleatorias.length - 1) {
        setIndiceActual(indiceActual + 1);

        setTimeout(() => {
          startTimer();
        }, 100);
      } else {
        setMensaje("🎉 ¡Completaste todas!");
        setShowModal(true);
        guardarPuntaje(puntos + 1); // Suma 1 porque acabas de aumentar puntos
      }
    } else {
      if (animationRef.current) animationRef.current.stop();
      setMensaje("⏳ ¡Perdiste!");
      setShowModal(true);
      guardarPuntaje(puntos);
    }
  };

  const reiniciarJuego = () => {
    const preguntasMezcladas = [...preguntas].sort(() => Math.random() - 0.5);
    setPreguntasAleatorias(preguntasMezcladas);
    setIndiceActual(0);
    setPuntos(0);
    setShowModal(false);
    setTimeout(() => {
      startTimer();
    }, 100);
  };

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.screen}>
      <View style={styles.tiempo}>
        <Animated.View style={[styles.barra, { width: widthInterpolated }]} />
      </View>

      {preguntasAleatorias.length > 0 && (
        <>
          <View style={styles.card}>
            <Text style={styles.texto}>
              {preguntasAleatorias[indiceActual].pregunta}
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            {preguntasAleatorias[indiceActual].opciones.map((opcion, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => manejarRespuesta(index)}
                style={styles.boton}
                activeOpacity={0.7}
              >
                <Text style={styles.botonTexto}>{opcion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <View style={styles.marcador}>
        <Text style={styles.marcadorTexto}>Puntos: {puntos}</Text>
      </View>

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>{mensaje}</Text>
            <TouchableOpacity style={styles.botonP} onPress={reiniciarJuego}>
              <Text style={styles.botonTextoP}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#7bcbff",
    flex: 1,
  },
  tiempo: {
    height: 20,
    backgroundColor: "#0a2d68",
    marginTop: 30,
    marginHorizontal: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  barra: {
    height: "100%",
    backgroundColor: "#7bcbff",
  },
  card: {
    backgroundColor: "#ffff",
    padding: 30,
    marginTop: 50,
    marginHorizontal: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  texto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3f003f",
    textAlign: "center",
  },
  boton: {
     backgroundColor: "#fff",
    paddingVertical: 20,
    borderRadius: 8,
    marginHorizontal: 130,
    marginLeft: 15,
    marginTop: 10,
  },
  botonTexto: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    flexWrap: "wrap",
  },
  botonP: {
    backgroundColor: "#34008f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 20,
  },
  botonTextoP: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "CreamBeige",
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
    padding: 40,
    borderRadius: 20,
    alignItems: "center",
    maxWidth: "80%",
  },
  modalText: {
    fontSize: 22,
    color: "#34008f",
    marginBottom: 15,
    fontFamily: "CreamBeige",
    textAlign: "center",
  },
  marcador: {
    position: "absolute",
    bottom: 10,
    left: 15,
    backgroundColor: "#7bcbff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#0a2d68",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  marcadorTexto: {
    fontSize: 16,
    fontFamily: "CreamBeige",
    color: "#0a2d68",
    textAlign: "center",
  },
});
