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

const preguntas = [
  {
    pregunta: "¿Cuál es el río más largo del mundo?",
    opciones: ["Nilo", "Amazonas", "Yangtsé", "Misisipi"],
    correcta: 1,
  },
  {
    pregunta: "¿Quién pintó la Mona Lisa?",
    opciones: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correcta: 2,
  },
  {
    pregunta: "¿En qué país se originaron los Juegos Olímpicos?",
    opciones: ["Italia", "Grecia", "Egipto", "China"],
    correcta: 1,
  },
  {
    pregunta: "¿Cuál es el planeta más cercano al Sol?",
    opciones: ["Venus", "Mercurio", "Marte", "Júpiter"],
    correcta: 1,
  },
  {
    pregunta: "¿En qué año llegó el hombre a la Luna por primera vez?",
    opciones: ["1969", "1975", "1965", "1980"],
    correcta: 0,
  },
  {
    pregunta: "¿Quién escribió 'Cien años de soledad'?",
    opciones: ["Gabriel García Márquez", "Mario Vargas Llosa", "Pablo Neruda", "Julio Cortázar"],
    correcta: 0,
  },
  {
    pregunta: "¿Cuál es la capital de Australia?",
    opciones: ["Sídney", "Melbourne", "Canberra", "Brisbane"],
    correcta: 2,
  },
  {
    pregunta: "¿Cuál es el metal más abundante en la corteza terrestre?",
    opciones: ["Hierro", "Aluminio", "Cobre", "Oro"],
    correcta: 1,
  },
  {
    pregunta: "¿Qué gas es esencial para que los humanos puedan respirar?",
    opciones: ["Dióxido de carbono", "Nitrógeno", "Oxígeno", "Helio"],
    correcta: 2,
  },
  {
    pregunta: "¿Cuál es el animal terrestre más rápido del mundo?",
    opciones: ["León", "Tigre", "Chita", "Gacela"],
    correcta: 2,
  },
  {
    pregunta: "¿Qué inventor es conocido por la bombilla eléctrica?",
    opciones: ["Nikola Tesla", "Thomas Edison", "Alexander Graham Bell", "Benjamin Franklin"],
    correcta: 1,
  },
  {
    pregunta: "¿Cuál es la moneda oficial de Japón?",
    opciones: ["Yuan", "Yen", "Won", "Dólar"],
    correcta: 1,
  },
  {
    pregunta: "¿Cuál es la lengua más hablada en el mundo?",
    opciones: ["Inglés", "Mandarín", "Español", "Hindi"],
    correcta: 1,
  },
  {
    pregunta: "¿Qué país tiene la mayor cantidad de habitantes?",
    opciones: ["India", "Estados Unidos", "China", "Indonesia"],
    correcta: 2,
  },
  {
    pregunta: "¿Qué instrumento mide la presión atmosférica?",
    opciones: ["Barómetro", "Termómetro", "Higrómetro", "Anemómetro"],
    correcta: 0,
  },
  {
    pregunta: "¿Cuál es el océano más grande del mundo?",
    opciones: ["Atlántico", "Índico", "Pacífico", "Ártico"],
    correcta: 2,
  },
  {
    pregunta: "¿Quién pintó la Mona Lisa?",
    opciones: ["Miguel Ángel", "Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh"],
    correcta: 1,
  },
  {
    pregunta: "¿En qué continente se encuentra Egipto?",
    opciones: ["Asia", "Europa", "África", "Oceanía"],
    correcta: 2,
  },
  {
    pregunta: "¿Cuál es la capital de Australia?",
    opciones: ["Sídney", "Melbourne", "Canberra", "Perth"],
    correcta: 2,
  },
  {
    pregunta: "¿Quién escribió 'Cien años de soledad'?",
    opciones: ["Pablo Neruda", "Mario Vargas Llosa", "Gabriel García Márquez", "Jorge Luis Borges"],
    correcta: 2,
  },
  {
    pregunta: "¿Qué planeta es conocido como el planeta rojo?",
    opciones: ["Marte", "Júpiter", "Saturno", "Venus"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué instrumento mide la presión atmosférica?",
    opciones: ["Barómetro", "Termómetro", "Higrómetro", "Anemómetro"],
    correcta: 0,
  },
  {
    pregunta: "¿En qué país se encuentra la Torre Eiffel?",
    opciones: ["Italia", "Francia", "Alemania", "España"],
    correcta: 1,
  },
  {
    pregunta: "¿Cuál es el idioma más hablado en el mundo?",
    opciones: ["Inglés", "Hindi", "Chino mandarín", "Español"],
    correcta: 2,
  },
  {
    pregunta: "¿Qué gas es esencial para que respiremos?",
    opciones: ["Dióxido de carbono", "Nitrógeno", "Oxígeno", "Hidrógeno"],
    correcta: 2,
  },
  {
    pregunta: "¿Cuál es la moneda oficial del Reino Unido?",
    opciones: ["Euro", "Libra esterlina", "Dólar", "Franco"],
    correcta: 1,
  },
  {
    pregunta: "¿En qué año llegó el hombre a la Luna?",
    opciones: ["1969", "1972", "1959", "1965"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué animal es el símbolo de la sabiduría en muchas culturas?",
    opciones: ["León", "Serpiente", "Búho", "Zorro"],
    correcta: 2,
  },
  {
    pregunta: "¿Qué país inventó la pólvora?",
    opciones: ["India", "China", "Egipto", "Grecia"],
    correcta: 1,
  },
  {
    pregunta: "¿Qué elemento químico tiene el símbolo 'Au'?",
    opciones: ["Plata", "Oro", "Cobre", "Azufre"],
    correcta: 1,
  },
  {
    pregunta: "¿Cuál es la capital de Canadá?",
    opciones: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
    correcta: 3,
  },
  {
    pregunta: "¿Qué órgano del cuerpo humano bombea sangre?",
    opciones: ["Hígado", "Pulmones", "Cerebro", "Corazón"],
    correcta: 3,
  },
  {
    pregunta: "¿Qué país tiene forma de bota en un mapa?",
    opciones: ["España", "Italia", "Grecia", "Portugal"],
    correcta: 1,
  },
  {
    pregunta: "¿Cuál es el metal más liviano?",
    opciones: ["Aluminio", "Mercurio", "Litio", "Cobre"],
    correcta: 2,
  },
  {
    pregunta: "¿Cuál es el libro sagrado del Islam?",
    opciones: ["Biblia", "Torá", "Corán", "Vedas"],
    correcta: 2,
  },
  {
    pregunta: "¿Qué continente tiene más países?",
    opciones: ["Asia", "África", "Europa", "América"],
    correcta: 1,
  },
  {
    pregunta: "¿Quién fue el primer presidente de México?",
    opciones: ["Miguel Hidalgo", "Vicente Guerrero", "Guadalupe Victoria", "Benito Juárez"],
    correcta: 2,
  },
  {
    pregunta: "¿Qué país organizó los Juegos Olímpicos en 2021?",
    opciones: ["China", "Japón", "Brasil", "Corea del Sur"],
    correcta: 1,
  },
  {
    pregunta: "¿Cuál es el símbolo químico del agua?",
    opciones: ["O2", "H2O", "CO2", "NaCl"],
    correcta: 1,
  },
  {
    pregunta: "¿Cuál es el río más largo del mundo?",
    opciones: ["Amazonas", "Nilo", "Yangtsé", "Misisipi"],
    correcta: 0,
  }
];

export default function Cultura() {
  const DURATION = 15000;
  const progress = useRef(new Animated.Value(1)).current;
  const animationRef = useRef(null);

  const [preguntasRestantes, setPreguntasRestantes] = useState(preguntas);
  const [preguntaActual, setPreguntaActual] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [puntos, setPuntos] = useState(0);

  useEffect(() => {
    elegirNuevaPregunta(preguntas);
    startTimer();
  }, []);

  const elegirNuevaPregunta = (arr) => {
    if (arr.length === 0) {
      finalizarJuego();
      return;
    }
    const indice = Math.floor(Math.random() * arr.length);
    setPreguntaActual(arr[indice]);
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
        finalizarJuego();
      }
    });
  };

  const finalizarJuego = async () => {
    try {
      const clave = "puntaje_cultura";
      const almacenado = await AsyncStorage.getItem(clave);
      const puntosPrevios = almacenado ? parseInt(almacenado, 10) : 0;
      const nuevosTotales = puntosPrevios + puntos;
      await AsyncStorage.setItem(clave, nuevosTotales.toString());
    } catch (error) {
      console.error("Error guardando puntos:", error);
    }
    setShowModal(true);
  };

  const responder = (index) => {
    if (!preguntaActual) return;
    if (animationRef.current) animationRef.current.stop();

    if (index === preguntaActual.correcta) {
      const nuevosPuntos = puntos + 1;
      setPuntos(nuevosPuntos);

      // Quitar pregunta respondida del array
      const restantes = preguntasRestantes.filter(
        (p) => p.pregunta !== preguntaActual.pregunta
      );

      setPreguntasRestantes(restantes);

      if (restantes.length === 0) {
        finalizarJuego();
      } else {
        elegirNuevaPregunta(restantes);
        startTimer();
      }
    } else {
      finalizarJuego();
    }
  };

  const reiniciarJuego = () => {
    if (animationRef.current) animationRef.current.stop();
    setShowModal(false);
    setPreguntasRestantes(preguntas);
    setPuntos(0);
    elegirNuevaPregunta(preguntas);
    startTimer();
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

      <View style={styles.card}>
        <Text style={styles.texto}>{preguntaActual?.pregunta}</Text>
      </View>

      <View style={styles.opciones}>
        {preguntaActual?.opciones.map((opcion, i) => (
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

      <View style={styles.marcador}>
        <Text style={styles.marcadorTexto}>Puntos: {puntos}</Text>
      </View>

      <Modal visible={showModal} transparent animationType="fade" onRequestClose={() => {}}>
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
    backgroundColor: "#ddff8e",
    flex: 1,
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
    backgroundColor: "#fff",
    padding: 30,
    marginTop: 50,
    marginHorizontal: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  texto: {
    fontWeight: "bold",
    color: "#3f003f",
    textAlign: "center",
    flexWrap: "wrap",
  },
  opciones: {
    marginTop: 10,
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
  marcador: {
   position: "absolute",
    bottom: 10,
    left: 15,
    backgroundColor: "#ddff8e",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#445d1c",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  marcadorTexto: {
    fontFamily:'CreamBeige',
    color: "#445d1c",
    fontSize: 16,
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
    fontFamily: "CreamBeige",
    color: "#34008f",
    marginBottom: 15,
    textAlign: "center",
  },
  boton: {
    backgroundColor: "#34008f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 20,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "CreamBeige",
    textAlign: "center",
  },
});
