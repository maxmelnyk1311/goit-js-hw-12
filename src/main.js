import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import axios from 'axios';

const form = document.querySelector(".form");
const input = document.querySelector(".form-input");
const galleryRoot = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more-btn");
const loadingText = document.querySelector(".loading-text");
let savedQuery;

let lightBoxModal = new SimpleLightbox(".gallery a", {
    captionDelay: 250, 
    captionsData: "alt",
});

let page = 1;
const limit = 40;
let isImagesEnded = false;

async function fetchImages() {
    const searchParams = new URLSearchParams({
        key: "41748300-cb29be2b9e713bfb06ce55aab",
        q: "",
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        per_page: limit,
        page: page,
    });

    searchParams.set("q", input.value.trim());
    savedQuery = input.value.trim();

    const response = await axios.get(`https://pixabay.com/api/?${searchParams}`);
    let totalImages = response.data.totalHits;

    if (totalImages === 0) {
        return [];
    }
    
    if ((page * limit) >= totalImages) {
        isImagesEnded = true;
        iziToast.error({
            position: "topRight",
            color: "red",
            message: "We're sorry, but you've reached the end of search results."
          }); 
    }
    return response.data.hits;
}

function renderImages(hits) {
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
    galleryRoot.insertAdjacentHTML("beforeend", galleryImages);
    lightBoxModal.refresh();
    lightBoxModal.on("show.simplelightbox", function () {});
}

function showLoadMoreBtn() {
    loadMoreBtn.style.display = "block";
}

function hideLoadMoreBtn() {
    loadMoreBtn.style.display = "none";
}

function showLoadingText() {
    loadingText.style.display = "block";
}

function hideLoadingText() {
    loadingText.style.display = "none";
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // when our previous query show all images
    // we set isImagesEnded = true
    // if we make new query without refreshing page - isImagesEnded will be still true, 
    // thats why we wouldnt see load more button after fetching images by new query
    // we need set isImagesEnded = false 

    isImagesEnded = false;

    if (input.value.trim().length === 0) {
        return;
    }

    if (savedQuery === input.value.trim()) {
        return;
    } else {
        galleryRoot.innerHTML = "";
        page = 1;
    }

    showLoadingText();

    try {
        const images = await fetchImages();
        renderImages(images);
    } catch (error) {
        iziToast.error({
            position: "topRight",
            color: "red",
            message: "Something is wrong!!!"
          });
        console.log(error);
    }

    hideLoadingText();

    if(galleryRoot.childNodes.length === 0) {    
        iziToast.error({
            position: "topRight",
            color: "red",
            message: "Images not found!"
        });
    } else if(isImagesEnded) {
        return;
    } else {
        page += 1;
        showLoadMoreBtn();
    }
});

loadMoreBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    hideLoadMoreBtn();
    showLoadingText();

    try {
        const response = await fetchImages();
        renderImages(response);
        page += 1;
    } catch (error) {
        iziToast.error({
            position: "topRight",
            color: "red",
            message: "Something is wrong!!!"
        });
        console.log(error);
    }

    hideLoadingText();

    if(!isImagesEnded) {
        showLoadMoreBtn();
    }

    const galleryItemHeight = document.querySelector(".gallery-item").getBoundingClientRect().height;
    window.scrollBy({
        top: galleryItemHeight * 2,
        behavior: "smooth",
    });
});
