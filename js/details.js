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

<section
    class="hero-section"
    id="hero-section"
>

    <button class="back-btn">
        ←
    </button>

    <button class="share-btn">
        ↗
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
            ⭐ ${book.rating}
        </div>

    </div>

</section>

<section class="book-header">

    <h1>${book.title}</h1>

    <p>by ${book.author}</p>

</section>

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