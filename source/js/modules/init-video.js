const initVideo = () => {

const videoFile = document.querySelector('#video-story');
const videoBtn = document.querySelector('.history__btn-play');
const videoOverlay = document.querySelector('.history__overlay');

if (videoBtn) {
  videoBtn.addEventListener('click', function() {
    if(videoFile.paused) {
      videoFile.play()
      videoBtn.style.display = 'none';
      videoOverlay.style.display = 'none';
    }
  });

}

}


export {initVideo};