class AudioPlayer {
  constructor() {
    this.audioElement = new Audio();
    this.isPlaying = false;
    this.currentUrl = null;
    this.seekAmount = 5; // seconds
    this.isControlsActive = false; // Flag to manage controls activation
  }

  play(url) {
    if (this.currentUrl !== url) {
      this.audioElement.src = url;
      this.audioElement.play();
      this.currentUrl = url;
      this.isPlaying = true;
    } else if (this.isPlaying) {
      this.audioElement.pause();
      this.isPlaying = false;
    } else {
      this.audioElement.play();
      this.isPlaying = true;
    }
  }

  seek(direction) {
    if (!this.isPlaying) return;

    if (direction === "left") {
      this.audioElement.currentTime = Math.max(
        0,
        this.audioElement.currentTime - this.seekAmount
      );
    } else if (direction === "right") {
      this.audioElement.currentTime = Math.min(
        this.audioElement.duration,
        this.audioElement.currentTime + this.seekAmount
      );
    }
  }

  getState() {
    return {
      isPlaying: this.isPlaying,
      currentUrl: this.currentUrl,
    };
  }

  // Activate global keyboard controls
  activateControls() {
    this.isControlsActive = true;
    document.addEventListener("keydown", this.handleKeydown);
  }

  // Deactivate global keyboard controls
  deactivateControls() {
    this.isControlsActive = false;
    document.removeEventListener("keydown", this.handleKeydown);
  }

  // Handle global keydown events
  handleKeydown = (e) => {
    if (!this.isControlsActive) return;

    if (e.key === "Enter") {
      this.play(this.currentUrl);
    } else if (e.key === "ArrowLeft") {
      this.seek("left");
    } else if (e.key === "ArrowRight") {
      this.seek("right");
    }
  };
}

const audioPlayer = new AudioPlayer();
export default audioPlayer;
