
class MusicScreen {
  constructor(notifyFinishedPreload) {
    this.setSong = this.setSong.bind(this);
    this.audioPlayer = new AudioPlayer();
    this.playButton = new PlayButton(this.audioPlayer);
    this.notifyFinishedPreload = notifyFinishedPreload;
  }

  setSong(songURL) {
    this.audioPlayer.setSong(songURL);
    this.audioPlayer.setKickCallback(this.gifDisplay.loadGif);
    this.audioPlayer.play();
  }

  setGifs(gifData) {
    this.gifDisplay = new GifDisplay(gifData, this.notifyFinishedPreload);
    this.gifDisplay.preload();
  }
}
