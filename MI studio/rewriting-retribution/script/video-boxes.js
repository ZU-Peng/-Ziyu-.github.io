// let btn = document.querySelector('.btn');
// let clip = document.querySelector('.clip');
// let shutdown = document.querySelector('.shutdown');
// let video = document.querySelector('.videoCard');
// 	btn.onclick = function(){
// 	btn.classList.add('active');
// 	clip.classList.add('active');
// 	video.classList.add('active');
// 	video = document.querySelector('.videoCard.active');
// 	video.play();
// 	video.currentTime = 0;
// 	}
// 	shutdown.onclick = function(){
// 	btn.classList.remove('active');
// 	clip.classList.remove('active');
// 	video.pause();
// 	}
const video1 = document.getElementById("video1");
const button1 = document.getElementById("btn1");
const clip1 = document.getElementById("clip1");
const shutdown1 = document.getElementById("shutdown1");

button1.addEventListener("click", function() {
    button1.classList.add('active');
    clip1.classList.add('active');
    video1.classList.add('active');
    video1.play();
    video1.currentTime = 0;
})
shutdown1.addEventListener("click", function(){
    button1.classList.remove('active');
    clip1.classList.remove('active');
    video1.pause();
    })

const video2 = document.getElementById("video2");
const button2 = document.getElementById("btn2");
const clip2 = document.getElementById("clip2");
const shutdown2 = document.getElementById("shutdown2");

button2.addEventListener("click", function() {
    button2.classList.add('active');
    clip2.classList.add('active');
    video2.classList.add('active');
    video2.play();
    video2.currentTime = 0;
})
shutdown2.addEventListener("click", function(){
    button2.classList.remove('active');
    clip2.classList.remove('active');
    video2.pause();
    })

const video3 = document.getElementById("video3");
const button3 = document.getElementById("btn3");
const clip3 = document.getElementById("clip3");
const shutdown3 = document.getElementById("shutdown3");

button3.addEventListener("click", function() {
	button3.classList.add('active');
	clip3.classList.add('active');
	video3.classList.add('active');
	video3.play();
	video3.currentTime = 0;
})
shutdown3.addEventListener("click", function(){
	button3.classList.remove('active');
	clip3.classList.remove('active');
	video3.pause();
	})


const video4 = document.getElementById("video4");
const button4 = document.getElementById("btn4");
const clip4 = document.getElementById("clip4");
const shutdown4 = document.getElementById("shutdown4");

button4.addEventListener("click", function() {
	button4.classList.add('active');
	clip4.classList.add('active');
	video4.classList.add('active');
	video4.play();
	video4.currentTime = 0;
})
shutdown4.addEventListener("click", function(){
	button4.classList.remove('active');
	clip4.classList.remove('active');
	video4.pause();
	})
;