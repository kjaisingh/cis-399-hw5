// Defining a baseURL and key to as part of the request URL

const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = 'ZxyKGlrLNZjdEiKsJtwnq5c07icQC0vX';

// Grab references to all the DOM elements you'll need to manipulate
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const section = document.querySelector('section');
const nav = document.querySelector('nav');

// Hide the "Previous"/"Next" navigation to begin with, as we don't need it immediately
nav.style.display = 'none';

// define the initial page number and status of the navigation being displayed
let pageNumber = 0;

// Event listeners to control the functionality
nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', previousPage);
searchForm.addEventListener('submit', submitSearch);

function submitSearch(e){
	pageNumber = 0;
	fetchResults(e);
}

function nextPage(e) {
	pageNumber += 1;
	fetchResults(e);
};

function previousPage(e) {
	if (pageNumber > 0) {
  		pageNumber -= 1;
  	} else {
    	return;
  	}
  	fetchResults(e);
};

function fetchResults(e) {
	e.preventDefault();

	let url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${searchTerm.value}&fq=document_type:("article")`;
	if (startDate.value !== '') {
		url += `&begin_date=${startDate.value}`;
	};
	if (endDate.value !== '') {
		url += `&end_date=${endDate.value}`;
	};

	fetch(url)
		.then(resp => resp.json())
    	.then(json => displayResults(json))
    	.catch(err => console.error(`Error fetching data: ${err.message}`));
}

function displayResults(json) {
	while (section.firstChild) {
    	section.removeChild(section.firstChild);
  	}

  	const articles = json.response.docs;
  	if (articles.length === 10) {
    	nav.style.display = 'block';
  	} else {
    	nav.style.display = 'none';
  	}

  	if (articles.length === 0) {
    	const para = document.createElement('p');
    	para.textContent = 'No results returned.'
    	section.appendChild(para);
  	} else {
    	for (const current of articles) {
    		const article = document.createElement('article');
    		const heading = document.createElement('h2');
    		const img = document.createElement('img');
    		const para1 = document.createElement('p');
    		const link = document.createElement('a');
    		const keywordPara = document.createElement('p');

    		link.href = current.web_url;
    		link.textContent = current.headline.main;

    		para1.textContent = current.snippet;

    		keywordPara.classList.add('keywords');
    		keywordPara.textContent = 'Keywords: ';
    		for (const keyword of current.keywords) {
    			const span = document.createElement('span');
    			span.textContent = `${keyword.value} `;
    			keywordPara.appendChild(span);
      		}

      		if (current.multimedia.length > 0) {
        		img.src = `http://www.nytimes.com/${current.multimedia[0].url}`;
        		img.alt = current.headline.main;
      		}

      		article.appendChild(heading);
      		article.appendChild(img);
      		article.appendChild(para1);
      		article.appendChild(keywordPara);
      		heading.appendChild(link);
      		section.appendChild(article);
    	}
  	}
};