let currentSlideIndex = 0; // Global variable to keep track of the slide

export function findIndexOfClickedMedia(filteredMedia) {
  let allMedia = document.querySelectorAll(".media");

  allMedia.forEach((media) => {
    media.addEventListener("click", function () {
      let idOfClickedImage = this.getAttribute("data-id");
      currentSlideIndex = filteredMedia.findIndex(
        (someMedia) => someMedia.id === parseInt(idOfClickedImage)
      );
      showSlides(currentSlideIndex);
    });
  });
}

function showSlides(slideIndex) {
  let modal = document.querySelector("#lightbox-modal");
  let slides = document.getElementsByClassName("lightbox-media-content");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  modal.style.display = "flex";
  slides[slideIndex].style.display = "block";
}

export function initializeSlideListeners() {
  let slides = document.getElementsByClassName("lightbox-media");
  let modal = document.querySelector("#lightbox-modal");
  //each one of these checks if current slide is the first or last slide, then adds or takes 1 away from the index if they aren't
  document.querySelector(".prev").addEventListener("click", () => {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      showSlides(currentSlideIndex);
    }
  });

  document.querySelector(".next").addEventListener("click", () => {
    if (currentSlideIndex < slides.length - 1) {
      currentSlideIndex++;
      showSlides(currentSlideIndex);
    }
  });

  //close lightbox listener
  document.querySelector(".close-lightbox").addEventListener("click", () => {
    modal.style.display = "none";
  });

  //key controls
  document.addEventListener("keydown", (e) => {
    let isOpenModal = window.getComputedStyle(modal).display === "flex";
    if (
      e.key === "ArrowRight" &&
      currentSlideIndex < slides.length - 1 &&
      isOpenModal
    ) {
      currentSlideIndex++;
      showSlides(currentSlideIndex);
    } else if (e.key === "ArrowLeft" && currentSlideIndex > 0 && isOpenModal) {
      currentSlideIndex--;
      showSlides(currentSlideIndex);
    } else if (e.key === "Escape" && isOpenModal) {
      modal.style.display = "none";
    }
  });
}
