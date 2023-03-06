import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");

function createGalleryCards(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}" />
        </a>
    </div>
    `;
    })
    .join("");
}

const cardsMarkup = createGalleryCards(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", cardsMarkup);

galleryContainer.addEventListener("click", handleItemClick);

function handleItemClick(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains("gallery__image")) {
    return;
  } else {
    const srcEl = evt.target.dataset.source;

    const instance = basicLightbox.create(
      `
      <img src="${srcEl}">
  `
    );
    instance.show();

    const onModalEl = document.querySelector(".basicLightbox");
    onModalEl.addEventListener("click", onModalClose);
    document.addEventListener("keydown", onEscKeyPress);

    function onModalClose() {
      instance.close();
    }

    function onEscKeyPress(event) {
      const ESC_KEY_CODE = "Escape";
      const isEscKey = event.code === ESC_KEY_CODE;

      if (isEscKey) {
        instance.close();
      }
    }
  }
}

console.log(galleryItems);
