function profileTemplate(data) {
  const { name, portrait, city, country, tagline, id, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
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
    // photographHeader.appendChild(article);
    // photographHeader.appendChild(img);
    return [article, img];
  }
  return { getUserCardDOM };
}

function setAttributes(element, attribute) {
  for (let key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
}
