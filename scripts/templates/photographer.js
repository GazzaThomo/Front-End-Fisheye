function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.setAttribute("aria-label", "Photographer profile");

    const link = document.createElement("a");
    let linkAttributes = {
      // href: `../../photographer.html?id=${id}`,
      class: "link-profile",
    };
    setAttributes(link, linkAttributes);

    const img = document.createElement("img");
    img.dataset.id = id;
    let imgAttributes = { src: picture, alt: "portrait du photographe" };

    setAttributes(img, imgAttributes);
    const h2 = document.createElement("h2");
    h2.dataset.id = id;
    h2.textContent = name;

    const location = document.createElement("p");
    // location.setAttribute("aria-label", "Ville et pays du photographe");
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

    const cost = document.createElement("p");
    let costAttributes = { class: "cost" };
    setAttributes(cost, costAttributes);
    // cost.setAttribute("aria-label", "Prix par jour du photographe");
    cost.innerText = `${price}€/jour`;

    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(location);
    article.appendChild(citation);
    article.appendChild(cost);
    return article;
  }
  return { name, picture, getUserCardDOM };
}

// This function helps so we can use an object with all attributes for each element instead of multiple calls of setAttribute
function setAttributes(element, attribute) {
  for (let key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
}
