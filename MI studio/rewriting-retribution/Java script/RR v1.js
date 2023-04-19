
      const video1 = document.getElementById("bg-video1");
      const video2 = document.getElementById("bg-video2");
      const content1 = document.getElementById("content1");
      const content2 = document.getElementById("content2");
      const contentHeight = content1.offsetHeight + content2.offsetHeight;


      window.addEventListener("scroll", function() {
  var content1Bounds = content1.getBoundingClientRect();
  var content2Bounds = content2.getBoundingClientRect();
  
  // Check if the first text section is visible on the screen
  if (content1Bounds.top <= window.innerHeight && content1Bounds.bottom >= 0) {
    video1.play()
    video2.style.opacity = "0"
    video2.pause();
  } else {
    video1.pause();
  }
  
  // Check if the second text section is visible on the screen
  if (content2Bounds.top <= window.innerHeight && content2Bounds.bottom >= 0) {
    video2.style.opacity = "1";
    video2.play();
  } else {
    video2.pause();
  }
  
    //   window.addEventListener("scroll", function () {
    //     const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

    //     // calculate the percentage of how much the user has scrolled
    //     const scrollPercentage = (scrollPos / contentHeight) * 100;

    //     // set the video playback rate based on the scroll percentage
    //     video1.playbackRate = video2.playbackRate = scrollPercentage / 100;

    //     // play or pause the video based on the scroll position
    //     if (scrollPos < content1.offsetHeight) {
    //     //   video1.currentTime = scrollPos / video1.playbackRate;
    //       video1.play();
    //       video2.pause();
    //     } else {
    //       video1.pause();
    //     //   video2.currentTime = (scrollPos - content1.offsetHeight) / video2.playbackRate;
    //       video2.play();
    //     }
    //   })
});
