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
    console.log(media.likes, totalLikes);
    totalLikes += media.likes;
  });

  const likeAndPrice = mediaTemplate(media, photographer);
  const likeCardDOM = likeAndPrice.getLikes(totalLikes);
  likeCardDOM.forEach((element) => {
    likeSection.appendChild(element);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers, media } = await getPhotographers();
  displayData(photographers, media);
}

init();

function getIDFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedId = urlParams.get("id");
  return selectedId;
}

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
