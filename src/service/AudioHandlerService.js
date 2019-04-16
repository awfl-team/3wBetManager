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
    const i = Math.floor(Math.random() * 10);
    switch (i) {
      case 1:
        audio.src = 'assets/sounds/1.mp3';
        break;
      case 2:
        audio.src = 'assets/sounds/2.mp3';
        break;
      case 3:
        audio.src = 'assets/sounds/3.mp3';
        break;
      case 4:
        audio.src = 'assets/sounds/4.mp3';
        break;
      case 5:
        audio.src = 'assets/sounds/5.mp3';
        break;
      case 6:
        audio.src = 'assets/sounds/6.mp3';
        break;
      case 7:
        audio.src = 'assets/sounds/7.mp3';
        break;
      default:
        audio.src = 'assets/sounds/1.mp3';
        break;
    }
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
