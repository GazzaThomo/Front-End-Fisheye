function mediaTemplate(data) {
  const { id, photographerId, title, image, likes, date, price } = data;
  const picture = `assets/images/Sample Photos/${image}`;

  function getMediaCardDOM() {
    const article = document.createElement("article");

    const img = document.createElement("img");
    article.appendChild(img);
    return article;
  }
  return { picture, getMediaCardDOM };
}
