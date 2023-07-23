function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const location = document.createElement("p");
    location.setAttribute("class", "photographerLocation");
    location.innerText = `${city}, ${country}`;
    const citation = document.createElement("p");
    citation.setAttribute("class", "tagline");
    citation.innerText = tagline;
    const cost = document.createElement("p");
    cost.setAttribute("class", "cost");
    cost.innerText = `${price}€/jour`;

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(citation);
    article.appendChild(cost);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
