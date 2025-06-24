import React, { createContext, useState, useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import Sound from 'react-native-sound';

export const AudioContext = createContext();

export const AudioProvider = ({ children, currentRoute }) => {
  const [generalOn, setGeneralOn] = useState(true);
  const [fiestaOn, setFiestaOn] = useState(true);
  const [zenOn, setZenOn] = useState(true);
  const [juegosOn, setJuegosOn] = useState(true);

  const [soundLogus, setSoundLogus] = useState(null);
  const [soundFiesta, setSoundFiesta] = useState(null);
  const [soundZen, setSoundZen] = useState(null);

  const [soundMemoria, setSoundMemoria] = useState(null);
  const [soundLogica, setSoundLogica] = useState(null);
  const [soundLectura, setSoundLectura] = useState(null);
  const [soundCultura, setSoundCultura] = useState(null);
  const [soundAnalisis, setSoundAnalisis] = useState(null);

  const [isPlayingLogus, setIsPlayingLogus] = useState(false);
  const [isPlayingFiesta, setIsPlayingFiesta] = useState(false);
  const [isPlayingZen, setIsPlayingZen] = useState(false);

  const [isPlayingMemoria, setIsPlayingMemoria] = useState(false);
  const [isPlayingLogica, setIsPlayingLogica] = useState(false);
  const [isPlayingLectura, setIsPlayingLectura] = useState(false);
  const [isPlayingCultura, setIsPlayingCultura] = useState(false);
  const [isPlayingAnalisis, setIsPlayingAnalisis] = useState(false);

  const appState = useRef(AppState.currentState);

  const excludedLogusRoutes = [
    'Login', 'Register', 'FiestaL', 'FiestaJuego', 'ZenL', 'ZenJuego',
    'Analisis', 'Cultura', 'Logica', 'Lectura', 'Memoria',
    'LoadingM', 'LoadingL', 'Loadingl', 'LoadingC', 'LoadingA'
  ];

  const fiestaRoutes = ['FiestaL', 'FiestaJuego'];
  const zenRoutes = ['ZenL', 'ZenJuego'];

  const gameRouteMap = {
    Memoria: ['Memoria', 'LoadingM'],
    Logica: ['Logica', 'LoadingL'],
    Lectura: ['Lectura', 'Loadingl'],
    Cultura: ['Cultura', 'LoadingC'],
    Analisis: ['Analisis', 'LoadingA'],
  };

  const gameSounds = {
    Memoria: [soundMemoria, setIsPlayingMemoria],
    Logica: [soundLogica, setIsPlayingLogica],
    Lectura: [soundLectura, setIsPlayingLectura],
    Cultura: [soundCultura, setIsPlayingCultura],
    Analisis: [soundAnalisis, setIsPlayingAnalisis],
  };

  const isPlayingMap = {
    Memoria: isPlayingMemoria,
    Logica: isPlayingLogica,
    Lectura: isPlayingLectura,
    Cultura: isPlayingCultura,
    Analisis: isPlayingAnalisis,
  };

  // Todas las canciones con sus setters y estados para control general
  const allSounds = [
    [soundLogus, setIsPlayingLogus],
    [soundFiesta, setIsPlayingFiesta],
    [soundZen, setIsPlayingZen],
    [soundMemoria, setIsPlayingMemoria],
    [soundLogica, setIsPlayingLogica],
    [soundLectura, setIsPlayingLectura],
    [soundCultura, setIsPlayingCultura],
    [soundAnalisis, setIsPlayingAnalisis],
  ];

  useEffect(() => {
    Sound.setCategory('Playback');

    const sounds = {
      logus: new Sound('logus.mp3', Sound.MAIN_BUNDLE, (e) => !e && setSoundLogus(sounds.logus)),
      fiesta: new Sound('fiesta.mp3', Sound.MAIN_BUNDLE, (e) => !e && setSoundFiesta(sounds.fiesta)),
      zen: new Sound('zen.mp3', Sound.MAIN_BUNDLE, (e) => !e && setSoundZen(sounds.zen)),
      memoria: new Sound('memoria.mp3', Sound.MAIN_BUNDLE, (e) => !e && setSoundMemoria(sounds.memoria)),
      logica: new Sound('logica.mp3', Sound.MAIN_BUNDLE, (e) => !e && setSoundLogica(sounds.logica)),
      lectura: new Sound('lectura.mp3', Sound.MAIN_BUNDLE, (e) => !e && setSoundLectura(sounds.lectura)),
      cultura: new Sound('cultura.mp3', Sound.MAIN_BUNDLE, (e) => !e && setSoundCultura(sounds.cultura)),
      analisis: new Sound('analisis.mp3', Sound.MAIN_BUNDLE, (e) => !e && setSoundAnalisis(sounds.analisis)),
    };

    return () => {
      Object.values(sounds).forEach(sound => sound.release());
    };
  }, []);

  useEffect(() => {
    if (!soundLogus || !soundFiesta || !soundZen) return;

    const logusExcluded = excludedLogusRoutes.includes(currentRoute);
    const isFiestaRoute = fiestaRoutes.includes(currentRoute);
    const isZenRoute = zenRoutes.includes(currentRoute);

    const isGameRoute = Object.values(gameRouteMap).flat().includes(currentRoute);

    const playSound = (sound, setPlaying) => {
      sound.setCurrentTime(0);
      sound.setNumberOfLoops(-1);
      sound.play(() => setPlaying(false));
      setPlaying(true);
    };

    const stopSound = (sound, setPlaying) => {
      sound.stop(() => setPlaying(false));
    };

    // Música general Logus
    if (generalOn && !logusExcluded && !isGameRoute && !isPlayingLogus) playSound(soundLogus, setIsPlayingLogus);
    else if ((!generalOn || logusExcluded || isGameRoute) && isPlayingLogus) stopSound(soundLogus, setIsPlayingLogus);

    // Música Fiesta
    if (fiestaOn && isFiestaRoute && !isPlayingFiesta) playSound(soundFiesta, setIsPlayingFiesta);
    else if ((!fiestaOn || !isFiestaRoute) && isPlayingFiesta) stopSound(soundFiesta, setIsPlayingFiesta);

    // Música Zen
    if (zenOn && isZenRoute && !isPlayingZen) playSound(soundZen, setIsPlayingZen);
    else if ((!zenOn || !isZenRoute) && isPlayingZen) stopSound(soundZen, setIsPlayingZen);

    // Música Juegos
    if (juegosOn) {
      Object.entries(gameRouteMap).forEach(([key, routes]) => {
        const [sound, setPlaying] = gameSounds[key];
        if (routes.includes(currentRoute)) {
          if (sound && !isPlayingMap[key]) {
            playSound(sound, setPlaying);
          }
        } else if (isPlayingMap[key]) {
          stopSound(sound, setPlaying);
        }
      });
    } else {
      Object.values(gameSounds).forEach(([sound, setPlaying]) => {
        if (sound) stopSound(sound, setPlaying);
      });
    }
  }, [
    currentRoute,
    generalOn, fiestaOn, zenOn, juegosOn,
    soundLogus, soundFiesta, soundZen,
    soundMemoria, soundLogica, soundLectura, soundCultura, soundAnalisis,
    isPlayingMemoria, isPlayingLogica, isPlayingLectura, isPlayingCultura, isPlayingAnalisis,
    isPlayingLogus, isPlayingFiesta, isPlayingZen,
  ]);

  // Manejo AppState para pausar y reanudar TODAS las canciones
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      const isInactive = nextAppState === 'inactive' || nextAppState === 'background';
      const isActive = nextAppState === 'active';

      if (isInactive) {
        // Pausar todas las canciones
        allSounds.forEach(([sound, setPlaying]) => {
          sound?.stop(() => setPlaying(false));
        });
        // Apagar todos los switches para reflejar que la música está apagada
        setGeneralOn(false);
        setFiestaOn(false);
        setZenOn(false);
        setJuegosOn(false);
      }

      if (isActive) {
        // Volver a prender todos los switches para que la música pueda sonar según ruta
        setGeneralOn(true);
        setFiestaOn(true);
        setZenOn(true);
        setJuegosOn(true);
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
    <AudioContext.Provider
      value={{
        generalOn, setGeneralOn,
        fiestaOn, setFiestaOn,
        zenOn, setZenOn,
        juegosOn, setJuegosOn,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
