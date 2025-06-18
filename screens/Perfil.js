import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Perfil() {
  const [puntajesOrdenados, setPuntajesOrdenados] = useState([]);

  const cargarPuntajes = async () => {
    try {
      const memoria = await AsyncStorage.getItem('puntaje_memoria');
      const logica = await AsyncStorage.getItem('puntaje_logica');
      const lectura = await AsyncStorage.getItem('puntaje_lectura');
      const analisis = await AsyncStorage.getItem('puntaje_analisis');
      const cultura = await AsyncStorage.getItem('puntaje_cultura'); // NUEVO

      const puntajes = [
        {
          modo: 'Memoria',
          icono: '🧠',
          puntos: memoria ? parseInt(memoria) : 0,
          color: '#ff8ee1',
        },
        {
          modo: 'Lógica',
          icono: '🧩',
          puntos: logica ? parseInt(logica) : 0,
          color: '#fe9162',
        },
        {
          modo: 'Lectura',
          icono: '📖',
          puntos: lectura ? parseInt(lectura) : 0,
          color: '#ffd77f',
        },
        {
          modo: 'Análisis',
          icono: '🔍',
          puntos: analisis ? parseInt(analisis) : 0,
          color: '#7bcbff',
        },
        {
          modo: 'Cultura',   // NUEVO
          icono: '🌍',
          puntos: cultura ? parseInt(cultura) : 0,
          color: '#ddff8e',
        },
      ];

      // Ordenar por puntaje descendente
      puntajes.sort((a, b) => b.puntos - a.puntos);
      setPuntajesOrdenados(puntajes);
    } catch (error) {
      console.error('Error cargando puntajes:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      cargarPuntajes();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}> Bienvenido Luis !</Text>
      <Text style={styles.titulo2}>Tu clasificacion es: </Text>

      {puntajesOrdenados.map((modo, index) => (
        <View
          key={index}
          style={[styles.caja, { backgroundColor: modo.color }]}
        >
          <View style={styles.posicion}>
            <Text style={styles.posicionTexto}>{index + 1}</Text>
          </View>

          <Text style={styles.nombreJuego}>
            {modo.icono} {modo.modo}
          </Text>

          <Text style={styles.puntaje}>{modo.puntos} pts</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontFamily: 'CreamBeige',
    marginBottom: 20,
    color: '#34008f',
    alignSelf: 'center',
  },
  titulo2: {
    fontSize: 20,
    fontFamily: 'CreamBeige',
    marginBottom: 20,
    color: '#34008f',
    alignSelf: 'flex-start',
  },
  caja: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 8,
    width: '100%',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  posicion: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  posicionTexto: {
    color: 'black',
    fontFamily: 'CreamBeige',
    fontSize: 16,
  },
  nombreJuego: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34008f',
    marginLeft: 10,
  },
  puntaje: {
    fontSize: 16,
    fontFamily: 'CreamBeige',
    color: '#000',
  },
});
