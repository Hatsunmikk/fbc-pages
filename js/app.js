const booksGrid = document.querySelector(".books-grid");
const ratingFilter = document.getElementById("rating-filter");
const typeFilter = document.getElementById("type-filter");
const genreFilter = document.getElementById("genre-filter");
const sortFilter = document.getElementById("sort-filter");

let ratingActive = false;
let selectedType = "all";
let selectedGenre = "all";
let selectedSort = "default";


function renderBooks(bookList){
    booksGrid.innerHTML = "";

    bookList.forEach(book => {

        booksGrid.innerHTML += `
        <div class="book-card"
              data-id="${book.id}">

        <img src="${book.image}"
             alt="${book.title}"
             class="book-cover"
        >

        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">${book.author}</p>

        <div class="book-meta">

            <span>⭐ ${book.rating}</span>


        </div>


        </div>
        `;

        document.querySelectorAll(".book-card").forEach(card => {
            
            card.addEventListener("click", () => {
               
                const bookId = card.dataset.id;

                window.location.href = `details.html?id=${bookId}`;
            });
        })
    });
}

function applyFilters(){
    let filteredBooks = [...books];

    if(ratingActive){
        filteredBooks = filteredBooks.filter(
            book => book.rating >= 4
        );
    }

    if(selectedType !== "all"){
        filteredBooks = filteredBooks.filter(
            book => book.type === selectedType
        );
    }
    if(selectedGenre !== "all"){
        filteredBooks = filteredBooks.filter(
            book => book.genre.includes(selectedGenre)
        );
    }
    if(selectedSort === "title-asc"){
        filteredBooks.sort((a, b) =>
            a.title.localeCompare(b.title)
    );
    }
    if(selectedSort === "title-desc"){
       filteredBooks.sort((a, b) =>
            b.title.localeCompare(a.title)
    );
    }

    if(selectedSort === "rating-desc"){
        filteredBooks.sort((a, b) =>
            b.rating - a.rating
        );
    }
    renderBooks(filteredBooks);
}

function populateGenres(){
    const genres = new Set();

    books.forEach(book =>{

        book.genre.split(",").forEach(genre => {

            if(genre.trim()){
                genres.add(genre.trim());
            }
        });
    });

    genres.forEach(genre => {
        genreFilter.innerHTML += `
        <option value="${genre}">
        ${genre}
        </option>
        `;
    });
}

renderBooks(books);
populateGenres();

ratingFilter.addEventListener("click", () => {
    
    ratingActive = !ratingActive;

    ratingFilter.classList.toggle("active");

    applyFilters();
});

typeFilter.addEventListener("change", e => {
    selectedType = e.target.value;

    applyFilters();
});

genreFilter.addEventListener("change", e => {
    selectedGenre = e.target.value;

    applyFilters();
});

sortFilter.addEventListener("change", e => {
    selectedSort = e.target.value;

    applyFilters();
});
