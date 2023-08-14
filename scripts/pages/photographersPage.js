import { getIDFromURL } from "../modules/helpers.js";

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
  let photographer = findPhotographerWithId(photographers, id);
  let filteredMedia = filterMedia(media, id);

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
  let slides = document.getElementsByClassName("lightbox-media");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  modal.style.display = "block";
  slides[slideIndex].style.display = "block";
}

// Initialize 2 event listeners for each of the arrow keys on the slides
function initializeSlideListeners() {
  //each one of these checks if current slide is the first or last slide, then adds or takes 1 away from the index if they aren't
  document.querySelector(".prev").addEventListener("click", () => {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      showSlides(currentSlideIndex);
    }
  });

  document.querySelector(".next").addEventListener("click", () => {
    let slides = document.getElementsByClassName("lightbox-media");
    if (currentSlideIndex < slides.length - 1) {
      currentSlideIndex++;
      showSlides(currentSlideIndex);
    }
  });
}
