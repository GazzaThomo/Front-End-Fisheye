import { getIDFromURL } from "../utils/helpers.js";
import * as dropdown from "../utils/dropdown.js";
import * as lightboxFuncs from "../utils/lightbox.js";
import * as filterFunctions from "../utils/filterPage.js";
export let filteredMedia;
export let photographer;

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

  lightboxFuncs.findIndexOfClickedMedia(filteredMedia);
  lightboxFuncs.initializeSlideListeners();
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

//////// like increments ///////
//aria disabled quand bouton éteint
export function incrementLikes() {
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

export function incrementTotalLikes() {
  const totalLikesElement = document.querySelector(".total-likes");
  let totalLikes = totalLikesElement.innerText;
  totalLikes = parseInt(totalLikes, "10") + 1;
  totalLikesElement.innerText = totalLikes;
}

//init the events
document
  .getElementById("dropdownButton")
  .addEventListener("click", dropdown.toggleDropdown);
document.addEventListener("mousedown", dropdown.handleClickOutside);
