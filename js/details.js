const params = new URLSearchParams(
    window.location.search
);

const bookId = Number(params.get("id"));

const book = books.find(
    book => book.id === bookId
);

const bookDetails = document.getElementById("book-details");

bookDetails.innerHTML = `
  <section class="details-hero">

     <button class="back-btn">
          ←
     </button>

     <img src="${book.image}"
          alt="${book.title}"
          class="details-cover"
      >

      <button class="share-btn">
          ↗
      </button>
  
    </section>

    <section class="details-info">
         <h1>${book.title}</h1>
         <p>${book.author}</p>
    </section>

`;