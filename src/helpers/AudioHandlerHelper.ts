export default class AudioHandlerHelper {
  public static startLoot() {
    const audio = this.initAudioObject();
    audio.src = 'assets/sounds/wait-for-loot.ogg';
    audio.play();
  }

  public static useBomb() {
    const audio = this.initAudioObject();
    audio.src = 'assets/sounds/explosion.ogg';
    audio.play();
  }

  public static openedLoot(hasLegendary: boolean) {
    const audio = this.initAudioObject();
    audio.src = 'assets/sounds/open-loot.ogg';
    audio.play();
    if (hasLegendary) {
      audio.onended = () => {
        audio.src = 'assets/sounds/leg-announcer.ogg';
        audio.play().then(() => {
          setTimeout(() => {
            audio.pause();
          },         2700);
        });
      };
    }
  }

  public static useMultiplier() {
    const audio = this.initAudioObject();
    audio.src = 'assets/sounds/buff-1.ogg';
    audio.play();
  }

  public static useKey() {
    const audio = this.initAudioObject();
    audio.src = 'assets/sounds/key.ogg';
    audio.play();
  }

  public static legendaryDrop() {
    const audio = this.initAudioObject();
    audio.src = 'assets/sounds/leg-announcer.ogg';
    audio.play();
  }

  public static initTheme() {
    const audio = this.initAudioObject();
    const tracks = [
      'assets/sounds/theme-1.mp3',
      'assets/sounds/theme-2.mp3',
      'assets/sounds/theme-3.mp3',
      'assets/sounds/theme-4.mp3',
      'assets/sounds/theme-5.mp3',
      'assets/sounds/theme-6.mp3',
      'assets/sounds/theme-7.mp3',
    ];
    audio.src = tracks[Math.floor(Math.random() * tracks.length)];

    audio.play();
    return audio;
  }

  public static resumeTheme(audio: HTMLAudioElement) {
    audio.play();
  }

  public static muteTheme(audio: HTMLAudioElement) {
    audio.pause();
  }

  public static initAudioObject() {
    const audio = new Audio();
    audio.volume = 0.2;
    return audio;
  }
}
