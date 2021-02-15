//get elements by DOM

const filter = document.getElementById('filter');
const postContainer = document.getElementById('post-container');
const loader = document.getElementById('loader');

let limit = 5;
let page = 1;

//get posts from the API
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();

    return data;
}

//show posts after fetch
async function showPosts() {
    const posts = await getPosts();
    posts.forEach( post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>    
        `;
        postContainer.appendChild(postElement);
    })
}

//function to display the loader and fetch next set of posts when scrolling to bottom of the page 
function showLoader() {
    loader.classList.add('show');

    setTimeout( () => {
        loader.classList.remove('show');

            setTimeout( () => {
                page++;
                showPosts();
            }, 300)
    }, 1000); 
}

//function to filter displayed posts based on the posts***
function filterPosts(e){
    const filterTerm = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post')
    posts.forEach( post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if( title.indexOf(filterTerm) > -1 || body.indexOf(filterTerm) > -1 ) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
        
    })
}

//display the initialy fetched API posts
showPosts();

//event handlers
//1. create event handler for page scroll
window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight}= document.documentElement;
    if (scrollTop + clientHeight === scrollHeight) {
        showLoader();
    }
});

//2. filter posts that are already displayed
filter.addEventListener('input', filterPosts);