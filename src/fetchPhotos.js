const API_KEY = '30062649-6c95f8a5f26546f2640c7031e';
const BASE_URL = 'https://pixabay.com/api/';

let page = 1;
const query = [];

async function fetchPhotos(searchQuery) {
    if (searchQuery !== query[query.length - 1]) {
        page = 1;
    }
    
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
    query.push(searchQuery);         
    page += 1;
    const data = await response.json();
    return data;   
};

export { fetchPhotos };