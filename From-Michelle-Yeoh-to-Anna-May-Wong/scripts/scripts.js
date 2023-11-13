gsap.registerPlugin(ScrollTrigger);

gsap.to(".card-innerC9", {
    scrollTrigger: {
    triggers: "#box1", 
    toggleActions:"restart pause reverse pause",
    start: "1550px 80%",
    end: "5860px 80%",
    
},
    rotationY: 180,
    duration:1
  });

  gsap.to(".card-innerB5 , .card-innerB1 , .card-innerD6 , .card-innerE3", {
    scrollTrigger: {
    triggers: "#box2", 
    toggleActions:"restart pause reverse pause",
    start: "5860px 80%",
    end: "7260px 80%"
},
    rotationY: 180,
    duration:1
  });

  gsap.to(".card-innerA6 , .card-innerC5", {
    scrollTrigger: {
    triggers: "#box3", 
    toggleActions:"restart pause reverse pause",
    start: "7260px 80%",
    end: "8000px 80%"
},
    rotationY: 180,
    duration:1
  });

  gsap.to(".card-innerB8 , .card-innerD8 , .card-innerD7", {
    scrollTrigger: {
    triggers: "#box4", 
    toggleActions:"restart pause reverse pause",
    start: "8000px 80%",
    end: "9450px 80%"
},
    rotationY: 180,
    duration:1
  });

  gsap.to(".card-innerE5 , .card-innerB2 , .card-innerC1 , .card-innerE6 , .card-innerB4 , .card-innerA1 , .card-innerD5 , .card-innerD3", {
    scrollTrigger: {
    triggers: "#box5", 
    toggleActions:"restart pause reverse pause",
    start: "8000px 80%",
    end: "9450px 80%"
    // markers: true
},
    rotationY: 180,
    duration:1
  });

  gsap.to(".card-innerB7 , .card-innerC4 , .card-innerC2 , .card-innerE7 , .card-innerB6 , .card-innerB3 , .card-innerA4 , .card-innerE10 , .card-innerC8 , .card-innerD10 , .card-innerE9 , .card-innerA5", {
    scrollTrigger: {
    triggers: "#box6", 
    toggleActions:"restart pause reverse pause",
    start: "9450px 80%",
    end: "10850px 80%"
    // markers: true
},
    rotationY: 180,
    duration:1
  });

  gsap.to(".card-innerE2 , .card-innerA9 , .card-innerB9 , .card-innerC6 , .card-innerA3 , .card-innerD2 , .card-innerC7 , .card-innerD9 , .card-innerA7 , .card-innerE1 , .card-innerC10 , .card-innerE8 , .card-innerB10 , .card-innerC3 , .card-innerD1 , .card-innerA10 , .card-innerE4 , .card-innerA8 , .card-innerD4 , .card-innerA2", {
    scrollTrigger: {
    triggers: "#box7", 
    toggleActions:"restart pause reverse pause",
    start: "10850px 80%",
    end: "12250px 80%"
    // markers: true
},
    rotationY: 180,
    duration:1
  });

//   gsap.to(".blue1", {
//     scrollTrigger: {
//     triggers: "#box8", 
//     toggleActions:"restart pause reverse pause",
//     start: "16230px 60%",
//     end: "16835px 60%",
//     markers: true
// },
//     opacity: "100%",
//     duration:0.5
//   });

//   gsap.to("span.blue", {
//     scrollTrigger: {
//     triggers: "#box9", 
//     toggleActions:"restart pause reverse pause",
//     start: "16835px 60%",
//     end: "17335px 60%"
// },
//     color: "#3f00c7",
//     duration:1
    
//   });

//   gsap.to("span.green", {
//     scrollTrigger: {
//     triggers: "#box10", 
//     toggleActions:"restart pause reverse pause",
//     start: "17335px 60%",
//     end: "17835px 60%"
// },
//     color: "#008927",
//     duration:1
//   });

//   gsap.to("span.blue2", {
//     scrollTrigger: {
//     triggers: "#box11", 
//     toggleActions:"restart pause reverse pause",
//     start: "21035px 60%",
//     end: "21835px 60%"
// },
//     color: "#3f00c7",
//     duration:1
//   });
//   gsap.to("span.green2", {
//     scrollTrigger: {
//     triggers: "#box12", 
//     toggleActions:"restart pause reverse pause",
//     start: "21835px 60%",
//     end: "22335px 60%"
// },
//     color: "#008927",
//     duration:1
//   });