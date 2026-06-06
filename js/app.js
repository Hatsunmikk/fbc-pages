const booksGrid = document.querySelector(".books-grid");
const ratingFilter = document.getElementById("rating-filter");
let ratingActive = false;


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
    });
}

renderBooks(books);

ratingFilter.addEventListener("click", () => {
    
    ratingActive = !ratingActive;

    ratingFilter.classList.toggle("active");

    if(ratingActive){

        const filteredBooks = books.filter(book => book.rating >= 4);

        renderBooks(filteredBooks);
    } else {
        renderBooks(books);
    }
})
