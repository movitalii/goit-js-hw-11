!function(){var n=document.querySelector("#search-form"),t=document.querySelector("div");function c(n){var c=n.map((function(n){return'\n                <div class="photo-card">\n                  <img src="'.concat(n.webformatURL,'" alt="').concat(n.tags,'" loading="lazy" />\n                  <div class="info">\n                    <p class="info-item">\n                      <b>Likes</b>\n                    </p>\n                    <p class="info-item">\n                      <b>').concat(n.views,'</b>\n                    </p>\n                    <p class="info-item">\n                      <b>').concat(n.comments,'</b>\n                    </p>\n                    <p class="info-item">\n                      <b>').concat(n.downloads,"</b>\n                    </p>\n                  </div>\n                </div>\n                    ")})).join("");t.innerHTML=c}n.addEventListener("submit",(function(n){n.preventDefault();var t=n.currentTarget.elements.searchQuery;return fetch("".concat("https://pixabay.com/api/","?key=").concat("30062649-6c95f8a5f26546f2640c7031e","&q=").concat(t.value,"&image_type=photo")).then((function(n){if(!n.ok)throw new Error(n.status);return n.json()})).then(c).catch((function(n){return console.log(n)}))}))}();
//# sourceMappingURL=index.5cf81b67.js.map
