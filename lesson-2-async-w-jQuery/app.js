/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                Authorization: 'Client-ID FPKHiS_I3hLHLHzIhU1veITG3rxfOZq5-Hlq8T7dszw'
            }
        }).done(addImage);

        function addImage(images){
            const firstImage = images.results[0];
            responseContainer.insertAdjacentHTML('afterbegin',`<figure>
            <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`);
        }

        $.ajax({
            url : `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=7EEJteGkEQVbr07RieK9DQ51WH66cioh`
        }).done(addArticles);

        function addArticles(articles){
            responseContainer.insertAdjacentHTML('beforeend','<ul>' + articles.response.docs.map(article=>`<li class="article">
            <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
            <p>${article.snippet}</p>
        </li>
        `).join('') +'</ul>')
        }
    });
})();
