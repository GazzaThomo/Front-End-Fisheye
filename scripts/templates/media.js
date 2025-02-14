function mediaTemplate(data, photographer) {
  const { id, photographerId, title, image, likes, video } = data;
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
      lightboxElement = dataIsImageForLightbox(picture, id, title);
    } else {
      lightboxElement = dataIsVideoForLightbox(picture, id, title);
    }
    return lightboxElement;
  }

  function getLikes(totalLikes) {
    let likesElement = document.createElement("p");
    likesElement.setAttribute("class", "total-likes");
    let priceElement = document.createElement("p");
    priceElement.setAttribute("class", "price");
    likesElement.textContent = totalLikes;
    priceElement.textContent = `${price}€ / jour`;
    return [likesElement, priceElement];
  }
  return { getMediaCardDOM, getLikes, getLightboxMedia };
}

function dataIsImage(picture, title, likes, id) {
  const article = document.createElement("article");
  article.setAttribute("data-id", id);

  const img = document.createElement("img");
  let imgAttributes = {
    src: picture,
    class: "media image",
    "data-id": id,
    alt: title,
    tabindex: 0,
  };

  setAttributes(img, imgAttributes);

  const textDiv = document.createElement("div");
  const titleText = document.createElement("p");
  const likeDiv = document.createElement("div");
  const likeText = document.createElement("p");
  textDiv.setAttribute("class", "article-text");
  titleText.setAttribute("class", "article-title");
  likeDiv.setAttribute("class", "article-text__likes");
  titleText.textContent = title;
  likeText.textContent = likes;

  const heartButton = document.createElement("button");
  heartButton.setAttribute("class", "heart-button");
  const heartIcon = document.createElement("img");
  const heartIconAttributes = {
    src: "../../assets/icons/heart.svg",
    class: "heart-icon",
    alt: "icone j'aime",
    "aria-label": "aimer la photo",
  };
  setAttributes(heartIcon, heartIconAttributes);

  heartButton.appendChild(heartIcon);
  likeDiv.appendChild(likeText);
  likeDiv.appendChild(heartButton);
  textDiv.appendChild(titleText);
  textDiv.appendChild(likeDiv);
  article.appendChild(img);
  article.appendChild(textDiv);

  return article;
}

function dataIsVideo(picture, title, likes, id) {
  const article = document.createElement("article");
  article.setAttribute("data-id", id);

  const video = document.createElement("video");
  const source = document.createElement("source");
  source.setAttribute("src", picture);
  source.setAttribute("type", "video/mp4");
  video.appendChild(source);

  video.setAttribute("class", "media video");
  video.setAttribute("data-id", id);
  video.setAttribute("aria-label", title);
  video.setAttribute("tabindex", 0);

  const textDiv = document.createElement("div");
  const likeDiv = document.createElement("div");
  const titleText = document.createElement("p");
  const likeText = document.createElement("p");
  textDiv.setAttribute("class", "article-text");
  titleText.setAttribute("class", "article-title");
  likeDiv.setAttribute("class", "article-text__likes");
  titleText.textContent = title;
  likeText.textContent = likes;

  const heartButton = document.createElement("button");
  heartButton.setAttribute("class", "heart-button");
  const heartIcon = document.createElement("img");
  heartIcon.setAttribute("src", "../../assets/icons/heart.svg");
  heartIcon.setAttribute("class", "heart-icon");
  heartIcon.setAttribute("alt", "icone j'aime");
  heartIcon.setAttribute("aria-label", "aimer la video");

  heartButton.appendChild(heartIcon);
  likeDiv.appendChild(likeText);
  likeDiv.appendChild(heartButton);
  textDiv.appendChild(titleText);
  textDiv.appendChild(likeDiv);
  article.appendChild(video);
  article.appendChild(textDiv);
  return article;
}

function dataIsImageForLightbox(picture, id, title) {
  const div = document.createElement("div");
  div.setAttribute("class", "lightbox-media-content");
  div.setAttribute("data-id", id);
  const img = document.createElement("img");
  const mediaTitle = document.createElement("p");
  img.setAttribute("src", picture);
  img.setAttribute("class", "lightbox-media");
  img.setAttribute("data-id", id);
  img.setAttribute("alt", title);
  img.setAttribute("tabindex", 0);

  mediaTitle.textContent = title;
  mediaTitle.setAttribute("class", "lightbox-title");
  div.appendChild(img);
  div.appendChild(mediaTitle);
  return div;
}

function dataIsVideoForLightbox(picture, id, title) {
  const div = document.createElement("div");
  div.setAttribute("class", "lightbox-media-content");
  div.setAttribute("data-id", id);

  const video = document.createElement("video");
  const source = document.createElement("source");
  source.setAttribute("src", picture);
  source.setAttribute("type", "video/mp4");
  video.appendChild(source);

  video.setAttribute("class", "lightbox-media");
  video.setAttribute("data-id", id);
  video.controls = true;
  video.setAttribute("tabindex", 0);

  const mediaTitle = document.createElement("p");
  mediaTitle.textContent = title;
  mediaTitle.setAttribute("class", "lightbox-title");

  div.appendChild(video);
  div.appendChild(mediaTitle);

  return div;
}

// This function helps so we can use an object with all attributes for each element instead of multiple calls of setAttribute
function setAttributes(element, attribute) {
  for (let key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
}
