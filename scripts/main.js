// Create an Object book (Constructor)
function Book(title, author, genre, isRead, color, index) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.isRead = isRead;
    this.color = color;
    this.index = index;
};

// Create book component (Card)
function createBook(library, book_index, title, author, genre, color_status, id_status, color) {
    // Create card container component
    const card = document.createElement('article');
    // Add proper selectors
    card.classList.add('card');

    // Create status component
    const btn_status = document.createElement('button');
    const status_container = document.createElement('div');
    // Add proper selectors
    btn_status.classList.add('status');
    status_container.classList.add('status-container');

    // Create main book component
    const book_title = document.createElement('h1');
    const book_author = document.createElement('p');
    const book_title_author_container = document.createElement('div');
    const book_genre = document.createElement('p');
    const book_genre_container = document.createElement('div');
    const book_container = document.createElement('div');
    // Add proper selectors
    book_title.setAttribute('id', 'title');
    book_author.setAttribute('id', 'author');
    book_title_author_container.classList.add('title-author-container');
    book_genre.setAttribute('id', 'genre');
    book_genre_container.classList.add('genre-container');
    book_container.classList.add('book');

    // Create delete component
    const delete_svg = createDeleteSVG();
    const btn_delete = document.createElement('button');
    // Add proper selectors
    btn_delete.classList.add('delete-button');

    // Add listeners
    // Delete
    btn_delete.addEventListener('mouseup', () => {
        // Delete book from library (visual)
        library.removeChild(card);
        // Delete book from array (back-end / logic)
        console.log(bookLibrary[book_index].index);
        bookLibrary.splice(bookLibrary[book_index].index, 1);
        console.log(bookLibrary);
    });

    // Add proper values and data
    // Card
    card.dataset.index = book_index;
    card.setAttribute('style', `--book-color: ${color}`);
    // Status
    btn_status.setAttribute('id', 'status');
    btn_status.setAttribute('id', id_status);
    btn_status.setAttribute('style', `--_status-color: ${color_status}`);
    // Title-Author
    book_title.textContent = title;
    book_author.textContent = author;
    // Genre
    book_genre.textContent = genre;

    // Append Children
    // Status
    status_container.appendChild(btn_status);
    // Title-Author
    book_title_author_container.appendChild(book_title);
    book_title_author_container.appendChild(book_author);
    // Genre
    book_genre_container.appendChild(book_genre);
    // Book Container
    book_container.appendChild(book_title_author_container);
    book_container.appendChild(book_genre_container);
    // Delete
    btn_delete.appendChild(delete_svg);
    // Card Container
    card.appendChild(status_container);
    card.appendChild(book_container);
    card.appendChild(btn_delete);

    return card;
};

// Create SVG delete icon
function createDeleteSVG() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path1 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    const path2 = document.createElementNS("http://www.w3.org/2000/svg", 'path');

    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute('viewbox', '0 0 24 24');

    path1.setAttribute('d', 'M0 0h24v24H0z');
    path1.setAttribute('fill', 'none');

    path2.setAttribute('d', 'M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z');

    svg.appendChild(path1);
    svg.appendChild(path2);
    return svg;
};

function updateStatusBanner() {
    // Retrieve legend banner element
    const legend_banner = document.querySelectorAll('.legend-banner');
    // Create variables for legend banner
    let legend_read;
    let legend_oread;
    let legend_nread;

    // Iterate over legend banner
    // Then assign proper variables
    legend_banner.forEach(legend => {
        switch(legend.dataset.legend) {
            case 'read': legend_read = legend; break;
            case 'oread': legend_oread = legend; break;
            case 'nread': legend_nread = legend; break;
        };
    });

    for (read_status of bookLibrary)
    {
        if (read_status.isRead === legend_read.dataset.legend) {
            
        } else if (read_status.isRead === legend_oread.dataset.legend) {

        } else {

        };
    };
};

// Function to add a new book
modal_btn_add.addEventListener('mousedown', (e) => {
    // Initialize a book object
    let book;
    // Initialize status values
    let status_id;
    let status_color;
    // Get length of book library array
    let libraryLength = bookLibrary.length;
    // Retrieve book properties from modal inputs
    let library = document.querySelector('.library-wrapper');
    let book_title = document.querySelector('#book-title').value;
    let book_author = document.querySelector('#book-author').value;
    let book_genre = document.querySelector('#book-genre').value;
    let book_status = document.querySelector('[name="status"]:checked').value;
    let book_color = document.querySelector('[name="color"]:checked').value;

    // Change status to proper data value
    switch (book_status) {
        case 'read': status_id = 'read'; break;
        case 'oread': status_id = 'on-read'; break;
        case 'nread': status_id = 'not-read'; break;
    };
    // Change status to color value
    status_color = object_status_color[book_status];

    // Instantiate book object
    book = new Book(book_title, book_author, book_genre, book_status, book_color, libraryLength);
    // Add new book to array
    bookLibrary.push(book);

    library.appendChild(createBook(library, libraryLength - 1, book_title, book_author, book_genre, status_color, status_id, book_color));
    
    // Update status banner count
    updateStatusBanner();

    // Preven submitting of form to server
    e.preventDefault();
    e.stopPropagation();
    
    // Close Modal
    modal_add_book.close();
});