let mainHeader = document.getElementById("main-header");
let mainNav = document.getElementById("main-nav");
let mainView = document.getElementById("main-view");

let isMenuOpen = false;

// get and append basic components
getAndAppend("header", mainHeader);
getAndAppend("nav", mainNav);
getAndAppend("home", mainView);

// event listener
document.addEventListener("click", function (event) { // tag.addEventListener("eventName", function name() {}, false)
    let eventTarget = event.target; // HTML element onClicked

    let routes = "home,about,photos,fitnes,music,contacts";
    let menuButtons = "open,close";

    let openBtn = document.getElementById("open");
    let closeBtn = document.getElementById("close");
    let linksWrapper = document.getElementById("links-wrapper");
	
    if(eventTarget.id && routes.includes(eventTarget.id)) {
        getAndAppend(eventTarget.id, mainView);
        
        linksWrapper.style.visibility = "hidden";
        linksWrapper.style.height = 0;
        openBtn.style.display = "inherit";
        closeBtn.style.display = "none"
        isMenuOpen = !isMenuOpen;
    }
    else if(eventTarget.id && menuButtons.includes(eventTarget.id)) {
        if(!isMenuOpen) {
            linksWrapper.style.visibility = "visible";
            linksWrapper.style.height = "auto";
            openBtn.style.display = "none";
            closeBtn.style.display = "inherit";
        }
        else {
            linksWrapper.style.visibility = "hidden";
            linksWrapper.style.height = 0;
            openBtn.style.display = "inherit";
            closeBtn.style.display = "none";
        }

        isMenuOpen = !isMenuOpen;
    }
}, false);

// methods
function getAndAppend(view, container) {
    let path = `../html/${view}.html`;
    
    fetch(path) // get html view
        .then(function(view) {
            return view.text(); 
        })
        .then(function(html) {
            container.innerHTML = html; // append it to DOM container
        })
        .catch(function(err) {  
            console.log('Failed to fetch page: ', err);  
        });
}