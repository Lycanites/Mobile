import React, { useCon } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

export default function Settings() {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes de Sonido</Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Musica General:</Text>
        <Switch
      />
      </View>
      <View style={styles.settingRow}>
        <Text style={styles.label}>Musica Juegos:</Text>
        <Switch
      />
      </View>
      <View style={styles.settingRow}>
        <Text style={styles.label}>Musica Fiesta:</Text>
        <Switch
      />
      </View>
      <View style={styles.settingRow}>
        <Text style={styles.label}>Musica Zen:</Text>
        <Switch
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
    elevation: 3
  },
  label: {
    fontSize: responsiveFontSize(2.5),
    color: "#34008f",
    marginBottom: 10,
    fontFamily: "CreamBeige"
  }
});
