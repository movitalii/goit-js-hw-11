const formEl = document.querySelector('#search-form');
const divEl = document.querySelector('.gallery');
formEl.addEventListener('submit', onFormSubmit);
import { fetchPhotos } from './fetchPhotos';

function onFormSubmit(event) {
    event.preventDefault();

    const data = event.currentTarget.elements.searchQuery.value;

    fetchPhotos(data)
    .then(data => { 
        const elements = Object.entries(data);
        const photosInfo = elements[elements.length - 1];
        const photos = photosInfo[photosInfo.length - 1];

        const markup = photos.map((photo) => {
          return `<div class="photo-card">
          <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
            </p>
            <p class="info-item">
              <b>${photo.views}</b>
            </p>
            <p class="info-item">
              <b>${photo.comments}</b>
            </p>
            <p class="info-item">
              <b>${photo.downloads}</b>
            </p>
          </div>
        </div>`;
        })
        .join("");
        divEl.innerHTML = markup;
      })      
    .catch(error => console.log(error))
}
