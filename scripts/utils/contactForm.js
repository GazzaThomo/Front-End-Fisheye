function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
  modal.setAttribute("aria-hidden", "true");
}

//for if click outside of the modal
document
  .getElementById("contact_modal")
  .addEventListener("click", function (event) {
    // Check if the clicked element is the lightbox modal itself
    if (event.target === this) {
      closeModal();
    }
  });

document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("contact_modal");
  let isOpenModal = window.getComputedStyle(modal).display === "block";
  if (e.key === "Escape" && isOpenModal) {
    closeModal();
  }
});

let contactButton = document.querySelector(".contact_button");
contactButton.addEventListener("click", displayModal);

///////// Contact modal //////////
let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let prenom = document.getElementById("prenom").value;
  let nom = document.getElementById("nom").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;
  console.log(
    `Prénom: ${prenom}, nom: ${nom}, email: ${email}, message: ${message}`
  );
});
