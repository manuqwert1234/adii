const track = document.getElementById("image-track");

const handleOnDown = e => {
  track.dataset.mouseDownAt = e.clientX || e.touches[0].clientX;
};

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const clientX = e.clientX || e.touches[0].clientX;
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, 0%)` // Ensure it stays within the container
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
};

const handleImageClick = e => {
  const selectedImage = e.target;
  const imageWidth = selectedImage.offsetWidth;
  const trackWidth = track.offsetWidth;
  const imageIndex = Array.from(track.getElementsByClassName("image")).indexOf(selectedImage);
  
  const nextPercentage = ((imageIndex * imageWidth) - (trackWidth / 2) + (imageWidth / 2)) * -100 / trackWidth;
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, 0%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    if(image !== selectedImage) {
      image.style.display = 'none';
    } else {
      image.classList.add('zoomed');
    }
  }
};

const handleDocumentClick = e => {
  const zoomedImage = track.querySelector('.image.zoomed');
  if (zoomedImage && !zoomedImage.contains(e.target)) {
    for(const image of track.getElementsByClassName("image")) {
      image.style.display = 'block';
    }
    zoomedImage.classList.remove('zoomed');
    zoomedImage.classList.add('zoomed-out');
    setTimeout(() => {
      zoomedImage.classList.remove('zoomed-out');
    }, 500); 
  }
};

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.btn');
    
    if (button) {
      button.addEventListener('click', () => {
        window.location.href = 'https://www.linkedin.com/in/adithyan-ajish-4a49b0207';
      });
    }
});

for(const image of track.getElementsByClassName("image")) {
  image.addEventListener('click', handleImageClick);
}

document.addEventListener('click', handleDocumentClick);

window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e);