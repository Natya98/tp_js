let posts = document.getElementById("post-section");
let values = [];
let currentIndex = 0;
const batchSize = 3; 

fetch("data/posts.json")
    .then(response => response.json())
    .then(json => {
        values = json.slice(0, 100); //to avoid having 1 array thats length 1 with an array inside thats legnth 100
        renderBatch(); 
    });

function renderBatch() {
    if (currentIndex < values.length) {
        let newContent = ''; //initialization of the template string
        //i is reset at each renderBatch() call but not currentIndex to keep track of where we are
        for (let i = 0; i < batchSize && currentIndex < values.length; i++, currentIndex++) { //i counts up to 3 for one batch render then currentIndex keeps track of where we are in the array not to render the same posts over and over again
            newContent += `<div class="post-content">
                            <h3 class="post-title">${values[currentIndex].title}</h3>
                            <p class="post-body">${values[currentIndex].body}</p>
                           </div>`;
        }

        let postContainer = document.createElement('div'); //here we create the div where we will store our batch
        postContainer.className = "post"; //give it a class (called it post bc)
        postContainer.innerHTML = newContent; //add the html that we wrote in the template string
        posts.appendChild(postContainer); //add it to our post element that we got from the DOM so it actually gets displayed (pretty much linking it to the html file if that makes more sense)
    }
}

// Some math to make the scrolling thingie more efficient
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) { //Imagine that scrolling returns a Point(x,y) value, we are checking for when the y position added to the window height goes further than the total height of the DOM. If yes we render posts
        renderBatch(); 
    }
});
//this is kinda complicated so take the time to really understand what it does : scrollY returns the amount of pixels u scrolled down the y axis, innerHeight is the height if your monitor pretty much, so when those 2 get bigger than ur body.offSetHeight (which how tall ur body field is in pixels) then we render more bc we are trying to scroll past the end of the window