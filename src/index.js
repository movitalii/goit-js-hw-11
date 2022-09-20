const API_KEY = '30062649-6c95f8a5f26546f2640c7031e';
const BASE_URL = 'https://pixabay.com/api/';

const formEl = document.querySelector('#search-form');
const divEl = document.querySelector('div');
formEl.addEventListener('submit', onFormSubmit);


function onFormSubmit(event) {
    event.preventDefault();

    const {
    elements: { searchQuery }
  } = event.currentTarget;

    return fetch(`${BASE_URL}?key=${API_KEY}&q=${searchQuery.value}&image_type=photo`)
    .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
    })
    .then(renderCards)
    .catch(error => console.log(error))
}

function renderCards(cards) {
    const markup = cards
        .map((card) => {
            return `
                <div class="photo-card">
                  <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
                  <div class="info">
                    <p class="info-item">
                      <b>Likes</b>
                    </p>
                    <p class="info-item">
                      <b>${card.views}</b>
                    </p>
                    <p class="info-item">
                      <b>${card.comments}</b>
                    </p>
                    <p class="info-item">
                      <b>${card.downloads}</b>
                    </p>
                  </div>
                </div>
                    `;
                })
            .join("");
    divEl.innerHTML = markup;
}

