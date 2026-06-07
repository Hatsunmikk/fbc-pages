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

<div class="publisher-logos">

        <img
            src="./assets/images/publisher1.png"
            alt="Solaris"
            class="publisher-logo solaris-logo"
        >

        <img
            src="./assets/images/publisher2.png"
            alt="Rebellion Publishing"
            class="publisher-logo rebellion-logo"
        >

    </div>


</section>

<section class="detail-section">

    <div class="section-title">

        <h2>ISBN</h2>

        <div class="section-line"></div>

    </div>

   <div class="isbn-container">

        <div class="isbn-card">

            <h3>ISBN-10</h3>

            <img
                src="./assets/icons/barcode.png"
                alt=""
                class="barcode"
            >

            <p>${book.isbn10}</p>

        </div>

        <div class="isbn-card">

            <h3>ISBN-13</h3>

            <img
                src="./assets/icons/barcode.png"
                alt=""
                class="barcode"
            >

            <p>${book.isbn13}</p>

        </div>

    </div>


</section>

<section class="detail-section">

    <div class="section-title">

        <h2>Review Summary</h2>

        <div class="section-line"></div>

    </div>

    <div class="review-box">

        <div class="community-reviews">
            Community Reviews
        </div>

        <div class="review-header">

            <div class="stars">
                ★ ★ ★ ★ ☆
            </div>

            <div class="review-rating">
                ${book.rating}
            </div>

            <div class="review-counts">
                21,289 ratings · 5,429 reviews
            </div>

        </div>

        <div class="rating-bars">

            <div class="rating-row">

                <span class="rating-label">
                    5 stars
                </span>

                <div class="bar-track">
                    <div
                        class="bar-fill"
                        style="width:47%"
                    ></div>
                </div>

                <span class="rating-value">
                    10,049 (47%)
                </span>

            </div>

            <div class="rating-row">

                <span class="rating-label">
                    4 stars
                </span>

                <div class="bar-track">
                    <div
                        class="bar-fill"
                        style="width:30%"
                    ></div>
                </div>

                <span class="rating-value">
                    6,544 (30%)
                </span>

            </div>

            <div class="rating-row">

                <span class="rating-label">
                    3 stars
                </span>

                <div
                    class="bar-track"
                >
                    <div
                        class="bar-fill"
                        style="width:14%"
                    ></div>
                </div>

                <span class="rating-value">
                    3,156 (14%)
                </span>

            </div>

            <div class="rating-row">

                <span class="rating-label">
                    2 stars
                </span>

                <div
                    class="bar-track"
                >
                    <div
                        class="bar-fill"
                        style="width:5%"
                    ></div>
                </div>

                <span class="rating-value">
                    1,105 (5%)
                </span>

            </div>

            <div class="rating-row">

                <span class="rating-label">
                    1 star
                </span>

                <div
                    class="bar-track"
                >
                    <div
                        class="bar-fill"
                        style="width:2%"
                    ></div>
                </div>

                <span class="rating-value">
                    435 (2%)
                </span>

            </div>

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

        <h2>Available to Borrow</h2>

        <div class="section-line"></div>

    </div>

    <div class="libraries-grid">

        <div class="library-item">

            <img
                src="./assets/images/fbc-logo.png"
                alt=""
                class="library-logo"
            >

            <p>Fictional Library</p>

        </div>

        <div class="library-item">

            <img
                src="./assets/images/fbc-logo.png"
                alt=""
                class="library-logo"
            >

            <p>Vidur's Library</p>

        </div>

        <div class="library-item">

            <img
                src="./assets/images/fbc-logo.png"
                alt=""
                class="library-logo"
            >

            <p>Sumit's Library</p>

        </div>

    </div>
</section>

</div>

<nav class="details-nav">

    <div class="details-nav-item active-detail-nav">

        <img
            src="./assets/icons/borrow-2.png"
            alt=""
            class="nav-icon"
        >

        <span>Borrow</span>

    </div>

    <div class="details-nav-divider"></div>

    <div class="details-nav-item">

        <img
            src="./assets/icons/read-2.png"
            alt=""
            class="nav-icon"
        >

        <span>Read</span>

    </div>

    <div class="details-nav-divider"></div>

    <div class="details-nav-item">

        <img
            src="./assets/icons/meet-2.png"
            alt=""
            class="nav-icon"
        >

        <span>Meet</span>

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