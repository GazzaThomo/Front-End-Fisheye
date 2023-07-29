const allPhotographers = JSON.parse(localStorage.getItem("allPhotographers"));
const urlParams = new URLSearchParams(window.location.search);
const selectedId = urlParams.get("id");
const selectedPhotographer = allPhotographers.find(
  (p) => p.id === parseInt(selectedId, 10)
);
console.log(selectedPhotographer);
