let mainHeader = document.getElementById("main-header");
let mainNav = document.getElementById("main-nav");
let mainView = document.getElementById("main-view");
let mainFooter = document.getElementById("main-footer");

let isMenuOpen = false;

// get and append basic components
getAndAppend("header", mainHeader);
getAndAppend("footer", mainFooter);
getAndAppend("nav", mainNav);
getAndAppend("home", mainView);

window.location.replace(window.location.origin + "/#/home");

// event listener
document.getElementById("header").addEventListener("click", function (event) { 

    // tag.addEventListener("eventName", function () {}, false)

    let eventTarget = event.target; // HTML element onClicked
    let eventId = eventTarget.id;

    let routes = "home,about,photos,fitnes,music,contacts";
    let menuButtons = "open,close";

    let openBtn = document.getElementById("open");
    let closeBtn = document.getElementById("close");
    let linksWrapper = document.getElementById("links-wrapper");

    if(eventId) { //routing
        if(routes.includes(eventId)) {
            getAndAppend(eventId, mainView);
            linksWrapper.style.visibility = "hidden";
            linksWrapper.style.height = 0;
            openBtn.style.display = "inherit";
            closeBtn.style.display = "none"
            isMenuOpen = !isMenuOpen;
        }
        else if(menuButtons.includes(eventId)) {
            if(!isMenuOpen) {
                linksWrapper.style.visibility = "visible";
                linksWrapper.style.height = "auto";
                openBtn.style.display = "none";
                openBtn.style.marginLeft = "7px";
                closeBtn.style.display = "inherit";
            }
            else {
                linksWrapper.style.visibility = "hidden";
                linksWrapper.style.height = 0;
                openBtn.style.display = "inherit";
                openBtn.style.marginLeft = "7px";
                closeBtn.style.display = "none";
            }
    
            isMenuOpen = !isMenuOpen;
        }
    }
}, false);

// methods
function getAndAppend(view, container) {
    let path = `../html/${view}.html`;
    
    fetch(path) // get html view
        .then(function(html) {
            return html.text(); 
        })
        .then(function(htmlText) {
            container.innerHTML = htmlText; // append it to DOM container
        
            // slider
            if(view === "photos") {
                slider();
            }
        })
        .catch(function(err) {  
            console.log("Failed to fetch page: ", err);  
        });
}

function slider() {
    let slides = document.querySelectorAll(".slide");
    let curSlide = 0;

    // loop through slides and set each slides translateX property to index * 100% 
    slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${indx * 100}%)`;
    });

    // maximum number of slides
    let maxSlide = slides.length - 1;

    setInterval(function() {
        // check if current slide is the last and reset current slide
        if (curSlide === maxSlide) {
          curSlide = 0;
        } else {
          curSlide++;
        }
      
        // move slide by -100%
        slides.forEach((slide, indx) => {
          slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
        });
    }, 10000);
    
    // select next slide button
    const nextSlide = document.querySelector(".btn-next");
    
    // add event listener and navigation functionality
    nextSlide.addEventListener("click", function () {
      // check if current slide is the last and reset current slide
      if (curSlide === maxSlide) {
        curSlide = 0;
      } else {
        curSlide++;
      }
    
      // move slide by -100%
      slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
      });
    });
    
    // select prev slide button
    const prevSlide = document.querySelector(".btn-prev");
    
    // add event listener and navigation functionality
    prevSlide.addEventListener("click", function () {
      // check if current slide is the first and reset current slide to last
      if (curSlide === 0) {
        curSlide = maxSlide;
      } else {
        curSlide--;
      }
    
      //   move slide by 100%
      slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
      });
    });
}