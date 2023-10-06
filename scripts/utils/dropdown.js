import * as filters from "../utils/filterPage.js";
import * as lightboxFuncs from "../utils/lightbox.js";
//  dropdown
//create an array with our 3 elements inside
const items = ["Popularité", "Date", "Titre"];

function populateDropdown() {
  const listbox = document.getElementById("listbox");
  const dropdownButton = document.getElementById("dropdownButton");
  const currentText = dropdownButton.textContent.trim(); //needed, otherwise some whitespace appears for some reason
  let newItems = [];

  listbox.innerHTML = ""; // empty the dropdown

  //Filter out the current text of the button
  newItems = items.filter((item) => item.trim() !== currentText);

  //create each item based on filtered list. Also add eventlistener to handle the clicks on those items
  newItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.setAttribute("role", "option");
    div.setAttribute("tabindex", "0");
    div.setAttribute("class", "dropdownOption");
    div.textContent = item;
    div.addEventListener("click", selectItem);
    div.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default action of the Enter key
        selectItem(event);
      }
    });
    listbox.appendChild(div);

    // Add a horizontal line above the second item
    if (index === 0) {
      listbox.appendChild(document.createElement("hr"));
    }

    listbox.appendChild(div);

    // don't add the line after last item
    if (item !== newItems[newItems.length - 1]) {
      listbox.appendChild(document.createElement("hr"));
    }
  });
}

export function toggleDropdown() {
  const listbox = document.getElementById("listbox");
  const dropdownButton = document.getElementById("dropdownButton");
  const isExpanded = listbox.style.display === "block";
  const arrow = document.querySelector(".arrow");

  if (!isExpanded) {
    listbox.style.display = "block";
    arrow.style.transform = "rotate(180deg)";
    dropdownButton.style.borderRadius = "5px 5px 0 0";
    dropdownButton.setAttribute("aria-expanded", true);
    populateDropdown();
  } else {
    listbox.style.display = "none";
    arrow.style.transform = "rotate(0deg)";
    dropdownButton.style.borderRadius = "5px";
    dropdownButton.setAttribute("aria-expanded", false);
  }
}

function selectItem(event) {
  const selectedItemText = event.currentTarget.textContent;
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownOption = document.querySelectorAll(".dropdownOption");
  const arrow = `<span class="arrow"><img src="./assets/icons/arrow.svg" alt="fleche d'ouverture de menu déroulant"/></span>`;
  dropdownButton.innerHTML = `${selectedItemText} ${arrow}`;

  toggleDropdown();

  // get sorted array
  let sortedMediaArray = filters.filterMediaForDropdown(
    selectedItemText.trim()
  );

  const mediaSection = document.querySelector(".media-section");
  console.log(mediaSection);
  const lightboxContainer = document.querySelector(
    "#lightbox-modal .lightbox-content"
  );

  sortedMediaArray.forEach((element) => {
    const mediaElement = document.querySelector(
      `article[data-id="${element.id}"]`
    );
    if (mediaElement) {
      mediaSection.appendChild(mediaElement); // reorders the content, not quite sure i understand why.
    }
  });

  sortedMediaArray.forEach((photo) => {
    const lightboxMediaContent = lightboxContainer.querySelector(
      `.lightbox-media-content[data-id="${photo.id}"]`
    );
    if (lightboxMediaContent) {
      lightboxContainer.appendChild(lightboxMediaContent);
    }
  });

  lightboxFuncs.findIndexOfClickedMedia(sortedMediaArray);
}

// check if click was outside the dropdown
export function handleClickOutside(event) {
  const dropdown = document.querySelector(".dropdown");
  const listbox = document.getElementById("listbox");
  const arrow = document.querySelector(".arrow");

  if (!dropdown.contains(event.target)) {
    listbox.style.display = "none";
    arrow.style.transform = "rotate(0deg)";
    dropdownButton.style.borderRadius = "5px";
  }
}
