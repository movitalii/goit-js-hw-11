const formEl = document.querySelector('#search-form');
const divEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const submitBtn = document.querySelector('.submit');
formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', onFormInput);
loadMoreBtn.addEventListener('click', onLoadMore);
import { fetchPhotos } from './fetchPhotos';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

let data = '';

function onFormInput(event) {
    submitBtn.removeAttribute('disabled');
}

loadMoreBtn.classList.add('is-hidden');

function onFormSubmit(event) {  
  event.preventDefault();  
  clearGalleryContainer()  
  loadMoreBtn.classList.add('is-hidden');  

  data = event.currentTarget.elements.searchQuery.value;

  if (data === '') {
    Notiflix.Notify.warning('The field must not be empty!');
  } else {
    fetchPhotos(data)
      .then(data => {
        if (data.hits.length === 0) {
          Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        } else {
          submitBtn.setAttribute('disabled', '');
          loadMoreBtn.classList.remove('is-hidden');
        }
        return data.hits;
      })
      .then(renderCards)
  .catch(error => console.log(error))
  }  
}

function onLoadMore() {
  fetchPhotos(data)
    .then(data => {  
      if (data.hits.length === 0) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        loadMoreBtn.classList.add('is-hidden');
      }
      return data.hits;
    })
    .then(renderCards)
  .catch(error => console.log(error))
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