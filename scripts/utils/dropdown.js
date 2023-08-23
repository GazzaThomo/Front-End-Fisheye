import * as filters from "../utils/filterPage.js";
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
  newItems.forEach((item) => {
    const div = document.createElement("div");
    div.setAttribute("role", "option");
    div.setAttribute("tabindex", "0");
    div.textContent = item;
    div.addEventListener("click", selectItem);
    listbox.appendChild(div);

    // don't add the line after last item
    if (item !== newItems[newItems.length - 1]) {
      listbox.appendChild(document.createElement("hr"));
    }
  });
}

export function toggleDropdown() {
  const listbox = document.getElementById("listbox");
  const isExpanded = listbox.style.display === "block";
  const arrow = document.querySelector(".arrow");

  if (!isExpanded) {
    listbox.style.display = "block";
    arrow.style.transform = "rotate(180deg)";
    populateDropdown();
  } else {
    listbox.style.display = "none";
    arrow.style.transform = "rotate(0deg)";
  }
}

function selectItem(event) {
  const selectedItemText = event.currentTarget.textContent;
  const dropdownButton = document.getElementById("dropdownButton");
  const arrow = `<span class="arrow"><img src="./assets/icons/arrow.svg" /></span>`;
  dropdownButton.innerHTML = `${selectedItemText} ${arrow}`;
  toggleDropdown();
  filters.filterMediaForDropdown(selectedItemText.trim());
}

// check if click was outside the dropdown
export function handleClickOutside(event) {
  const dropdown = document.querySelector(".dropdown");
  const listbox = document.getElementById("listbox");
  const arrow = document.querySelector(".arrow");

  if (!dropdown.contains(event.target)) {
    listbox.style.display = "none";
    arrow.style.transform = "rotate(0deg)";
  }
}

//init the events
document
  .getElementById("dropdownButton")
  .addEventListener("click", toggleDropdown);
document.addEventListener("mousedown", handleClickOutside);
