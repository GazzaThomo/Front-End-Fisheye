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
      element = dataIsImage(picture, title, likes);
    } else {
      element = dataIsVideo(picture, title, likes);
    }
    return element;
  }

  function getLikes(totalLikes) {
    let likesElement = document.createElement("p");
    let priceElement = document.createElement("p");
    likesElement.textContent = totalLikes;
    priceElement.textContent = `${price}€/jours`;
    return [likesElement, priceElement];
  }
  return { getMediaCardDOM, getLikes };
}

function dataIsImage(picture, title, likes) {
  const article = document.createElement("article");

  const img = document.createElement("img");
  img.setAttribute("src", picture);

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
function dataIsVideo(picture, title, likes) {
  const article = document.createElement("article");

  const video = document.createElement("video");
  video.setAttribute("src", picture);

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

function addTitleAndLikesToArticle() {}
