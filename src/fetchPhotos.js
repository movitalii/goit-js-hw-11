const API_KEY = '30062649-6c95f8a5f26546f2640c7031e';
const BASE_URL = 'https://pixabay.com/api/';

let page = 1;
const query = [];

function fetchPhotos(searchQuery) {
    if (searchQuery !== query[query.length - 1]) {
                page = 1;
            }
    return fetch(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
        .then(response => {            
            if (!response.ok) {
                throw new Error(response.status);
            }
            query.push(searchQuery);         
            page += 1;             
            return response.json();            
        });
};

export { fetchPhotos };

// export default class PixApiService {
//     constructor() {
//         this.data = '';
//         this.page = 1;
//     }

//     fetchPhotos() {
//         const API_KEY = '30062649-6c95f8a5f26546f2640c7031e';
//         const BASE_URL = 'https://pixabay.com/api/';

//         fetch(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.status);
//             }
//             return response.json();
//         });
//     }

//     get query() {
//         return this.searchQuery;
//     }

//     set query(newQuery) {
//         this.searchQuery = newQuery;
//     }
// }