import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Modal,
  TouchableOpacity,
} from "react-native";

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
      "El Enigma del Relojero: En un rincón oscuro de la ciudad, el Sr. Aldebarán, un experto relojero, recibe un reloj detenido con un tic-tac melancólico. Repararlo será un reto supremo, lleno de misterios y significados ocultos, que lo llevará a buscar la armonía temporal.",
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
      "La Maraña de las Estrellas: En el vasto cosmos, las estrellas tejen historias interconectadas. Cada luz y su titilar plantean preguntas sobre el universo. Los astrónomos exploran estos enigmas, buscando comprender la inmensidad del espacio.",
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
      "El Éxodo de los Arlequines: Bajo la luz de la luna, los arlequines bailan melodías ancestrales, guiándose hacia un reino oculto donde los sueños y la realidad convergen, deteniendo el tiempo.",
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
      "La Ciudad Invisible: Cuenta la leyenda que en un punto lejano del horizonte se oculta una ciudad invisible, revelada solo a quienes poseen un corazón puro. La ciudad es un reflejo de los sueños más profundos de quienes la encuentran, construida con luz y esperanza.",
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
      "El Guardián del Faro: En una isla aislada, un viejo farero mantiene viva la luz que guía a los barcos. Aunque la tecnología ha avanzado, el guardián cree que su labor es crucial, pues no es solo la luz la que guía, sino la fe que infunde en los navegantes.",
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
      "El Jardín Eterno: En un valle oculto, un jardín florece en toda época del año. Quienes lo visitan sienten una paz indescriptible, como si las flores capturaran y reflejaran los anhelos de sus visitantes, creando un paraíso único para cada persona.",
    opciones: [
      "Sus flores cambian según la temporada",
      "Solo florece para quienes tienen un propósito claro",
      "Refleja los deseos y emociones más profundos de quienes lo visitan",
      "Está cuidado por seres mágicos que lo preservan",
    ],
    correcta: 2,
  },
];

// Función para mezclar un array (Fisher-Yates shuffle)
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Función para calcular tamaño de fuente según longitud del texto
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
    // Al iniciar, mezcla las preguntas
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
      if (finished) {
        setShowModal(true);
      }
    });
  };

  const reiniciarJuego = () => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
    const mezcladas = shuffleArray(preguntasOriginales);
    setPreguntas(mezcladas);
    setShowModal(false);
    setPreguntaActual(0);
    setPuntaje(0);
    setTimeout(() => {
      startTimer();
    }, 100);
  };

  const handleRespuesta = (index) => {
    if (index === preguntas[preguntaActual].correcta) {
      setPuntaje((p) => p + 1);
      if (preguntaActual + 1 < preguntas.length) {
        setPreguntaActual(preguntaActual + 1);
        if (animationRef.current) {
          animationRef.current.stop();
        }
        startTimer();
      } else {
        if (animationRef.current) {
          animationRef.current.stop();
        }
        setShowModal(true);
      }
    } else {
      if (animationRef.current) {
        animationRef.current.stop();
      }
      setShowModal(true);
    }
  };

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  // Evitar errores antes de que se cargue el shuffle
  if (preguntas.length === 0) return null;

  const pregunta = preguntas[preguntaActual];
  const preguntaFontSize = getFontSize(pregunta.pregunta, 18, 12, 120);

  return (
    <View style={styles.screen}>
      {/* Marcador de puntaje arriba */}
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
          const opcionFontSize = getFontSize(opcion, 16, 12, 80);
          return (
            <TouchableOpacity
              key={index}
              style={styles.opcion}
              onPress={() => handleRespuesta(index)}
            >
              <Text style={[styles.opcionTexto, { fontSize: opcionFontSize }]}>
                {opcion}
              </Text>
            </TouchableOpacity>
          );
        })}
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
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#ffd77f",
    flex: 1,
  },
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
    backgroundColor: "#ffff",
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
    marginTop:10,
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
