let isMusicEnabled = true;

export const setMusicEnabled = (enabled) => {
  isMusicEnabled = enabled;
};

export const getMusicEnabled = () => {
  return isMusicEnabled;
};
