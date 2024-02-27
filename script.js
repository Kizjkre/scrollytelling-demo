const buffers = [
  'https://rawcdn.githack.com/ccrma/music220a/32b3f028c68c11a09180a622e2487de22c7abbc5/sound/efx/ticking.wav?min=1',
  'https://rawcdn.githack.com/ccrma/music220a/32b3f028c68c11a09180a622e2487de22c7abbc5/sound/efx/cauldron.wav?min=1',
  'https://rawcdn.githack.com/ccrma/music220a/32b3f028c68c11a09180a622e2487de22c7abbc5/sound/efx/ticking.wav?min=1',
  'https://rawcdn.githack.com/ccrma/music220a/32b3f028c68c11a09180a622e2487de22c7abbc5/sound/efx/cauldron.wav?min=1',
  'https://rawcdn.githack.com/ccrma/music220a/32b3f028c68c11a09180a622e2487de22c7abbc5/sound/efx/ticking.wav?min=1',
  'https://rawcdn.githack.com/ccrma/music220a/32b3f028c68c11a09180a622e2487de22c7abbc5/sound/efx/cauldron.wav?min=1'
]
  .map(url => {
    const audio = new Audio(url);
    audio.loop = true;
    return audio;
  });

let top;
let bottom;
let height;
let middle;

const elements = Object.freeze({
  action: document.getElementById('action'),
  content: document.getElementById('content'),
  start: document.getElementById('start'),
  images: [...document.querySelectorAll('img')]
});

elements.action.addEventListener('click', () => {
  elements.start.style.display = 'none';
  elements.content.style.display = 'flex';
  const rect = elements.content.getBoundingClientRect();
  top = rect.top;
  bottom = rect.bottom;
  height = rect.height;
  middle = (top + bottom) / 2;
});
elements.content.addEventListener('scroll', () => {
  elements.images.forEach((image, i) => {
    const rect = image.getBoundingClientRect();
    const y = rect.top + rect.height / 2;
    const p = Math.abs(y - middle) / height * 3;
    if (p < 1) {
      if (buffers[i].paused) buffers[i].play();
      buffers[i].volume = 1 - p;
    } else {
      buffers[i].pause();
    }
  });
});
