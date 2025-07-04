import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

export default function Login() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Validación sencilla para evitar SQLi, XSS y entradas peligrosas
  const contienePeligroso = (texto) => {
    const regex = /['";<>`]|(script)|(--)/gi;
    return regex.test(texto);
  };

  const handleLogin = () => {
    if (!usuario || !password) {
      setError("Debes completar todos los campos.");
      return;
    }

    if (contienePeligroso(usuario) || contienePeligroso(password)) {
      setError("Entrada no permitida. Usa caracteres válidos.");
      return;
    }

    console.log("Iniciar sesión con:", { usuario, password });
    setError(""); // Borrar error si pasa
    // navigation.navigate("Home") o tu siguiente pantalla
  };

  return (
    <View style={styles.padre}>
      <Image source={require('../src/Assets/img/Logo.jpeg')} style={styles.profile} />
      <Text style={styles.textit}>Bienvenido a Logus</Text>

      <View style={styles.card}>
        <View style={styles.cajatexto}>
          <TextInput
            placeholder="Usuario o Correo"
            placeholderTextColor="gray"
            style={styles.textInput}
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.cajatexto}>
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="gray"
            style={styles.textInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.padrebutton}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.textbutton}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.padrebutton}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Register" }],
              })
            }
          >
            <Text style={styles.textbutton2}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  padre: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  profile: {
    width: responsiveWidth(45),
    height: responsiveHeight(10),
    borderRadius: 100,
    borderColor: "white",
  },
  card: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textit: {
    fontFamily: "CreamBeige",
    fontSize: 24,
    color: "#34008f",
  },
  cajatexto: {
    paddingVertical: 15,
    backgroundColor: "#cccccc40",
    borderRadius: 30,
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  textInput: {
    color: "gray",
  },
  padrebutton: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#996ee5",
    borderRadius: 30,
    paddingVertical: 20,
    width: 150,
    marginTop: 20,
  },
  button2: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 10,
    width: 100,
    marginTop: 14,
  },
  textbutton: {
    textAlign: "center",
    color: "white",
    fontSize: responsiveFontSize(2),
  },
  textbutton2: {
    textAlign: "center",
    color: "black",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});
