const BONGO_CAT_UP = "assets/img/bongo_cat_up.png";
const BONGO_CAT_DOWN = "assets/img/bongo_cat_down.png";

const image = document.getElementById("bongo-cat");
const userInput = document.getElementById('username-input');

let blockSearches = false;

const WHIMSICAL_SEARCHES = ["best cat memez", "pixels movie", "all fruits named their color", "never gonna give you up", "i did it my way frank sinatra"];

document.onkeydown = function(event) {
    // Handle Bongo Cat
    goUpBongoCat();
    
    const bongoSound = new Audio("assets/sound/better_bongo.mp3");
    bongoSound.play();
    setTimeout(goDownBongoCat, 100);
}


userInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !blockSearches) {
        let randomness = Math.random();
        if (randomness <= 0.03) {
            doWhimsicalSearch();
            return;
        }
        randomness = Math.random();
        if (randomness <= 0.25) {
            doTypingTest();
            return;
        }
        else {
            search(userInput.value.replaceAll(" ","+").toLowerCase())
            return;
        }
    }
});


function doWhimsicalSearch() {
    blockSearches = true;
    const sparkle = new Audio("assets/sound/sparkle.mp3");
    sparkle.play();
    setTimeout(function() {search(WHIMSICAL_SEARCHES[Math.floor(Math.random()*WHIMSICAL_SEARCHES.length)])}, 3000);
}

function doTypingTest() {
    blockSearches = true;
    window.location.href = "typing_test.html?search=" + userInput.value.replaceAll(" ", "+");
}

function search(query) {
    // window.location.href = "https://www.google.com/search?q="+(query.replaceAll(" ","+"));
    window.location.href = "search_results.html?search=" + query.replaceAll(" ", "+");
}


function goDownBongoCat() {
    image.src=BONGO_CAT_DOWN;
}
function goUpBongoCat() {
    image.src=BONGO_CAT_UP;
}