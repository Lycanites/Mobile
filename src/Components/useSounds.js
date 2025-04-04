import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import Sound from "react-native-sound";
import { useState } from "react";

export const useSound = (file, isSoundEnabled) => {

  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (!isSoundEnabled) return;  

    
    Sound.setCategory(Platform.OS === "ios" ? "Playback" : "Ambient");

    
    if (sound.current) {
      sound.current.stop();
      sound.current.release();
    }

    sound.current = new Sound(file, Sound.MAIN_BUNDLE, (error) => {
      if (!error) {
     
        sound.current.setNumberOfLoops(-1);  
        sound.current.setVolume(1); 
        sound.current.play((playbackError) => {
          if (playbackError) {
            console.log("Error reproduciendo el sonido:", playbackError);
          }
        });
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
