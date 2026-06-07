const params = new URLSearchParams(
    window.location.search
);

const bookId = Number(
    params.get("id")
);

const bookDetails =
    document.getElementById("book-details");

const book = books.find(
    book => book.id === bookId
);

if (!book) {

    bookDetails.innerHTML =
        "<h1>Book not found</h1>";

    throw new Error("Book not found");
}

function getDominantColor(imageUrl) {

    return new Promise((resolve) => {

        const img = new Image();

        img.crossOrigin = "anonymous";
        img.src = imageUrl;

        img.onload = () => {

            const canvas =
                document.createElement("canvas");

            const ctx =
                canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            const sampleWidth =
                canvas.width * 0.5;

            const sampleHeight =
                canvas.height * 0.5;

            const startX =
                canvas.width * 0.25;

            const startY =
                canvas.height * 0.25;

            const imageData =
                ctx.getImageData(
                    startX,
                    startY,
                    sampleWidth,
                    sampleHeight
                );

            const data =
                imageData.data;

            let r = 0;
            let g = 0;
            let b = 0;

            let count = 0;

            for (
                let i = 0;
                i < data.length;
                i += 40
            ) {

                r += data[i];
                g += data[i + 1];
                b += data[i + 2];

                count++;
            }

            resolve({
                r: Math.round(r / count),
                g: Math.round(g / count),
                b: Math.round(b / count)
            });
        };

        img.onerror = () => {

            resolve({
                r: 200,
                g: 220,
                b: 220
            });

        };

    });

}

function lightenColor(color) {

    return {

        r: Math.min(
            255,
            color.r + 70
        ),

        g: Math.min(
            255,
            color.g + 70
        ),

        b: Math.min(
            255,
            color.b + 70
        )

    };

}

bookDetails.innerHTML = `

<header class="header">

    <div class="header-left">

        <h1>Free Books</h1>

        <p>Gurgaon</p>

    </div>

    <div class="header-right">

        <button>🔍</button>

        <button>+</button>

        <button>👤</button>

    </div>

</header>

<section
    class="hero-section"
    id="hero-section"
>

    <button class="back-btn">
        <img src="./assets/icons/back-btn.png"
              alt="back button"
              class="back-btn-icon">
    </button>

    <button class="share-btn">
        <img src="./assets/icons/share-btn.png"
              alt="share button"
              class="share-btn-icon">
    </button>

    <div class="hero-left">

        <img
            src="${book.image}"
            alt="${book.title}"
            class="details-cover"
        >

    </div>

    <div class="hero-right">

        <div class="pill">
            ${book.type}
        </div>

        <div class="pill">
            ${book.genre.split(",")[0].trim()}
        </div>

        <div class="pill">
            ${book.binding}
        </div>

        <div class="pill">
            ${book.pages} pages
        </div>

        <div class="pill">
           ${(book.amazonRating * 20).toFixed(0)}% 👍
        </div>

        <div class="pill reviewers-pill">

           <span class="review-count">
              7,56,555
           </span>

           <span class="review-label">
              reviewers
            </span>

          </div>

    </div>

</section>

<div class="details-content">

<section class="book-header">

    <h1>${book.title}</h1>

    <p>by ${book.author}</p>

</section>

<button class="borrow-btn">
    Borrow
</button>

<section class="detail-section">

    <div class="section-title">

        <h2>About</h2>

        <div class="section-line"></div>

    </div>

    <div class="about-content">

        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec id condimentum leo. Nulla facilisi.
            Nam sed facilisis nulla. Aenean viverra feugiat dui,
            eget interdum turpis auctor ut.

            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec id condimentum leo. Nulla facilisi.
            Nam sed facilisis nulla. Aenean viverra feugiat dui,
            eget interdum turpis auctor ut.
        </p>

    </div>

</section>

<section class="detail-section">

    <div class="section-title">

        <h2>Author</h2>

        <div class="section-line"></div>

    </div>

    <div class="author-top">

        <img
            src="./assets/images/author.avif"
            alt="${book.author}"
            class="author-image"
        >

        <p class="author-bio">

            ${book.author} is a celebrated author
            whose work has been widely read and
            discussed by readers worldwide.

        </p>

    </div>

    <p class="author-extra">

        Additional author information can be
        displayed here when available from
        the dataset.

    </p>

</section>

<section class="detail-section">

<div class="section-title">

<h2>Publisher</h2>
<div class="section-line"></div>

</div>

<p>${book.publisher}</p>


</section>

<section class="detail-section">

    <div class="section-title">

        <h2>ISBN</h2>

        <div class="section-line"></div>

    </div>

    <p>
        ISBN-10: ${book.isbn10}
    </p>

    <p>
        ISBN-13: ${book.isbn13}
    </p>

</section>

<section class="detail-section">

    <div class="section-title">

        <h2>Review Summary</h2>

        <div class="section-line"></div>

    </div>

    <div class="review-summary">

        <div class="review-score">
            ⭐ ${book.rating}
        </div>

        <div class="review-placeholder">
            Review insights coming soon
        </div>

    </div>

</section>

<section class="detail-section">

    <div class="section-title">

        <h2>Tags</h2>

        <div class="section-line"></div>

    </div>

    <div class="tags-container">

        ${book.genre
            .split(",")
            .map(
                genre =>
                    `<span class="tag">
                        ${genre.trim()}
                    </span>`
            )
            .join("")}

    </div>

</section>

<section class="detail-section">

    <div class="section-title">

        <h2>Libraries</h2>

        <div class="section-line"></div>

    </div>

    <div class="libraries-list">

        <div class="library-card">
            Library information unavailable
        </div>

    </div>

</section>

</div>

<nav class="bottom-nav">

    <div class="nav-item">
        <span>📖</span>
        <p>read</p>
    </div>

    <div class="nav-item active-nav">
        <span>📚</span>
        <p>borrow</p>
    </div>

    <div class="nav-item">
        <span>🗺️</span>
        <p>explore</p>
    </div>

    <div class="nav-item">
        <span>👥</span>
        <p>meets</p>
    </div>

    <div class="nav-item">
        <span>💬</span>
        <p>chat</p>
    </div>

</nav>

`;

document
    .querySelector(".back-btn")
    .addEventListener("click", () => {

        window.history.back();

    });

getDominantColor(book.image)
    .then(color => {

        const lightColor =
            lightenColor(color);

        const hero =
            document.getElementById(
                "hero-section"
            );

        hero.style.background = `
            linear-gradient(
                180deg,
                rgb(
                    ${color.r},
                    ${color.g},
                    ${color.b}
                ),
                rgb(
                    ${lightColor.r},
                    ${lightColor.g},
                    ${lightColor.b}
                )
            )
        `;

    });