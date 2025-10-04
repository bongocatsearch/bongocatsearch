// Font is from https://cooltext.com/Logo-Design-Fun
const API_KEY = "AIzaSyAVzHtdDm5FvByo7v2YJABDTL7WqVR4KTM";  // Public API key. Cry about it.
const SEARCH_ENGINE = "8330b8ddfcd9141ce";

const RESULT_HTML = `
        <div class="result">
            <h2 class="result-title"><a href="$%{URL}%$">$%{TITLE}%$</a></h2>
            <img class="result-image" src="$%{IMAGE_URL}%$">
            <p class="result-description">$%{DESCRIPTION}%$</p>
        </div>`


const urlParams = new URLSearchParams(window.location.search);
const testRaw = urlParams.get('search');
// Then use dataValue to modify elements on new-page.html
if (testRaw != null) {
    getResults(testRaw.replaceAll("+"," "));
}


function getResults(query) {
    // Request Format: 
    // https://www.googleapis.com/customsearch/v1?key={{API_KEY}}&cx={{SEARCH_ENGINE}}&q={{QUERY}}
    // Request Example:
    // GET https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures
    const formattedQuery = query.replaceAll(" ", "+")
    const request = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE}&q=${formattedQuery}`
    fetch(request).then(response => {
        // Throw error if response was invalid.
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Return the response json as 'data'
        return response.json();
    }).then(data => {
        // Handle the parsed data
        console.log(data);
        handleResponseJSON(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    // Response is https://developers.google.com/custom-search/v1/reference/rest/v1/Search
}


function handleResponseJSON(json) {
    // json.context: Just gives the title
    // json.items: Gives the top 10 search results. Each result contains an object with...
    //  - displayLink: "www.youtube.com"
    //  - formattedUrl: "https://www.youtube.com/shorts/l_CtqhjLzi4"
    //  - htmlFormattedUrl: "https://www.youtube.com/shorts/l_CtqhjLzi4"
    //  - htmlSnippet: "Jun 7, 2023 <b>...</b> Exactly what you think it is..."
    //  - htmlTitle: "How To <b>Eat</b> a <b>Taco</b> - YouTube"
    //  - kind: "customsearch#result"
    //  - link: "https://www.youtube.com/shorts/l_CtqhjLzi4"
    //  - snippet: "Jun 7, 2023 ... Exactly what you think it is..."
    //  - title: "How To Eat a Taco - YouTube"
    //  - pagemap: This contains all the data like images and such, as follows below:
    //      - [!] cse_image (array[1]): object{src: "https://i.ytimg.com/vi/l_CtqhjLzi4/oar2.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLBMsQEzsBD-cBa7CthxS0Eoy5STsg"}
    //      - [!] cse_thumbnail (array[1]): object{height: "300", width: "168", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqyvTRqJIU-GRrw0hReOUGjEuwHm3OVWSZ-5kbCtZ6Lkp7bvSWoHrUHlo1&s"}
    //      - image_object (array[1]): object{height: "720", width: "405", src:"https://i.ytimg.com/vi/l_CtqhjLzi4/oar2.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLBMsQEzsBD-cBa7CthxS0Eoy5STsg"}
    //      - interactioncounter (array[2]): object{interactiontype: "https://schema.org/LikeAction", userinteractioncount: "15330"}, object{interactiontype: "https://schema.org/WatchAction", userinteractioncount: "536605"}
    //      - listitem (array[1]): object{position: "1"}
    //      - metatags (array[1]): Good fucking luck on this. You have to handle all <meta> tags.
    //      - person (array[1]): object{name: "Rick Bayless", url: "http://www.youtube.com/@rickbayless"}
    //      - thing (array[1]): object{name: "Rick Bayless"}
    //      - videoobject(array[1]): This is cool, but this is a LOT of parsing for video stuffs. GL
    // kind: customsearch#search
    // queries: Contains nextPage results and request results as follow:
    //  - nextPage: object{contents are below}
    //      - count: 10
    //      - cx: "05fdf4338f68f48a5"
    //      - inputEncoding: "utf8"
    //      - outputEncoding: "utf8"
    //      - safe: "off"
    //      - searchTerms: "How do I eat tacos?"
    //      - startIndex: 11
    //      - title: "Google Custom Search - How do I eat tacos?"
    //      - totalResults: "181000000"
    //  - request: object{contents are below}
    //      - count: 10
    //      - cx: "05fdf4338f68f48a5"
    //      - inputEncoding: "utf8"
    //      - outputEncoding: "utf8"
    //      - safe: "off"
    //      - searchTerms: "How do I eat tacos?"
    //      - startIndex: 11
    //      - title: "Google Custom Search - How do I eat tacos?"
    //      - totalResults: "181000000"
    // searchInformation:
    //  - formattedSearchTime: "0.32"
    //  - formattedTotalResults: "181,000,000"
    //  - searchTime: 0.318409
    //  - totalResults: 181000000
    // url:
    //  - template: "https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json"
    //  - type: "application/json"

    let html = "";
    let results = json.items
    const numberOfQueries = Number(json.queries.request[0].count);
    for (let i = 0; i < numberOfQueries; i++) {
        let result = results[i];
        let tempHTML = RESULT_HTML  // Copy the template
        tempHTML = tempHTML.replaceAll("$%{URL}%$", result.link);
        tempHTML = tempHTML.replaceAll("$%{TITLE}%$", result.title);
        tempHTML = tempHTML.replaceAll("$%{IMAGE_URL}%$", (result.pagemap.cse_image != null && result.pagemap.cse_image[0].src) ? result.pagemap.cse_image[0].src : "assets/img/bongo_cat_down.png");
        tempHTML = tempHTML.replaceAll("$%{DESCRIPTION}%$", result.snippet);
        html += tempHTML;
    }

    const container = document.getElementById("results-container");
    container.innerHTML += html;
    console.log("Finished adding " + numberOfQueries + "..." + html);
}