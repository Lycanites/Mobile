import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AudioContext } from "../src/Components/AudioContext"; // Ajusta ruta según sea necesario

export default function Settings() {
  const {
    generalOn, setGeneralOn,
    juegosOn, setJuegosOn,
    fiestaOn, setFiestaOn,
    zenOn, setZenOn
  } = useContext(AudioContext);

  // Claves para AsyncStorage
  const keys = {
    general: "MUSICA_GENERAL",
    juegos: "MUSICA_JUEGOS",
    fiesta: "MUSICA_FIESTA",
    zen: "MUSICA_ZEN"
  };

  // Guardar cambios en AsyncStorage al cambiar switches
  const handleSwitchChange = async (key, value, setter) => {
    try {
      setter(value);
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log("Error guardando preferencia:", key, e);
    }
  };

  // Cargar valores al iniciar
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const general = await AsyncStorage.getItem(keys.general);
        const juegos = await AsyncStorage.getItem(keys.juegos);
        const fiesta = await AsyncStorage.getItem(keys.fiesta);
        const zen = await AsyncStorage.getItem(keys.zen);

        if (general !== null) setGeneralOn(JSON.parse(general));
        if (juegos !== null) setJuegosOn(JSON.parse(juegos));
        if (fiesta !== null) setFiestaOn(JSON.parse(fiesta));
        if (zen !== null) setZenOn(JSON.parse(zen));
      } catch (e) {
        console.log("Error cargando preferencias de sonido", e);
      }
    };

    loadSettings();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes de Sonido</Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>
          Musica General: {generalOn ? "ON" : "OFF"}
        </Text>
        <Switch
          value={generalOn}
          onValueChange={(value) => handleSwitchChange(keys.general, value, setGeneralOn)}
          trackColor={{ false: "#ccc", true: "#996ee5" }}
          thumbColor={generalOn ? "#34008f" : "#f4f3f4"}
          ios_backgroundColor="#ccc"
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.label}>
          Musica Juegos: {juegosOn ? "ON" : "OFF"}
        </Text>
        <Switch
          value={juegosOn}
          onValueChange={(value) => handleSwitchChange(keys.juegos, value, setJuegosOn)}
          trackColor={{ false: "#ccc", true: "#996ee5" }}
          thumbColor={juegosOn ? "#34008f" : "#f4f3f4"}
          ios_backgroundColor="#ccc"
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.label}>
          Musica Fiesta: {fiestaOn ? "ON" : "OFF"}
        </Text>
        <Switch
          value={fiestaOn}
          onValueChange={(value) => handleSwitchChange(keys.fiesta, value, setFiestaOn)}
          trackColor={{ false: "#ccc", true: "#996ee5" }}
          thumbColor={fiestaOn ? "#34008f" : "#f4f3f4"}
          ios_backgroundColor="#ccc"
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.label}>
          Musica Zen: {zenOn ? "ON" : "OFF"}
        </Text>
        <Switch
          value={zenOn}
          onValueChange={(value) => handleSwitchChange(keys.zen, value, setZenOn)}
          trackColor={{ false: "#ccc", true: "#996ee5" }}
          thumbColor={zenOn ? "#34008f" : "#f4f3f4"}
          ios_backgroundColor="#ccc"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5"
  },
  title: {
    fontSize: responsiveFontSize(3),
    marginBottom: 20,
    color: "#34008f",
    textAlign: "center",
    fontFamily: "CreamBeige"
  },
  settingRow: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  label: {
    fontSize: responsiveFontSize(2.5),
    color: "#34008f",
    fontFamily: "CreamBeige"
  }
});
