import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';

let sound = null;
let isPlaying = false;

export const initSound = () => {
  if (!sound) {
    sound = new Sound('logus.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Error al cargar audio:', error);
        return;
      }
      sound.setNumberOfLoops(-1);
    });
  }
};

export const playSound = () => {
  if (sound) {
    sound.setCurrentTime(0);
    sound.play(() => {
      isPlaying = true;
    });
  }
};

export const stopSound = () => {
  if (sound) {
    sound.stop(() => {
      isPlaying = false;
    });
  }
};

export const isSoundPlaying = () => isPlaying;

export const setMusicEnabled = async (enabled) => {
  try {
    await AsyncStorage.setItem('musicEnabled', JSON.stringify(enabled));
  } catch (error) {
    console.error('Error guardando preferencia de música:', error);
  }
};

export const getMusicEnabled = async () => {
  try {
    const value = await AsyncStorage.getItem('musicEnabled');
    return value !== null ? JSON.parse(value) : false;
  } catch (error) {
    console.error('Error obteniendo preferencia de música:', error);
    return false;
  }
};
