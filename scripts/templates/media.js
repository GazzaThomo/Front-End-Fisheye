function mediaTemplate(data, photographer) {
  const { id, photographerId, title, image, likes, date, video } = data;
  const { price } = photographer;
  const picture = `assets/images/Sample%20Photos/${photographerId}/${
    image ?? video
  }`;

  // console.log(data);
  function getMediaCardDOM() {
    let element;
    if (!video) {
      element = dataIsImage(picture, title, likes, id);
    } else {
      element = dataIsVideo(picture, title, likes, id);
    }
    return element;
  }

  function getLightboxMedia() {
    let lightboxElement;
    if (!video) {
      lightboxElement = dataIsImageForLightbox(picture, id);
    } else {
      lightboxElement = dataIsVideoForLightbox(picture, id);
    }
    return lightboxElement;
  }

  function getLikes(totalLikes) {
    let likesElement = document.createElement("p");
    let priceElement = document.createElement("p");
    likesElement.textContent = totalLikes;
    priceElement.textContent = `${price}€/jours`;
    return [likesElement, priceElement];
  }
  return { getMediaCardDOM, getLikes, getLightboxMedia };
}

function dataIsImage(picture, title, likes, id) {
  const article = document.createElement("article");

  const img = document.createElement("img");
  img.setAttribute("src", picture);
  img.setAttribute("class", "media image");
  img.setAttribute("data-id", id);

  const textDiv = document.createElement("div");
  const titleText = document.createElement("p");
  const likeText = document.createElement("p");
  titleText.textContent = title;
  likeText.textContent = likes;
  textDiv.appendChild(titleText);
  textDiv.appendChild(likeText);
  article.appendChild(img);
  article.appendChild(textDiv);

  return article;
}

function dataIsVideo(picture, title, likes, id) {
  const article = document.createElement("article");

  const video = document.createElement("video");
  video.setAttribute("src", picture);
  video.setAttribute("class", "media video");
  video.setAttribute("data-id", id);
  video.setAttribute("type", "video/mp4");
  video.setAttribute("controls", "true");

  const textDiv = document.createElement("div");
  const titleText = document.createElement("p");
  const likeText = document.createElement("p");
  titleText.textContent = title;
  likeText.textContent = likes;
  textDiv.appendChild(titleText);
  textDiv.appendChild(likeText);
  article.appendChild(video);
  article.appendChild(textDiv);
  return article;
}

function dataIsImageForLightbox(picture, id) {
  const img = document.createElement("img");
  img.setAttribute("src", picture);
  img.setAttribute("class", "lightbox-media");
  img.setAttribute("data-id", id);
  return img;
}

function dataIsVideoForLightbox(picture, id) {
  const video = document.createElement("video");
  video.setAttribute("src", picture);
  video.setAttribute("class", "lightbox-media");
  video.setAttribute("data-id", id);
  return video;
}
