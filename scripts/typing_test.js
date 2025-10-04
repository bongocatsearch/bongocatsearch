const BONGO_CAT_UP = "assets/img/bongo_cat_up.png";
const BONGO_CAT_DOWN = "assets/img/bongo_cat_down.png";

const image = document.getElementById("bongo-cat");
const userInput = document.getElementById('username-input');
const wpm = document.getElementById("wpm");
const spoodomotorRotateThingy = document.getElementById("spoodomotor-rotate");
const captchaText = document.getElementById("captcha-text");

const WHIMSICAL_SEARCHES = ["best cat memez", "pixels movie", "all fruits named their color", "never gonna give you up", "i did it my way frank sinatra"];
const SPOODOMOTOR_VALUES = [[0,-90], [3,-51], [8,-14], [28,20], [50,65], [200,89]]

const requiredWPM = Math.floor(Math.random()*90)+10;
let WPM = 0;
document.getElementById("req-wpm").textContent = requiredWPM;

let startTime = -1;

const urlParams = new URLSearchParams(window.location.search);
const testRaw = urlParams.get('search');
// Then use dataValue to modify elements on new-page.html
if (testRaw != null) {
    captchaText.textContent = testRaw.replaceAll("+"," ");
}


let wpmChecker;


document.onkeydown = function(event) {
    if (startTime == -1 && event.key != "Enter") {
        startTime = performance.now();
        wpmChecker = setInterval(updateWPM, 50);
    }
    // Handle Bongo Cat
    goUpBongoCat();
    
    const bongoSound = new Audio("assets/sound/better_bongo.mp3");
    bongoSound.play();
    setTimeout(goDownBongoCat, 100);
}


function updateWPM() {
    const len = userInput.value.length;
    const time = performance.now() - startTime;
    const actual_wpm = Math.round(len/(time/1000)/5*60);
    wpm.textContent = actual_wpm;
    WPM = actual_wpm;
    let rotation = Math.random() * 180 - 90;
    for (let i = 0; i < SPOODOMOTOR_VALUES.length; i++) {
        if (SPOODOMOTOR_VALUES[i][0] == actual_wpm) {
            rotation = SPOODOMOTOR_VALUES[i][1];
            break;
        }
        if (SPOODOMOTOR_VALUES[i][0] > actual_wpm) {
            // Linear time!
            rotation = SPOODOMOTOR_VALUES[i-1][1] + (SPOODOMOTOR_VALUES[i][1] - SPOODOMOTOR_VALUES[i-1][1]) * ((actual_wpm - SPOODOMOTOR_VALUES[i-1][0]) / (SPOODOMOTOR_VALUES[i][0] - SPOODOMOTOR_VALUES[i-1][0]))
            break;
        }
    }
    spoodomotorRotateThingy.style.transform = 'rotate(' + Math.floor(rotation) + 'deg)';
}


userInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        if (userInput.value != captchaText.textContent) {
            failSearch();
            return;
        }
        if (WPM != requiredWPM) {
            failSearch();
            return;
        }
        
        window.location.href = "https://www.google.com/search?q="+(userInput.value.replaceAll(" ","+").toLowerCase())
    }
});


function failSearch() {
    const fail = new Audio("assets/sound/failure.mp3");
    fail.play();
    clearInterval(wpmChecker);
    startTime = -1;
    userInput.value = "";
}


function goDownBongoCat() {
    image.src=BONGO_CAT_DOWN;
}
function goUpBongoCat() {
    image.src=BONGO_CAT_UP;
}