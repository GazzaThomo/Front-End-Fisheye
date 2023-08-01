//THIS IS TO MAKE THE INFO ON THE PHOTOGRAPHER APPEAR

function getPhotographerData() {
  //Get the data for all photographers from the local storage and parse ==> maybe add a session storage instead ? or add daily reload
  const allPhotographers = JSON.parse(localStorage.getItem("allPhotographers"));

  //Here we get the ID back from the URL ==> could use localstorage too i suppose ?
  const urlParams = new URLSearchParams(window.location.search);
  const selectedId = urlParams.get("id");

  //Use this to find the object that contains the ID. use parseInt incase the ID is text, 10 for base 10. Returns object if as soon as ID is found, otherwise undefined
  const selectedPhotographer = allPhotographers.find(
    (photographer) => photographer.id === parseInt(selectedId, 10)
  );
  return selectedPhotographer;
}

async function photographerTemplate() {
  /* This line is equivalent to const name = data.name; const portrait = data.portrait; ... */
  const { name, portrait, city, country, tagline, price, id } =
    await getPhotographerData();

  const picture = `assets/photographers/${portrait}`;

  const photographHeader = document.querySelector(".photograph-header");

  const article = document.createElement("div");
  article.setAttribute("aria-label", "Informations générale du photographe");
  article.setAttribute("class", "photographer-information");

  const img = document.createElement("img");
  img.dataset.id = id;
  let imgAttributes = { src: picture, alt: "portrait du photographe" };
  setAttributes(img, imgAttributes);

  const h2 = document.createElement("h2");
  h2.dataset.id = id;
  h2.textContent = name;

  const location = document.createElement("p");
  let locationAttributes = { class: "photographerLocation" };
  setAttributes(location, locationAttributes);
  location.innerText = `${city}, ${country}`;

  const citation = document.createElement("p");
  let citationAttributes = {
    class: "tagline",
    "aria-label": "Courte citation ou présentation du photographe",
  };
  setAttributes(citation, citationAttributes);
  citation.innerText = tagline;

  article.appendChild(h2);
  article.appendChild(location);
  article.appendChild(citation);
  photographHeader.appendChild(article);
  photographHeader.appendChild(img);
}

photographerTemplate();

function setAttributes(element, attribute) {
  for (let key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
}

///////// THIS PART GETS THE DATA FOR THE IMAGES /////////

async function getMedia() {
  const mediaDataJson = await fetch("../data/photographers.json");
  const mediaData = await mediaDataJson.json();
  let media = mediaData.media;
  return { media };
}

async function displayMedia(media) {
  const mediaSection = document.querySelector(".media");

  media.forEach((media) => {
    const mediaModel = mediaTemplate(media);
    console.log(media.id);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    // mediaSection.appendChild(mediaCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { media } = await getMedia();
  displayMedia(media);
}

init();
