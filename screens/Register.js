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

export default function Register() {
  const navigation = useNavigation();

  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Validación sencilla para evitar SQLi, XSS y entradas peligrosas
  const contienePeligroso = (texto) => {
    const regex = /['";<>`]|(script)|(--)/gi;
    return regex.test(texto);
  };

  const handleRegister = () => {
    if (!usuario || !email || !password || !confirmPassword) {
      setError("Debes completar todos los campos.");
      return;
    }

    if (contienePeligroso(usuario) || contienePeligroso(email) || contienePeligroso(password) || contienePeligroso(confirmPassword)) {
      setError("Entrada no permitida. Usa caracteres válidos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Validación simple email (puedes usar regex más complejos)
    if (!email.includes("@") || !email.includes(".")) {
      setError("Ingresa un correo válido.");
      return;
    }

    // Aquí puedes hacer cifrado de la contraseña si deseas (normalmente en backend)
    // const encryptedPassword = CryptoJS.SHA256(password).toString();

    // Simulación de envío:
    console.log("Registrar usuario:", { usuario, email, password });
    setError(""); // limpiar error
    // navegación a pantalla siguiente, p.ej:
    // navigation.navigate("Login");
  };

  return (
    <View style={styles.padre}>
      <Image source={require('../src/Assets/img/Logo.jpeg')} style={styles.profile} />
      <Text style={styles.textit}>Registro de Usuario</Text>

      <View style={styles.card}>
        <View style={styles.cajatexto}>
          <TextInput
            placeholder="Nombre de Usuario"
            placeholderTextColor="gray"
            style={{ paddingHorizontal: 15, color: "gray" }}
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.cajatexto}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="gray"
            style={{ paddingHorizontal: 15, color: "gray" }}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.cajatexto}>
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="gray"
            style={{ paddingHorizontal: 15, color: "gray" }}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.cajatexto}>
          <TextInput
            placeholder="Confirmar Contraseña"
            placeholderTextColor="gray"
            style={{ paddingHorizontal: 15, color: "gray" }}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.padrebutton}>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.textbutton}>Registrarse</Text>
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
    padding: 17.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textit: {
    fontFamily: "CreamBeige",
    fontSize: 24,
    color: "#34008f",
    textAlign: "center",
  },
  cajatexto: {
    paddingVertical: 15,
    backgroundColor: "#cccccc40",
    borderRadius: 20,
    marginVertical: 7.5,
  },
  padrebutton: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#996ee5",
    borderRadius: 30,
    paddingVertical: 20,
    width: 150,
    marginTop: 15,
  },
  textbutton: {
    textAlign: "center",
    color: "white",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});
