const searchResult = document.getElementById("searchResult");
const sessionResult = document.getElementById("sessionResult");
const localResult = document.getElementById("localResult");

/* window.location.search contains the parameter part of the
url. Give that to URLSearchParams and it can get the variables. */
console.log(window.location.search);
let params = new URLSearchParams(window.location.search);
let searchName = params.get("name");
let searchAge = params.get("age");

searchResult.textContent = "Got " + searchName + " and " + searchAge + " from search params!";


let sessionName = sessionStorage.getItem("name");
let sessionAge = sessionStorage.getItem("age");

sessionResult.textContent = "Got " + sessionName + " and " + sessionAge + " from sessionStorage!";


let localName = localStorage.getItem("name");
let localAge = localStorage.getItem("age");

localResult.textContent = "Got " + localName + " and " + localAge + " from localStorage!";