import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import {
  playSound,
  stopSound,
  isSoundPlaying,
  setMusicEnabled,
  getMusicEnabled
} from "../src/Components/AudioManager";
import { responsiveFontSize } from "react-native-responsive-dimensions";

export default function Settings() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const fetchMusicSetting = async () => {
      const musicEnabled = await getMusicEnabled();
      setIsEnabled(musicEnabled);
    };
    fetchMusicSetting();
  }, []);

  const toggleSwitch = async () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    await setMusicEnabled(newValue);

    if (newValue) {
      playSound(); // Reinicia y suena
    } else {
      stopSound(); // Se detiene
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes de Sonido</Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Musica General:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#996ee5" }}
          thumbColor={isEnabled ? "#34008F" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
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
    marginBottom: 30,
    color: "#34008f",
    textAlign: "center",
    fontFamily: "CreamBeige"
  },
  settingRow: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3
  },
  label: {
    fontSize: responsiveFontSize(2.5),
    color: "#34008f",
    marginBottom: 10,
    fontFamily: "CreamBeige"
  }
});
