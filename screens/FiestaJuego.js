import React, { useEffect, useRef, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";

const DURACION_MAXIMA = 30000; // 30 segundos

const preguntasBase = [
  {
    pregunta: "Me ves en el agua, pero nunca me mojo.",
    opciones: ["El reflejo", "Un pez", "Un barco", "Las nubes"],
    correcta: 0,
    // imagen: require('./ruta/a/la/imagen1.jpg'), // Ejemplo si tienes imagen local
  },
  {
    pregunta: "No es camino, pero anda, no es campana, pero suena.",
    opciones: ["La bicicleta", "El reloj", "El tambor", "La brújula"],
    correcta: 1,
  },
  {
    pregunta: "Tiene forma de anillo y agua en su interior, todos te lo ofrecen como prenda de amor.",
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
    pregunta: "Si me miras te miraré, si me tocas te tocaré, pero si te ríes, yo también lo haré.",
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

  // Preguntas nuevas que me diste:
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
];

export default function FiestaJuegos() {


  const [preguntas, setPreguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [mostrarImagen, setMostrarImagen] = useState(false);
  const [mostrarPregunta, setMostrarPregunta] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState(DURACION_MAXIMA);
  const [showModal, setShowModal] = useState(false);

  const progress = useRef(new Animated.Value(1)).current;
  const timerInterval = useRef(null);
  const animation = useRef(null);
  

  const mezclarArray = (arr) => {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const detenerJuego = () => {
    if (animation.current) animation.current.stop();
    if (timerInterval.current) clearInterval(timerInterval.current);
    setShowModal(true);
  };

  const iniciarTemporizador = (duracion) => {
    if (animation.current) animation.current.stop();
    if (timerInterval.current) clearInterval(timerInterval.current);

    progress.setValue(1);
    setTiempoRestante(duracion);

    animation.current = Animated.timing(progress, {
      toValue: 0,
      duration: duracion,
      useNativeDriver: false,
    });
    animation.current.start(({ finished }) => {
      if (finished) detenerJuego();
    });

    timerInterval.current = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1000) {
          clearInterval(timerInterval.current);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
  };

  useEffect(() => {
    const aleatorias = mezclarArray(preguntasBase);
    setPreguntas(aleatorias);
    setIndice(0);
    setPuntaje(0);
    setShowModal(false);
    setMostrarImagen(false);
    setMostrarPregunta(false);

    setTimeout(() => {
      const primera = aleatorias[0];
      if (primera?.imagen) {
        setMostrarImagen(true);
        setMostrarPregunta(false);
        setTimeout(() => {
          setMostrarImagen(false);
          setMostrarPregunta(true);
        }, 7000);
      } else {
        setMostrarPregunta(true);
      }
      iniciarTemporizador(DURACION_MAXIMA);
    }, 100);

    return () => {
      if (animation.current) animation.current.stop();
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, []);

  const siguientePregunta = () => {
    if (indice + 1 >= preguntas.length) {
      detenerJuego();
      return;
    }
    setIndice(indice + 1);

    const proxima = preguntas[indice + 1];
    if (proxima?.imagen) {
      setMostrarImagen(true);
      setMostrarPregunta(false);
      setTimeout(() => {
        setMostrarImagen(false);
        setMostrarPregunta(true);
      }, 7000);
    } else {
      setMostrarImagen(false);
      setMostrarPregunta(true);
    }
  };

  const responder = (opcionSeleccionada) => {
    if (!mostrarPregunta || showModal) return;

    const pregunta = preguntas[indice];
    if (opcionSeleccionada === pregunta.correcta) {
      setPuntaje((p) => p + 1);
      setTiempoRestante((t) => {
        const nuevoTiempo = t + 5000;
        const tiempoAUsar = nuevoTiempo > DURACION_MAXIMA ? DURACION_MAXIMA : nuevoTiempo;
        iniciarTemporizador(tiempoAUsar);
        return tiempoAUsar;
      });

      setMostrarPregunta(false);
      setMostrarImagen(false);
      setTimeout(() => siguientePregunta(), 500);
    } else {
      detenerJuego();
    }
  };

  const reiniciarJuego = () => {
    if (animation.current) animation.current.stop();
    if (timerInterval.current) clearInterval(timerInterval.current);

    setShowModal(false);
    setIndice(0);
    setPuntaje(0);
    setMostrarImagen(false);
    setMostrarPregunta(false);

    const aleatorias = mezclarArray(preguntasBase);
    setPreguntas(aleatorias);

    setTimeout(() => {
      const primera = aleatorias[0];
      if (primera?.imagen) {
        setMostrarImagen(true);
        setMostrarPregunta(false);
        setTimeout(() => {
          setMostrarImagen(false);
          setMostrarPregunta(true);
        }, 7000);
      } else {
        setMostrarPregunta(true);
      }
      iniciarTemporizador(DURACION_MAXIMA);
    }, 100);
  };

  const preguntaActual = preguntas[indice] || {};

  return (
    <View style={styles.screen}>
      <View style={styles.tiempo}>
        <Animated.View
          style={[
            styles.barra,
            {
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>

      <View style={styles.card}>
        {mostrarImagen && preguntaActual?.imagen && (
          <Image source={preguntaActual.imagen} style={styles.imagen} resizeMode="contain" />
        )}

        {mostrarPregunta && (
          <Text
            style={[
              styles.texto,
              preguntaActual.pregunta?.length > 100 && styles.textoPequeño,
            ]}
            numberOfLines={4}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
          >
            {preguntaActual?.pregunta}
          </Text>
        )}
      </View>

      {mostrarPregunta && (
        <View style={styles.opcionesContainer}>
          {preguntaActual?.opciones?.map((opcion, i) => (
            <TouchableOpacity
              key={i}
              style={styles.opcion}
              onPress={() => responder(i)}
            >
              <Text
                style={styles.opcionTexto}
                numberOfLines={2}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
              >
                {opcion}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.marcador}>
        <Text style={styles.marcadorTexto}>Puntaje: {puntaje}</Text>
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
    backgroundColor: "#fd4b7d",
    flex: 1,
    paddingTop: 20,
  },
  tiempo: {
    height: 30,
    backgroundColor: "#97002b",
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 15,
    overflow: "hidden",
    justifyContent: "center",
  },
  barra: {
    height: "100%",
    backgroundColor: "#fd4b7d",
  },
  card: {
    backgroundColor: "#ffff",
    padding: 30,
    marginTop: 50,
    marginHorizontal: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  imagen: {
    width: 300,
    height: 200,
    borderRadius: 15,
  },
  texto: {
    fontWeight: "bold",
    color: "#3f003f",
    textAlign: "center",
    flexWrap: "wrap",
  },
  textoPequeño: {
    fontSize: 16,
  },
  opcionesContainer: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  opcion: {
    backgroundColor: "#fff",
    paddingVertical: 17.5,
    borderRadius: 10,
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
  marcador: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#fd4b7d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#97002b",
  },
  marcadorTexto: {
    fontSize: 16,
    color: "#97002b",
    fontFamily:'CreamBeige',
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
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
