const API_KEY = '30062649-6c95f8a5f26546f2640c7031e';
const BASE_URL = 'https://pixabay.com/api/';

function fetchPhotos(searchQuery) {
    return fetch(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
};

export { fetchPhotos };