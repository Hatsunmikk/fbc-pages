const booksGrid = document.querySelector(".books-grid");

const books = [
    {
        title: "Wellness",
        author: "Nathan Hill",
        rating: 4.4,
        likes: "92%",
        image: "./assets/books/wellness.png"
    },
    {
        title: "Demon Copperhead",
        author: "Barbara Kingsolver",
        rating: 4.5,
        likes: "95%",
        image: "./assets/books/demon.png"
    }
];

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

            <span>👍 ${book.likes}</span

        </div>


        </div>
        `;
    });
}

renderBooks();