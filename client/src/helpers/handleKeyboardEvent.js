export default function handleKeyboardEvent(e) {
  const audio = document.getElementById("player-audio");
  switch (e.keyCode) {
    case 32:
      e.preventDefault();
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
      break;
    case 37:
      audio.currentTime -= 5;
      break;
    case 39:
      audio.currentTime += 5;
      break;
    case 38:
      e.preventDefault();
      if (audio.volume <= 0.9) audio.volume += 0.1;
      else audio.volume = 1;
      break;
    case 40:
      e.preventDefault();
      if (audio.volume >= 0.1) audio.volume -= 0.1;
      else audio.volume = 0;
      break;
    default:
      break;
  }
}
