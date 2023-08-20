import { getIDFromURL } from "../modules/helpers.js";

let filteredMedia, photographer;

async function getPhotographers() {
  const photographerDataJson = await fetch("../data/photographers.json");
  const photographerData = await photographerDataJson.json();
  let photographers = photographerData.photographers;
  let media = photographerData.media;
  return {
    photographers,
    media,
  };
}

async function displayData(photographers, media) {
  const photographersSection = document.querySelector(".photograph-header");
  const mediaSection = document.querySelector(".media-section");
  const likeSection = document.querySelector(".likes-and-price");
  const lightboxSection = document.querySelector(".lightbox-content");
  let totalLikes = 0;
  let id = getIDFromURL();
  photographer = findPhotographerWithId(photographers, id);
  filteredMedia = filterMedia(media, id);

  const photographerModel = profileTemplate(photographer);
  const userCardDOM = photographerModel.getUserCardDOM();
  userCardDOM.forEach((element) => {
    photographersSection.appendChild(element);
  });

  filteredMedia.forEach((media) => {
    const mediaModel = mediaTemplate(media, photographer);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
    totalLikes += media.likes;
  });

  filteredMedia.forEach((media) => {
    const lightboxModel = mediaTemplate(media, photographer);
    const lightboxDOM = lightboxModel.getLightboxMedia();
    lightboxSection.appendChild(lightboxDOM);
  });

  const likeAndPrice = mediaTemplate(media, photographer);
  const likeCardDOM = likeAndPrice.getLikes(totalLikes);
  likeCardDOM.forEach((element) => {
    likeSection.appendChild(element);
  });

  findIndexOfClickedMedia(filteredMedia);
  initializeSlideListeners();
  incrementLikes();
}

async function init() {
  // Récupère les datas des photographes
  const { photographers, media } = await getPhotographers();
  displayData(photographers, media);
}

init();

function findPhotographerWithId(data, id) {
  //Use this to find the object that contains the ID. use parseInt incase the ID is text, 10 for base 10. Returns object if as soon as ID is found, otherwise undefined
  const selectedPhotographer = data.find(
    (photographer) => photographer.id === parseInt(id, 10)
  );
  return selectedPhotographer;
}

function filterMedia(data, id) {
  let filteredMedia = data.filter(
    (el) => el.photographerId === parseInt(id, 10)
  );
  return filteredMedia;
}

// CAROUSSEL //

let currentSlideIndex = 0; // Global variable to keep track of the slide

function findIndexOfClickedMedia(filteredMedia) {
  let allMedia = document.querySelectorAll(".media");

  allMedia.forEach((media) => {
    media.addEventListener("click", function () {
      let idOfClickedImage = this.getAttribute("data-id");
      currentSlideIndex = filteredMedia.findIndex(
        (someMedia) => someMedia.id === parseInt(idOfClickedImage)
      );
      showSlides(currentSlideIndex);
    });
  });
}

function showSlides(slideIndex) {
  let modal = document.querySelector("#lightbox-modal");
  let slides = document.getElementsByClassName("lightbox-media-content");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  modal.style.display = "flex";
  slides[slideIndex].style.display = "block";
}

// Initialize 2 event listeners for each of the arrow keys on the slides
function initializeSlideListeners() {
  let slides = document.getElementsByClassName("lightbox-media");
  let modal = document.querySelector("#lightbox-modal");
  //each one of these checks if current slide is the first or last slide, then adds or takes 1 away from the index if they aren't
  document.querySelector(".prev").addEventListener("click", () => {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      showSlides(currentSlideIndex);
    }
  });

  document.querySelector(".next").addEventListener("click", () => {
    if (currentSlideIndex < slides.length - 1) {
      currentSlideIndex++;
      showSlides(currentSlideIndex);
    }
  });

  //close lightbox listener
  document.querySelector(".close-lightbox").addEventListener("click", () => {
    modal.style.display = "none";
  });

  //key controls
  document.addEventListener("keydown", (e) => {
    let isOpenModal = window.getComputedStyle(modal).display === "flex";
    if (
      e.key === "ArrowRight" &&
      currentSlideIndex < slides.length - 1 &&
      isOpenModal
    ) {
      currentSlideIndex++;
      showSlides(currentSlideIndex);
    } else if (e.key === "ArrowLeft" && currentSlideIndex > 0 && isOpenModal) {
      currentSlideIndex--;
      showSlides(currentSlideIndex);
    } else if (e.key === "Escape" && isOpenModal) {
      modal.style.display = "none";
    }
  });
}

///////// Contact modal //////////
let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let prenom = document.getElementById("prenom").value;
  let nom = document.getElementById("nom").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;
  console.log(
    `Prénom: ${prenom}, nom: ${nom}, email: ${email}, message: ${message}`
  );
});

//////// like increments ///////
//aria disabled quand bouton éteint
function incrementLikes() {
  let heartButtons = document.querySelectorAll(".heart-button");
  for (let i = 0; i < heartButtons.length; i++) {
    heartButtons[i].addEventListener("click", () => {
      //grab the previous element, which is always the number of likes, add 1 to it, reset the value in the page, and disable the button
      let previousElement = heartButtons[i].previousElementSibling.innerText;
      previousElement = parseInt(previousElement, "10") + 1;
      heartButtons[i].previousElementSibling.innerText = previousElement;
      heartButtons[i].disabled = true;
      heartButtons[i].style.filter = "grayscale(1)";
      incrementTotalLikes();
    });
  }
}

function incrementTotalLikes() {
  const totalLikesElement = document.querySelector(".total-likes");
  let totalLikes = totalLikesElement.innerText;
  totalLikes = parseInt(totalLikes, "10") + 1;
  totalLikesElement.innerText = totalLikes;
}

//  dropdown
//create an array with our 3 elements inside
const items = ["Popularité", "Date", "Titre"];

function populateDropdown() {
  const listbox = document.getElementById("listbox");
  const dropdownButton = document.getElementById("dropdownButton");
  const currentText = dropdownButton.textContent.trim(); //needed, otherwise some whitespace appears for some reason
  let newItems = [];

  listbox.innerHTML = ""; // empty the dropdown

  //Filter out the current text of the button
  newItems = items.filter((item) => item.trim() !== currentText);

  //create each item based on filtered list. Also add eventlistener to handle the clicks on those items
  newItems.forEach((item) => {
    const div = document.createElement("div");
    div.setAttribute("role", "option");
    div.setAttribute("tabindex", "0");
    div.textContent = item;
    div.addEventListener("click", selectItem);
    listbox.appendChild(div);

    // don't add the line after last item
    if (item !== newItems[newItems.length - 1]) {
      listbox.appendChild(document.createElement("hr"));
    }
  });
}

function toggleDropdown() {
  const listbox = document.getElementById("listbox");
  const isExpanded = listbox.style.display === "block";

  if (!isExpanded) {
    listbox.style.display = "block";
    populateDropdown();
  } else {
    listbox.style.display = "none";
  }
}

function selectItem(event) {
  const selectedItemText = event.currentTarget.textContent;
  const dropdownButton = document.getElementById("dropdownButton");
  dropdownButton.textContent = selectedItemText;
  toggleDropdown();
  filterMediaForDropdown(selectedItemText.trim());
}

// check if click was outside the dropdown
function handleClickOutside(event) {
  const dropdown = document.querySelector(".dropdown");
  const listbox = document.getElementById("listbox");
  if (!dropdown.contains(event.target)) {
    listbox.style.display = "none";
  }
}

//init the events
document
  .getElementById("dropdownButton")
  .addEventListener("click", toggleDropdown);
document.addEventListener("mousedown", handleClickOutside);

//filterPage
function filterMediaForDropdown(filterType) {
  let sortedMedia;
  if (filterType === "Date") {
    sortedMedia = filterByDate(sortedMedia);
  } else if (filterType === "Titre") {
    sortedMedia = filterByTitle(sortedMedia);
  } else if (filterType === "Popularité") {
    sortedMedia = filterByPopularity(sortedMedia);
  }
}

function filterByDate() {
  let mediaToSort = [...filteredMedia];
  mediaToSort.sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();
    return timeA - timeB;
  });
  return mediaToSort;
}

function filterByTitle() {
  let mediaToSort = [...filteredMedia];
  mediaToSort.sort((a, b) => {
    let titleA = a.title.toUpperCase();
    let titleB = b.title.toUpperCase();
    return titleA.localeCompare(titleB);
  });
  return mediaToSort;
}

function filterByPopularity() {
  let mediaToSort = [...filteredMedia];
  mediaToSort.sort((a, b) => {
    const likesA = parseInt(a.likes);
    const likesB = parseInt(b.likes);
    return likesA - likesB;
  });
  return mediaToSort;
}
