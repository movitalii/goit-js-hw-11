const n=document.querySelector("#search-form"),e=document.querySelector("div");function t(n){const t=n.map((n=>`\n                <div class="photo-card">\n                  <img src="${n.webformatURL}" alt="${n.tags}" loading="lazy" />\n                  <div class="info">\n                    <p class="info-item">\n                      <b>Likes</b>\n                    </p>\n                    <p class="info-item">\n                      <b>${n.views}</b>\n                    </p>\n                    <p class="info-item">\n                      <b>${n.comments}</b>\n                    </p>\n                    <p class="info-item">\n                      <b>${n.downloads}</b>\n                    </p>\n                  </div>\n                </div>\n                    `)).join("");e.innerHTML=t}n.addEventListener("submit",(function(n){n.preventDefault();const{elements:{searchQuery:e}}=n.currentTarget;return fetch(`https://pixabay.com/api/?key=30062649-6c95f8a5f26546f2640c7031e&q=${e.value}&image_type=photo`).then((n=>{if(!n.ok)throw new Error(n.status);return n.json()})).then(t).catch((n=>console.log(n)))}));
//# sourceMappingURL=index.42d0ad3f.js.map
