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

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });

  media.forEach((media) => {
    const mediaModel = mediaTemplate(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers, media } = await getPhotographers();
  displayData(photographers, media);
  localStorage.setItem("allPhotographers", JSON.stringify(photographers));
  localStorage.setItem("allMedia", JSON.stringify(media));
}

init();
