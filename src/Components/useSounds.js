import { useEffect, useRef } from "react";
import Sound from "react-native-sound";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

export const useSound = (file, isSoundEnabled) => {
  const sound = useRef(null);

  useEffect(() => {
    if (!isSoundEnabled) return;

    Sound.setCategory("Playback");

    const soundPath = resolveAssetSource(file)?.uri || file;

    sound.current = new Sound(soundPath, Sound.MAIN_BUNDLE, (error) => {
      if (!error) {
        sound.current.setNumberOfLoops(-1); 
        sound.current.play();
      } else {
        console.log("Error cargando sonido:", error);
      }
    });

    return () => {
      if (sound.current) {
        sound.current.stop();
        sound.current.release();
      }
    };
  }, [file, isSoundEnabled]); 
};
