export default class AudioHandlerService {
  static startLoot() {
    const audio = this.initAudioObject();
    audio.src = 'assets/sounds/wait-for-loot.ogg';
    audio.play();
  }

  static useBomb() {
    const audio = this.initAudioObject();
    audio.src = 'assets/sounds/explosion.ogg';
    audio.play();
  }

  static openedLoot(hasLegendary) {
    const audio = this.initAudioObject();
    audio.src = 'assets/sounds/open-loot.ogg';
    audio.play();
    if (hasLegendary === true) {
      audio.onended = () => {
        audio.src = 'assets/sounds/leg-announcer.ogg';
        audio.play().then(() => {
          setTimeout(() => {
            audio.pause();
          }, 2700);
        });
      };
    }
  }

  static useMultiplier() {
    const audio = this.initAudioObject();
    audio.src = 'assets/sounds/buff-1.ogg';
    audio.play();
  }

  static useKey() {
    const audio = this.initAudioObject();
    audio.src = 'assets/sounds/key.ogg';
    audio.play();
  }

  static legendaryDrop() {
    const audio = this.initAudioObject();
    audio.src = 'assets/sounds/leg-announcer.ogg';
    audio.play();
  }

  static initTheme() {
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
    audio.src = tracks[Math.floor(Math.random() * 7)];

    audio.play();
    return audio;
  }

  static resumeTheme(audio) {
    audio.play();
  }

  static muteTheme(audio) {
    audio.pause();
  }

  static initAudioObject() {
    const audio = new Audio();
    audio.volume = 0.2;
    return audio;
  }
}
