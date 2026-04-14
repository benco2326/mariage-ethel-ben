let audio: HTMLAudioElement | null = null;

export const getAudio = () => {
  if (!audio) {
    audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.35;
  }
  return audio;
};
