import React, { useRef } from "react";
import { View, Text, StyleSheet,} from "react-native";
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';



export default function Settings() {
  
  const SoundFile = useRef()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes de Sonido</Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Volumen:</Text>
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
    fontSize:responsiveFontSize(3),
    marginBottom: 30,
    color: "#34008f",
    textAlign: "center",
    fontFamily:'CreamBeige',
  },
  settingRow: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3
  },
  label: {
    fontSize:responsiveFontSize(2.5),
    color: "#34008f",
    marginBottom: 10,
    fontFamily:'CreamBeige',
  },
});