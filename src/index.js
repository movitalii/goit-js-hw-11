import { fetchPhotos } from './fetchPhotos';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('#search-form');
const divEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const submitBtn = document.querySelector('.submit');

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', onFormInput);
loadMoreBtn.addEventListener('click', onLoadMore);

let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

let data = '';

loadMoreBtn.classList.add('is-hidden');

function onFormInput() {
    submitBtn.removeAttribute('disabled');
}

function onFormSubmit(event) {  
  event.preventDefault();  
  clearGalleryContainer();  
  loadMoreBtn.classList.add('is-hidden');  

  data = event.currentTarget.elements.searchQuery.value;

  if (data === '') {
    Notiflix.Notify.warning('The field must not be empty!');
  } else {
    getCardToSubmit(data)
  }  
}

async function getCardToSubmit(data) {
  try {
    const photosInfo = await fetchPhotos(data);
    const photo = await photosInfo.hits;
    if (photosInfo.hits.length === 0) {
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } else if(photosInfo.hits.length < 40) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      loadMoreBtn.classList.add('is-hidden');
    } else {
      submitBtn.setAttribute('disabled', '');
      loadMoreBtn.classList.remove('is-hidden');
  }  
  renderCards(photo);
  } catch (error) {
    console.log(error.message);
  }  
}

async function onLoadMore() {
  getCardToSubmit(data)
}

function renderCards(photos) {
  const markup = photos
    .map((photo) => {
      return `<div class="photo-card">
          <a href="${photo.largeImageURL}">
          <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">            
              <b>Likes ${photo.likes}</b>
            </p>
            <p class="info-item">
              <b>Views ${photo.views}</b>
            </p>
            <p class="info-item">
              <b>Comments ${photo.comments}</b>
            </p>
            <p class="info-item">
              <b>Downloades ${photo.downloads}</b>
            </p>
          </div>
        </div>`;
        })
        .join("");
  divEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function clearGalleryContainer() {
  divEl.innerHTML = '';
}