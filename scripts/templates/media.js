function mediaTemplate(data) {
  const { id, photographerId, title, image, likes, date, price } = data;
  const picture = `assets/images/Sample%20Photos/${photographerId}/${image}`;

  // console.log(data);
  function getMediaCardDOM() {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    article.appendChild(img);
    return article;
  }
  return { getMediaCardDOM };
}
