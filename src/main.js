import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const input = document.querySelector(".form-input");
const galleryRoot = document.querySelector(".gallery");
const cssLoader = document.querySelector(".css-loader");
cssLoader.style.display = "none";

const searchParams = new URLSearchParams({
    key: "41748300-cb29be2b9e713bfb06ce55aab",
    q: "",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    cssLoader.style.display = "block";
    if (input.value.trim().length === 0) {
        return;
    }

    searchParams.set("q", input.value.trim());

    fetch(`https://pixabay.com/api/?${searchParams}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('error');
            }
            return response.json();
        })
        .then(({hits}) => {
            if (hits.length === 0) {
                iziToast.error({
                    position: "topRight",
                    message: "Sorry, there are no images matching your search query. Please try again!"
                });
            }

            const galleryImages = hits.reduce(
                (html, image) =>
                    html +
                        `<li class="gallery-item">
                            <a class="gallery-link" href="${image.largeImageURL}">
                                <img 
                                    class="gallery-image" 
                                    data-source=${image.largeImageURL} 
                                    src=${image.webformatURL} 
                                    alt=${image.tags} 
                                />
                            </a>
                            <div class="gallery-item-info">
                                <p class="gallery-item-info-name">Likes
                                    <span class="gallery-item-info-value">${image.likes}
                                </p>
                                <p class="gallery-item-info-name">Views
                                    <span class="gallery-item-info-value">${image.views}</span>
                                </p>
                                <p class="gallery-item-info-name">Comments
                                    <span class="gallery-item-info-value">${image.comments}</span>
                                </p>
                                <p class="gallery-item-info-name">Downloads
                                    <span class="gallery-item-info-value">${image.downloads}</span>
                                </p>
                            </div>
                        </li>`, '');
            galleryRoot.innerHTML = galleryImages;

            cssLoader.style.display = "none";

            let ligthBoxModal = new SimpleLightbox(".gallery a", {
                captionDelay: 250, 
                captionsData: "alt",
            });
            ligthBoxModal.refresh();
            ligthBoxModal.on("show.simplelightbox", function () {});
        })
        .catch(() => {
            iziToast.error({
              position: 'topRight',
              message: "Something is wrong!"
          });
      });
})

