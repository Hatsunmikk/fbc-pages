const booksGrid = document.querySelector(".books-grid");


function renderBooks(){
    booksGrid.innerHTML = "";

    books.forEach(book => {

        booksGrid.innerHTML += `
        <div class="book-card">

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

renderBooks();