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

const preguntasOriginales = [
  {
    pregunta: "Verde es a hierba como amarillo es a:",
    opciones: ["Papel", "Plátano", "Árbol", "Libro"],
    correcta: 1,
  },
  {
    pregunta: "Arena es a vidrio como:",
    opciones: [
      "Algodón a tela",
      "Miel a abeja",
      "Ácido a limón",
      "Página a libro",
    ],
    correcta: 0,
  },
  {
    pregunta: "Ahorro es a gasto como:",
    opciones: [
      "Arrogante a soberbio",
      "Terso a suave",
      "Compra a venta",
      "Romper a fracturar",
    ],
    correcta: 2,
  },
  {
    pregunta:
      "El hombre que no lee es como un _____ que la corriente de la ignorancia arrastra al abismo del_____.",
    opciones: [
      "Letrado-vacío",
      "Viajero-ahogo",
      "Náufrago-frasco",
      "Asilado-pesar",
    ],
    correcta: 2,
  },
  {
    pregunta:
      "El moderno microscopio ha revelado una sorprendente_____ de estructuras y _____ de las células.",
    opciones: [
      "Forma-mutaciones",
      "Cantidad-semejanzas",
      "Variedad-funciones",
      "Definición-multiplicidades",
    ],
    correcta: 2,
  },
  {
    pregunta:
      "El Enigma del Relojero: En un rincón oscuro de la ciudad, el Sr. Aldebarán, un experto relojero, recibe un reloj detenido con un tic-tac melancólico...",
    opciones: [
      "La causa del tic-tac melancólico del reloj y cómo restaurarlo a su ritmo normal",
      "El origen del reloj y la identidad de su dueño original",
      "El significado de los símbolos y grabados que adornan el reloj",
      "La clave para viajar en el tiempo a través del uso del reloj",
    ],
    correcta: 0,
  },
  {
    pregunta:
      "La Maraña de las Estrellas: En el vasto cosmos, las estrellas tejen historias interconectadas...",
    opciones: [
      "La dedicación de los astrónomos en su búsqueda del conocimiento",
      "La vastedad y el misterio del cosmos que inspiran asombro",
      "La interconexión de todas las cosas en el universo",
      "La belleza y fragilidad de las estrellas",
    ],
    correcta: 1,
  },
  {
    pregunta:
      "El Éxodo de los Arlequines: Bajo la luz de la luna, los arlequines bailan melodías ancestrales...",
    opciones: [
      "Un bosquejo secreto en las profundidades del bosque",
      "Un gran baile de máscaras",
      "Un reino oculto donde el tiempo se detiene y los sueños se entrelazan",
      "Una ciudad olvidada enterrada bajo la tierra",
    ],
    correcta: 2,
  },
  {
    pregunta: "Bisturí es a cirujano como:",
    opciones: [
      "Foco a alumbrado",
      "Martillo a carpintero",
      "Estola a sacerdote",
      "Mineral a minero",
    ],
    correcta: 1,
  },
  {
    pregunta: "Lima es a Perú como:",
    opciones: [
      "Ciudad a país",
      "Chile a Santiago",
      "Madrid a España",
      "España a Madrid",
    ],
    correcta: 2,
  },
  {
    pregunta: "Vaso es a copa como agua a:",
    opciones: ["Jarabe", "Líquido", "Vino", "Vaso"],
    correcta: 1,
  },
  {
    pregunta: "Alto es a deporte como bajo es a:",
    opciones: ["Natación", "Inactividad", "Actividad", "Tranquilidad"],
    correcta: 1,
  },
  {
    pregunta: "Mucho es a poco como:",
    opciones: [
      "Cuaderno a libreta",
      "Suficiente a bastante",
      "Oriente a occidente",
      "Harina a pastel",
    ],
    correcta: 1,
  },
  {
    pregunta:
      "La Ciudad Invisible: Cuenta la leyenda que en un punto lejano del horizonte se oculta una ciudad invisible...",
    opciones: [
      "Un lugar de redención para los perdidos",
      "Un castillo de cristal lleno de secretos",
      "Los sueños y aspiraciones más puros del ser humano",
      "Una ciudad construida por un pasado olvidado",
    ],
    correcta: 2,
  },
  {
    pregunta:
      "El Guardián del Faro: En una isla aislada, un viejo farero mantiene viva la luz que guía a los barcos...",
    opciones: [
      "La tradición frente al progreso tecnológico",
      "La importancia de la esperanza y la fe en tiempos difíciles",
      "La resistencia a los cambios modernos",
      "La conexión entre lo humano y lo mecánico",
    ],
    correcta: 1,
  },
  {
    pregunta:
      "El Jardín Eterno: En un valle oculto, un jardín florece en toda época del año...",
    opciones: [
      "Sus flores cambian según la temporada",
      "Solo florece para quienes tienen un propósito claro",
      "Refleja los deseos y emociones más profundos de quienes lo visitan",
      "Está cuidado por seres mágicos que lo preservan",
    ],
    correcta: 2,
  },
  {
  pregunta: "Nube es a lluvia como fuego es a:",
  opciones: ["Viento", "Humo", "Agua", "Sol"],
  correcta: 1,
},
{
  pregunta: "Corazón es a latido como reloj es a:",
  opciones: ["Tiempo", "Manecillas", "Tic-tac", "Relojero"],
  correcta: 2,
},
{
  pregunta: "El sabio calla, el necio:",
  opciones: ["Espera", "Aprende", "Habla", "Miente"],
  correcta: 2,
},
{
  pregunta: "La luna refleja la luz del:",
  opciones: ["Planeta", "Fuego", "Sol", "Mar"],
  correcta: 2,
},
{
  pregunta: "El faro ilumina como el mapa:",
  opciones: ["Brilla", "Muestra", "Camina", "Señala"],
  correcta: 3,
},
{
  pregunta: "Lectura es a mente como ejercicio es a:",
  opciones: ["Alma", "Cuerpo", "Corazón", "Tiempo"],
  correcta: 1,
},
{
  pregunta: "Los ojos ven como los oídos:",
  opciones: ["Escuchan", "Pasan", "Lloran", "Sienten"],
  correcta: 0,
},
{
  pregunta: "Flor es a pétalo como libro es a:",
  opciones: ["Tapa", "Letras", "Página", "Idea"],
  correcta: 2,
},
{
  pregunta: "Ladrillo es a casa como letra es a:",
  opciones: ["Papel", "Libro", "Escritura", "Texto"],
  correcta: 1,
},
{
  pregunta: "La brújula guía como el reloj:",
  opciones: ["Corre", "Mide", "Controla", "Se atrasa"],
  correcta: 1,
},
{
  pregunta: "Luna es a noche como sol es a:",
  opciones: ["Tierra", "Estrella", "Día", "Fuego"],
  correcta: 2,
},
{
  pregunta: "La lluvia moja como el viento:",
  opciones: ["Seca", "Sopla", "Vuela", "Empuja"],
  correcta: 1,
},
{
  pregunta: "El lápiz escribe como la tijera:",
  opciones: ["Pega", "Afila", "Corta", "Mide"],
  correcta: 2,
},
{
  pregunta: "El fuego quema como el hielo:",
  opciones: ["Enfría", "Apaga", "Funde", "Brilla"],
  correcta: 0,
},
{
  pregunta: "La semilla es a planta como la idea es a:",
  opciones: ["Texto", "Palabra", "Pensamiento", "Obra"],
  correcta: 3,
},
{
  pregunta: "El pez nada como el ave:",
  opciones: ["Nada", "Vuela", "Corre", "Nada y vuela"],
  correcta: 1,
},
{
  pregunta: "El pintor pinta como el músico:",
  opciones: ["Escribe", "Lee", "Compone", "Canta"],
  correcta: 2,
},
{
  pregunta: "Un triángulo tiene tres lados como un cuadrado:",
  opciones: ["Dos", "Tres", "Cuatro", "Cinco"],
  correcta: 2,
},
{
  pregunta: "Río es a agua como camino es a:",
  opciones: ["Barro", "Polvo", "Destino", "Pasos"],
  correcta: 3,
},
{
  pregunta: "La tristeza entristece como la alegría:",
  opciones: ["Preocupa", "Mueve", "Asusta", "Alegra"],
  correcta: 3,
},
{
  pregunta: "Llave es a cerradura como código es a:",
  opciones: ["Texto", "Candado", "Acceso", "Computadora"],
  correcta: 2,
},
{
  pregunta: "El sol calienta como la luna:",
  opciones: ["Brilla", "Guía", "Refleja", "Se oculta"],
  correcta: 2,
},
{
  pregunta: "El pan es a trigo como la leche es a:",
  opciones: ["Vaca", "Mantequilla", "Queso", "Grano"],
  correcta: 0,
},
{
  pregunta: "Silencio es a paz como ruido es a:",
  opciones: ["Guerra", "Desorden", "Miedo", "Fiesta"],
  correcta: 1,
},
{
  pregunta: "La abeja hace miel como la araña:",
  opciones: ["Atrapa", "Cose", "Hace red", "Teje"],
  correcta: 3,
}

];

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function getFontSize(text, maxFont = 18, minFont = 12, maxLength = 120) {
  if (!text) return maxFont;
  if (text.length <= maxLength / 3) return maxFont;
  if (text.length >= maxLength) return minFont;
  const size =
    maxFont -
    ((text.length - maxLength / 3) / (maxLength - maxLength / 3)) *
      (maxFont - minFont);
  return size;
}

export default function Lectura() {
  const DURATION = 30000;
  const progress = useRef(new Animated.Value(1)).current;
  const animationRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    const mezcladas = shuffleArray(preguntasOriginales);
    setPreguntas(mezcladas);
    startTimer();
  }, []);

  const startTimer = () => {
    progress.setValue(1);
    animationRef.current = Animated.timing(progress, {
      toValue: 0,
      duration: DURATION,
      useNativeDriver: false,
    });
    animationRef.current.start(({ finished }) => {
      if (finished) setShowModal(true);
    });
  };

  const reiniciarJuego = () => {
    animationRef.current?.stop();
    const mezcladas = shuffleArray(preguntasOriginales);
    setPreguntas(mezcladas);
    setShowModal(false);
    setPreguntaActual(0);
    setPuntaje(0);
    setTimeout(startTimer, 100);
  };

  const handleRespuesta = async (index) => {
    const esCorrecta = index === preguntas[preguntaActual].correcta;
    if (esCorrecta) {
      const nuevoPuntaje = puntaje + 1;
      setPuntaje(nuevoPuntaje);

      try {
        const guardado = await AsyncStorage.getItem("puntaje_lectura");
        if (!guardado || nuevoPuntaje > parseInt(guardado)) {
          await AsyncStorage.setItem("puntaje_lectura", nuevoPuntaje.toString());
        }
      } catch (e) {
        console.error("Error guardando el puntaje:", e);
      }

      if (preguntaActual + 1 < preguntas.length) {
        setPreguntaActual(preguntaActual + 1);
        animationRef.current?.stop();
        startTimer();
      } else {
        animationRef.current?.stop();
        setShowModal(true);
      }
    } else {
      animationRef.current?.stop();
      setShowModal(true);
    }
  };

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  if (preguntas.length === 0) return null;

  const pregunta = preguntas[preguntaActual];
  const preguntaFontSize = getFontSize(pregunta.pregunta);

  return (
    <View style={styles.screen}>
      <View style={styles.marcador}>
        <Text style={styles.marcadorTexto}>Puntos: {puntaje}</Text>
      </View>

      <View style={styles.tiempo}>
        <Animated.View style={[styles.barra, { width: widthInterpolated }]} />
      </View>

      <View style={styles.card}>
        <Text style={[styles.texto, { fontSize: preguntaFontSize }]}>
          {pregunta.pregunta}
        </Text>
      </View>

      <View style={styles.opciones}>
        {pregunta.opciones.map((opcion, index) => {
          const fontSize = getFontSize(opcion, 16, 12, 80);
          return (
            <TouchableOpacity
              key={index}
              style={styles.opcion}
              onPress={() => handleRespuesta(index)}
            >
              <Text style={[styles.opcionTexto, { fontSize }]}>{opcion}</Text>
            </TouchableOpacity>
          );
        })}
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
  screen: { flex: 1, backgroundColor: "#ffd77f" },
  marcador: {
    position: "absolute",
    bottom: 10,
    left: 15,
    backgroundColor: "#ffd77f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#c18600",
    elevation: 4,
  },
  marcadorTexto: {
    fontSize: 16,
    fontFamily: "CreamBeige",
    color: "#c18600",
    textAlign: "center",
  },
  tiempo: {
    height: 20,
    backgroundColor: "#c18600",
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  barra: {
    height: "100%",
    backgroundColor: "#ffd77f",
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
    backgroundColor: "#fff",
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
