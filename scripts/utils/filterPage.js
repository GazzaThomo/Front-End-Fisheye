import { filteredMedia } from "../pages/photographersPage.js";

//filterPage
export function filterMediaForDropdown(filterType) {
  let sortedMedia;
  if (filterType === "Date") {
    sortedMedia = filterByDate(filteredMedia);
    console.log(sortedMedia);
  } else if (filterType === "Titre") {
    sortedMedia = filterByTitle(filteredMedia);
    console.log(sortedMedia);
  } else if (filterType === "Popularité") {
    sortedMedia = filterByPopularity(filteredMedia);
    console.log(sortedMedia);
  }
}

function filterByDate() {
  let mediaToSort = [...filteredMedia];
  mediaToSort.sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();
    return timeA - timeB;
  });
  return mediaToSort;
}

function filterByTitle() {
  let mediaToSort = [...filteredMedia];
  mediaToSort.sort((a, b) => {
    let titleA = a.title.toUpperCase();
    let titleB = b.title.toUpperCase();
    return titleA.localeCompare(titleB);
  });
  return mediaToSort;
}

function filterByPopularity() {
  let mediaToSort = [...filteredMedia];
  mediaToSort.sort((a, b) => {
    const likesA = parseInt(a.likes);
    const likesB = parseInt(b.likes);
    return likesA - likesB;
  });
  return mediaToSort;
}
