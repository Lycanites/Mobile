import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { useSound } from "../src/Components/useSounds";
import Sound from "react-native-sound";
import soundFile from "../src/Music/backmusic.mp3";

export default function Settings() {

  const { setVolume: adjustVolume } = useSound(soundFile, true);

  const handleVolumeChange = (value) => {
    setVolume(value);
    if (adjustVolume) {
      adjustVolume(value);
    } else {
      console.warn("adjustVolume no está definido aún");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes de Volumen</Text>
      <View style={styles.volumeContainer}>
        <Text style={styles.label}>Volumen General</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          step={0.01}
          value={volume}
          onValueChange={handleVolumeChange}
          minimumTrackTintColor="blue"
          maximumTrackTintColor="gray"
          thumbTintColor="blue"
        />
        <Text style={styles.volumeText}>{Math.round(volume * 100)}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  volumeContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  slider: {
    width: "100%",
    marginTop: 10,
  },
  volumeText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 5,
  },
});
