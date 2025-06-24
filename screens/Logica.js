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
    pregunta: "¿Cuántos huevos duros podría comerse una persona aún con el estómago vacío?",
    opciones: ["Uno", "Ninguno", "Los mas posibles", "Los que quepan en su estomago"],
    correcta: 0,
  },
  {
    pregunta: "¿Cómo un hombre se podría casar con la hermana de su viuda?",
    opciones: ["Por lo civil", "No puede", "Con anillos", "Es la misma persona"],
    correcta: 1,
  },
  {
    pregunta: "¿Cuántos nudillos tiene alguien con todos los dedos en su mano?",
    opciones: ["Cero", "5", "10", "20"],
    correcta: 2,
  },
  {
    pregunta: "Imagina estar en una habitación oscura ¿cuál es la mejor salida?",
    opciones: ["La luz", "La puerta", "La imaginacion", "La oscuridad"],
    correcta: 2,
  },
  {
    pregunta: "Antes de descubrirse que el Monte Everest es la montaña más alta ¿cuál era anteriormente?",
    opciones: ["Monte Everest", "Aun no habia", "La segunda montaña mas alta", "La menos alta"],
    correcta: 0,
  },
  {
    pregunta: "¿Qué ocurre cuando una fuerza incalculable choca con un cuerpo inamovible?",
    opciones: ["El cuerpo corresponde a la fuerza", "Ambos se mueven en direcciones opuestas", "No existe la fuerza", "Nada"],
    correcta: 3,
  },
  {
    pregunta: "¿Por qué un barbero prefiere cortarle el pelo a diez hombres antes que a una sola mujer?",
    opciones: ["Porque solo acepta a hombres", "Porque la mujer no paga", "Porque gana más con los hombres", "Porque la mujer llega tarde"],
    correcta: 2,
  },
  {
    pregunta: "¿Cuál de los días es el más largo que puedes ver?",
    opciones: ["Lunes", "El de 25 horas", "Todos son iguales", "Miercoles"],
    correcta: 3,
  },
  {
    pregunta: "¿Por qué la gente duerme más en marzo que en febrero?",
    opciones: ["Por el clima", "Por el sueño", "Por los dias", "Por la comunidad"],
    correcta: 2,
  },
  {
    pregunta: "¿Cómo debe estar primeramente una vela para encenderla?",
    opciones: ["Sin humedad", "Apagada", "A oscuras", "Comprada"],
    correcta: 2,
  },
  {
  pregunta: "Si tienes dos manzanas y te dan dos más, ¿cuántas tienes?",
  opciones: ["2", "3", "4", "5"],
  correcta: 2,
},
{
  pregunta: "¿Cuál número sigue en la secuencia: 2, 4, 6, 8, ___?",
  opciones: ["10", "12", "14", "9"],
  correcta: 0,
},
{
  pregunta: "¿Cuánto es la mitad de 20?",
  opciones: ["5", "10", "15", "20"],
  correcta: 1,
},
{
  pregunta: "¿Cuántos lados tiene un triángulo?",
  opciones: ["2", "3", "4", "5"],
  correcta: 1,
},
{
  pregunta: "¿Cuántas patas tienen 3 perros?",
  opciones: ["8", "10", "12", "6"],
  correcta: 2,
},
{
  pregunta: "Si 5 + 3 = 8, entonces 8 - 3 = ?",
  opciones: ["3", "5", "8", "6"],
  correcta: 1,
},
{
  pregunta: "¿Cuál es el número menor entre 14, 11, 19 y 20?",
  opciones: ["14", "11", "19", "20"],
  correcta: 1,
},
{
  pregunta: "Si compro 2 dulces a $3 cada uno, ¿cuánto pago?",
  opciones: ["3", "5", "6", "9"],
  correcta: 2,
},
{
  pregunta: "¿Cuál es el doble de 9?",
  opciones: ["18", "16", "19", "20"],
  correcta: 0,
},
{
  pregunta: "¿Cuántos segundos tiene 1 minuto?",
  opciones: ["30", "60", "90", "100"],
  correcta: 1,
},
{
  pregunta: "Si tengo 10 pesos y gasto 4, ¿cuántos me quedan?",
  opciones: ["4", "5", "6", "10"],
  correcta: 2,
},
{
  pregunta: "¿Qué número falta: 5, 10, __, 20, 25?",
  opciones: ["12", "13", "15", "17"],
  correcta: 2,
},
{
  pregunta: "¿Cuántos ceros tiene el número mil?",
  opciones: ["1", "2", "3", "4"],
  correcta: 2,
},
{
  pregunta: "Si 2 x 3 = 6, entonces 3 x 2 = ?",
  opciones: ["5", "6", "7", "9"],
  correcta: 1,
},
{
  pregunta: "¿Qué número es el siguiente en la serie? 1, 1, 2, 3, 5, __",
  opciones: ["6", "7", "8", "9"],
  correcta: 2,
},
{
  pregunta: "¿Cuántos minutos hay en media hora?",
  opciones: ["15", "30", "45", "60"],
  correcta: 1,
},
{
  pregunta: "¿Cuál número es el mayor? 77, 707, 770, 7070",
  opciones: ["707", "770", "77", "7070"],
  correcta: 3,
},
{
  pregunta: "Si tengo 3 pares de zapatos, ¿cuántos zapatos tengo?",
  opciones: ["3", "5", "6", "9"],
  correcta: 2,
},
{
  pregunta: "Un cuarto de 100 es:",
  opciones: ["10", "15", "20", "25"],
  correcta: 3,
},
{
  pregunta: "¿Qué número multiplicado por 0 da siempre 0?",
  opciones: ["1", "10", "100", "Cualquiera"],
  correcta: 3,
},
{
  pregunta: "¿Cuál es el número que al sumarle 0 sigue igual?",
  opciones: ["1", "Cualquiera", "0", "10"],
  correcta: 1,
},
{
  pregunta: "Si hoy es lunes, ¿qué día será dentro de 3 días?",
  opciones: ["Martes", "Miércoles", "Jueves", "Viernes"],
  correcta: 2,
},
{
  pregunta: "Un triángulo tiene 3 lados. ¿Cuántos lados tienen 3 triángulos?",
  opciones: ["6", "9", "12", "3"],
  correcta: 1,
},
{
  pregunta: "Si tienes $50 y compras algo de $20, ¿cuánto te sobra?",
  opciones: ["10", "20", "30", "40"],
  correcta: 2,
},
{
  pregunta: "¿Cuántos dedos hay en dos manos?",
  opciones: ["8", "10", "12", "14"],
  correcta: 1,
},
{
  pregunta: "¿Cuál es el triple de 5?",
  opciones: ["10", "15", "20", "25"],
  correcta: 1,
},
{
  pregunta: "¿Qué número falta en esta serie? 100, 90, 80, __, 60",
  opciones: ["70", "75", "85", "95"],
  correcta: 0,
},
{
  pregunta: "¿Cuántos días tiene una semana?",
  opciones: ["5", "6", "7", "8"],
  correcta: 2,
},
{
  pregunta: "Si tienes 4 billetes de $5, ¿cuánto tienes en total?",
  opciones: ["15", "20", "25", "10"],
  correcta: 1,
},
{
  pregunta: "¿Cuántos meses tienen 30 días?",
  opciones: ["4", "5", "6", "11"],
  correcta: 3,
}
];

export default function Logica() {
  const DURATION = 15000;
  const progress = useRef(new Animated.Value(1)).current;
  const animationRef = useRef(null);

  const [preguntasRestantes, setPreguntasRestantes] = useState(preguntas);
  const [preguntaActual, setPreguntaActual] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [puntos, setPuntos] = useState(0);

  useEffect(() => {
    const { pregunta } = elegirPreguntaAleatoria(preguntas);
    setPreguntaActual(pregunta);
    startTimer();
  }, []);

  const elegirPreguntaAleatoria = (arr) => {
    if (arr.length === 0) return null;
    const indice = Math.floor(Math.random() * arr.length);
    return { pregunta: arr[indice], indice };
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
      const clave = "puntaje_logica";
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

      setPreguntasRestantes((prev) => {
        const restantes = prev.filter(
          (p) => p.pregunta !== preguntaActual.pregunta
        );
        if (restantes.length === 0) {
          finalizarJuego();
          return [];
        }

        const { pregunta } = elegirPreguntaAleatoria(restantes);
        setPreguntaActual(pregunta);
        startTimer();
        return restantes;
      });
    } else {
      finalizarJuego();
    }
  };

  const reiniciarJuego = () => {
    if (animationRef.current) animationRef.current.stop();
    setShowModal(false);
    setPreguntasRestantes(preguntas);
    setPuntos(0);
    const { pregunta } = elegirPreguntaAleatoria(preguntas);
    setPreguntaActual(pregunta);
    startTimer();
  };

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  if (!preguntaActual) {
    return (
      <View style={[styles.screen, { justifyContent: "center", alignItems: "center" }]}>
        <Text>Cargando preguntas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.tiempo}>
        <Animated.View style={[styles.barra, { width: widthInterpolated }]} />
      </View>

      <View style={styles.card}>
        <Text style={styles.texto}>{preguntaActual.pregunta}</Text>
      </View>

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

      <View style={styles.marcador}>
        <Text style={styles.marcadorTexto}>Puntos: {puntos}</Text>
      </View>

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>
              {preguntasRestantes.length === 0 ? "🎉 ¡Ganaste el juego!" : "⏳ ¡Perdiste!"}
            </Text>
            <TouchableOpacity style={styles.boton} onPress={reiniciarJuego}>
              <Text style={styles.botonTexto}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Tus estilos se conservan
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fe9162" },
  marcador: {
    position: "absolute",
    bottom: 10,
    left: 15,
    backgroundColor: "#fe9162",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#6d2906",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  marcadorTexto: {
    fontSize: 16,
    fontFamily: "CreamBeige",
    color: "#6d2906",
    textAlign: "center",
  },
  tiempo: {
    height: 20,
    backgroundColor: "#6d2906",
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  barra: {
    height: "100%",
    backgroundColor: "#fe9162",
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
    flexWrap: "wrap",
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
