const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
let rawQuotes = [];

// show new quotes
function newQuote(){
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = rawQuotes[Math.floor(Math.random() * rawQuotes.length)];
    // check if author field is blank and replace it with unknoen

    if(!quote.author){

        authorText.textContent = 'Unknown';
    }else{
        authorText.textContent = quote.author;
    }

    // check quote length
    if(quote.text,length > 120){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// get quote from api
async function getQuotes(){
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response  = await fetch(apiUrl);
        var apiQuotes = await response.json();
        rawQuotes = apiQuotes;
        newQuote();

    }catch(error){
        // use local quotes in case api not working
        rawQuotes = localQuotes;
        newQuote();
    }
}

// tweet quote
function tweetQuote(){
 const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
 window.open(twitterUrl, '_blank');
}

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}
//Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

getQuotes();