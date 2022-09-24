const formEl = document.querySelector('#search-form');
const divEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
formEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);
import { fetchPhotos } from './fetchPhotos';

let data = '';

function onFormSubmit(event) {
  event.preventDefault();
  
  data = event.currentTarget.elements.searchQuery.value;

  fetchPhotos(data)
    .then(data => {
      console.log(data.hits);
      return data.hits;
    })
    .then(renderCards)
  .catch(error => console.log(error))
}

function onLoadMore() {
  fetchPhotos(data)
    .then(data => {
      console.log(data.hits);
      return data.hits;
    })
    .then(renderCards)
  .catch(error => console.log(error))
}

function renderCards(photos) {
  const markup = photos
    .map((photo) => {
          return `<div class="photo-card">
          <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
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
}