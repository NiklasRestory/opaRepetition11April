const furnitureContainer = document.getElementById("furnitureContainer");
const ajaxButton = document.getElementById("ajaxButton");
const fetchButton = document.getElementById("fetchButton");

let furnitureList = [];

function getFurnitureById(id) {
    for(let i in furnitureList) {
        if (furnitureList[i].id == id) {
            return furnitureList[i];
        } 
    }
    return null;
}

// When I click in the container, I want to check what I pressed.
furnitureContainer.addEventListener("click", function(event) {
    console.log("Event triggered!");
    let target = event.target; // event.target will contain what I clicked on.
    // If I clicked on a hide button.
    if (target.classList.contains("hideButton")) {
        /* I can use parentElement to get the container the an element is in.
        If I then hide the div, I also hide everything in it. */
        let theDiv = target.parentElement;
        theDiv.style.display = "none";
    }
    if (target.classList.contains("buyButton")) {
        /* I know there's a hidden input located right before this element.
        If I use previousElementSibling I can get that element and get its value. */
        let hiddenInput = target.previousElementSibling;
        // nextElementSibling also exists. It gets the one after this element.
        let id = hiddenInput.value; // I saved the id there.
        // Then I can use a function to get what furniture this button was associated with.
        console.log("You bought " + getFurnitureById(id).brand + "!");
    }
});

/* For each item, I create a div that the information is located in. */
function showItems() {
    for(let i in furnitureList) {
        let aDiv = document.createElement("div");
        let textObject = document.createElement("p");
        textObject.textContent = furnitureList[i].getInfo();
        aDiv.appendChild(textObject);

        // To know what item each div is associated with, I save a hidden input with its id.
        let hiddenInput = document.createElement("input");
        hiddenInput.setAttribute("type", "hidden");
        hiddenInput.setAttribute("value", furnitureList[i].id);
        aDiv.appendChild(hiddenInput);

        // The buttons have classes to identify what buttons they are.
        let buyButton = document.createElement("button");
        buyButton.classList.add("buyButton");
        buyButton.textContent = "Buy";
        aDiv.appendChild(buyButton);
        let hideButton = document.createElement("button");
        hideButton.classList.add("hideButton");
        hideButton.textContent = "Hide";
        aDiv.appendChild(hideButton);
        // Nothing appears unless it is appendChild to an existing container.
        furnitureContainer.appendChild(aDiv);
    }
}

// The items I get from my requests are default objects, not instances of classes.
// This function makes furniture out of them.
function makeFurnitureOutOfJsonObject(jsonObjects) {
    furnitureList = [];
    for(let i in jsonObjects) {
        furnitureList.push(new Furniture(jsonObjects[i].furnitureId,
                                         jsonObjects[i].designer,
                                         jsonObjects[i].brand,
                                         jsonObjects[i].price));
    }
    console.log(furnitureList);
}

// Ajax is the XMLHttpRequest object. 
ajaxButton.addEventListener("click", function(event) {
    let request = new XMLHttpRequest();
    // Open sets settings. Like, GET request, then which url to send to.
    request.open("GET", "http://localhost:8080/furniture");
    request.responseType = "json"; // If we define we want json
    request.send(); // Actually sends the request.
    /* onload is run when we get a reply. */
    request.onload = function() {
        console.log("We have got our response!");
        console.log("Status code: " + request.status);
        console.log(request.response); // What we get. Because of responseType is json, we get the objects already parsed.
        makeFurnitureOutOfJsonObject(request.response);
        showItems();
    }
    request.onerror = function() {
        console.log("Oh, no! Something went wrong!");
    }
    request.ontimeout = function() {
        console.log("We did not get a response fast enough!");
    }
    request.onprogress = function() {
        console.log("We have completed the handshake and we have sent our request for processing!");
        console.log("Excellent time to say \"Loading...\"!");
    }
});

fetchButton.addEventListener("click", getByFetch)

/* Fetch API is an alternative to Ajax.  */
async function getByFetch() {
    /* It needs two things. The url, and an object that contains the settings. */
    let settings = {};
    settings.method = "GET"; // For a get request, method should be the only thing needed.
    /* If we want to have an onprogress function in fetch, there's probably some setting to
    set that in, but I forgot which one and where it is and what it is called.*/
    /*settings.onprogress = function() {
        console.log("We have completed the handshake and we have sent our request for processing!");
        console.log("Excellent time to say \"Loading...\"!");
    };*/
    /* This function is async, making it run in a separate thread. await will
    wait here until we get a response. */
    let response = await fetch("http://localhost:8080/furniture", settings);
    response.type = "json";
    console.log("Status Code: " + response.status);
    
    /* response.json() returns a "Promise". A promise
    is an object that will eventually contain the information we seek.
    As in, the promise is created when we make the request, and it
    will eventually be filled with the result of the request. By
    putting await in front of it, we tell it that we're waiting until we're
    given the actual object, so we don't need to handle the promise itself. */
    let result = await response.json();
    console.log(result);
    makeFurnitureOutOfJsonObject(result);
    showItems();
}

const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const searchButton = document.getElementById("searchButton");
const sessionButton = document.getElementById("sessionButton");
const localButton = document.getElementById("localButton");

// Three ways of sending info from one page to another.

searchButton.addEventListener("click", function(event) {
    let name = nameInput.value;
    let age = ageInput.value;

    /* URLSearchParams is an object that translates to and from url-friendly letters.
    Letters like #, & and ? cannot naturally exist in an url, so they're translated
    into something url-friendly and then the URLSearchParams object on the other side
    will translate back into the right values.  */
    let params = new URLSearchParams();
    params.append("name", name);
    params.append("age", age);

    // Url search params are just added to the url.
    let url = "receiver.html?" + params.toString();

    window.location = url;
});
sessionButton.addEventListener("click", function(event) {
    let name = nameInput.value;
    let age = ageInput.value;

    // sessionStorage just exists. They're the memory of the tab, they will disappear
    // if we close the tab or leave the webpage.
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("age", age);

    window.location = "receiver.html";
});
localButton.addEventListener("click", function(event) {
    let name = nameInput.value;
    let age = ageInput.value;

    // localStorage remains until the end of time (or until it is deleted).
    localStorage.setItem("name", name);
    localStorage.setItem("age", age);

    window.location = "receiver.html";
});
