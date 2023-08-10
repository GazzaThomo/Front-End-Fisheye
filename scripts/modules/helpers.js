export function ajoutListenerProfile(photographers) {
  const links = document.querySelectorAll(".link-profile");

  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (event) {
      const id = event.target.dataset.id;
      links[i].setAttribute("href", `../../photographer.html?id=${id}`);
      console.log(photographers);
    });
  }
}

export function getIDFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedId = urlParams.get("id");
  return selectedId;
}
