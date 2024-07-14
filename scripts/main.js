// Create an Object book (Constructor)
function Book(book, title, author, genre, isRead, color) {
    this.book = book;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.isRead = isRead;
    this.color = color;
};

// Create book component (Card)
function createBook(library, title, author, genre, status_color, status_id, color) {
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
    // Update
    book_container.addEventListener('mouseup', () => {
        // Create book instance variable
        let book_instance;

        // Iterate over bookLibrary array
        // to retrieve this book instance
        for (book of bookLibrary) {
            // Verify if the book instance
            // is the same as that of the card
            if (book.book === card) {
                // Store instance
                book_instance = book;
                break;
            };
        };

        // Add edit id on modal
        modal_add_book.setAttribute('id', 'edit');

        // Edit modal
        editModal(book_instance);
    });

    // Delete
    btn_delete.addEventListener('mouseup', () => {
        // Add "delete" animation
        card.classList.add('delete-animation');
        setTimeout(() => {
            // Delete book from library (visual)
            library.removeChild(card);
        }, 600);
        // Delete book from array (back-end / logic)
        // by iterating over the bookLibrary array
        for (book of bookLibrary) {
            // Verify if the book instance
            // is the same as that of the card
            if (book.book === card) {
                // Delete this book from the array
                bookLibrary.splice(bookLibrary.indexOf(book), 1);
                // Update status banner
                updateStatusBanner();
                return;
            };
        };
    });

    // Add proper values and data
    // Card
    card.setAttribute('style', `--book-color: ${color}`);
    // Status
    btn_status.setAttribute('id', 'status');
    btn_status.setAttribute('id', status_id);
    btn_status.setAttribute('style', `--_status-color: ${status_color}`);
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
    const legend_banner = document.querySelectorAll('.legend');
    // Create variables for legend banner
    let legend_read;
    let legend_oread;
    let legend_nread;

    // Count variable for each legend
    let count_read = 0;
    let count_oread = 0;
    let count_nread = 0;

    // Iterate over legend banner
    // Then assign proper variables
    legend_banner.forEach(legend => {
        switch (legend.querySelector('.legend-banner').dataset.legend) {
            case 'read':
                legend_read = legend;
                break;
            case 'oread':
                legend_oread = legend;
                break;
            case 'nread':
                legend_nread = legend;
                break;
        };
    });

    // Reset visual banner count
    legend_read.querySelector('.legend-text #legend-count').textContent = 0;
    legend_oread.querySelector('.legend-text #legend-count').textContent = 0;
    legend_nread.querySelector('.legend-text #legend-count').textContent = 0;

    // Find proper legend to add count value
    for (read_status of bookLibrary) {
        if (read_status.isRead === legend_read.querySelector('.legend-banner').dataset.legend) {
            count_read++
            legend_read.querySelector('.legend-text #legend-count').textContent = count_read;
        } else if (read_status.isRead === legend_oread.querySelector('.legend-banner').dataset.legend) {
            count_oread++
            legend_oread.querySelector('.legend-text #legend-count').textContent = count_oread;
        } else {
            count_nread++
            legend_nread.querySelector('.legend-text #legend-count').textContent = count_nread;
        };
    };
};

// Function to change add book modal
// to an edit book modal
function editModal(book) {
    // Change text of certain components
    // Get header title
    const modal_edit_text = modal_add_book.querySelector('.customize-container .title');
    // Get add button
    const modal_edit_btn = modal_btn_add;
    // Change text
    modal_edit_text.textContent = 'Edit Book';
    modal_edit_btn.value = 'Edit'

    // Retrieve all values for display and edit
    const book_title = book.title;
    const book_author = book.author;
    const book_genre = book.genre;
    const book_status = book.isRead;
    const book_color = book.color;

    // Apply book values to book customize preview
    customize_book_title.textContent = book_title;
    customize_book_author.textContent = book_author;
    customize_book_genre.textContent = book_genre;
    customize_book_status.setAttribute('style', `--_status-color: ${object_status_color[book_status]}`);
    customize_book_color.setAttribute('style', `--book-color: ${book_color}`);

    // Retrieve customization form components
    const form_title = modal_add_book.querySelector('.input-book-title #book-title');
    const form_author = modal_add_book.querySelector('.input-book-author #book-author');
    const form_genre = modal_add_book.querySelector('.input-book-genre #book-genre');
    const form_status = modal_add_book.querySelectorAll('.input-book-status input[type="radio"]');
    const form_color = modal_add_book.querySelectorAll('.input-book-color input[type="radio"]');

    // Apply values to form
    form_title.value = book.title;
    form_author.value = book.author;
    form_genre.value = book.genre;
    // Iterate over status radio buttons
    form_status.forEach(statusItem => {
        // Validate status
        if (statusItem.value === book.isRead) {
            statusItem.checked = true;
        }
    });
    // Iterate over color buttons
    form_color.forEach(colorItem => {
        // Validate color
        if (colorItem.value === book.color) {
            colorItem.checked = true;
        };
    });

    // Add active class to labels
    // Title-Author
    modal_input_book_property.forEach(container => {
        container.querySelector('.text').classList.add('active');
    });
    // Genre
    modal_book_property_label.classList.add('active');

    // Add this book to a temp var
    bookTemp = book;

    // Open modal
    // Add animation
    modal_add_book.classList.add('zoom-out');
    // then remove after
    setTimeout(() => {
        modal_add_book.classList.remove('zoom-out');
    }, 300);
    modal_add_book.showModal();
};

// Function to add a new book
modal_btn_add.addEventListener('mouseup', (e) => {
    // Preven submitting of form to server
    e.preventDefault();

    // Initialize a book object
    let book;
    // Initialize status values
    let status_id;
    let status_color;
    // Retrieve book properties from modal inputs
    let library = document.querySelector('.library-wrapper');
    let book_title = document.querySelector('#book-title');
    let book_author = document.querySelector('#book-author');
    let book_genre = document.querySelector('#book-genre');
    let book_status = document.querySelector('[name="status"]:checked').value;
    let book_color = document.querySelector('[name="color"]:checked').value;

    console.log(book_title.value)
    // Validate title has value
    if (book_title.value === '') {
        // Display required notification
        notification_title.setAttribute('style', 'display: block');
        setTimeout(() => {
            notification_title.classList.add('fade-in');
        }, 1);
        return;
    }

    // Validate author has value
    if (book_author.value === '') {
        // Display required notification
        // Display required notification
        notification_author.setAttribute('style', 'display: block');
        setTimeout(() => {
            notification_author.classList.add('fade-in');
        }, 1);
        return;
    }
    
    // Validate genre has value
    if (book_genre.value === '') {
        // Display required notification
        // Display required notification
        notification_genre.setAttribute('style', 'display: block');
        setTimeout(() => {
            notification_genre.classList.add('fade-in');
        }, 1);
        return;
    }

    // Verify if this modal is used
    // for edit
    if (document.querySelector('.modal#edit') != null) {
        // Reset certain components' labels
        modal_add_book.removeAttribute('id', 'edit');
        modal_add_book.querySelector('.customize-container .title').textContent = 'Add New Book';
        modal_btn_add.value = 'Add';

        // Update book component
        // Get book components
        const book_title__ = bookTemp.book.querySelector('.title-author-container #title')
        const book_author__ = bookTemp.book.querySelector('.title-author-container #author')
        const book_genre__ = bookTemp.book.querySelector('.genre-container #genre')
        const book_status__ = bookTemp.book.querySelector('.status-container .status');
        const book_color__ = bookTemp.book;
        // Add values
        book_title__.textContent = modal_book_property_title_input.value;
        book_author__.textContent = modal_book_property_author_input.value;
        book_genre__.textContent = modal_book_property_select.value;
        // Remove current id status
        book_status__.removeAttribute('id', 'not-read');
        // Change status to proper data value
        switch (book_status) {
            case 'read': status_id = 'read'; break;
            case 'oread': status_id = 'on-read'; break;
            case 'nread': status_id = 'not-read'; break;
        };
        book_status__.setAttribute('id', `${status_id}`);
        book_color__.setAttribute('style', `--book-color: ${book_color}`);

        // Change back-end array values
        bookTemp.title = modal_book_property_title_input.value;
        bookTemp.author = modal_book_property_author_input.value;
        bookTemp.genre = modal_book_property_select.value;
        bookTemp.isRead = book_status;
        bookTemp.color = book_color;
        console.log(bookTemp);

        // Update status banner
        updateStatusBanner();

        // Reinitialize modal
        reintializeModal();

        // Reset temp var value
        bookTemp = undefined;

        // Close modal
        // Add animation
        modal_add_book.classList.add('zoom-in');
        // then remove after
        setTimeout(() => {
            modal_add_book.classList.remove('zoom-in');
            modal_add_book.close();
        }, 300);
        return;
    };

    // Change status to proper data value
    switch (book_status) {
        case 'read': status_id = 'read'; break;
        case 'oread': status_id = 'on-read'; break;
        case 'nread': status_id = 'not-read'; break;
    };
    // Change status to color value
    status_color = object_status_color[book_status];

    // Create visual book
    book = createBook(library, book_title.value, book_author.value, book_genre.value, status_color, status_id, book_color);
    // Add visual book to the DOM
    library.appendChild(book);
    // Add "add" animation
    book.classList.add('add-animation');
    // then remove after
    setTimeout(() => {
        book.classList.remove('add-animation');
    }, 600);

    // Create book object instance
    let book_instance = new Book(book, book_title.value, book_author.value, book_genre.value, book_status, book_color);
    // Add new book to array
    bookLibrary.push(book_instance);

    // Update status banner count
    updateStatusBanner();

    // Reinitialize all inputs of modal
    reintializeModal();

    // Close modal
    // Add animation
    modal_add_book.classList.add('zoom-in');
    // then remove after
    setTimeout(() => {
        modal_add_book.classList.remove('zoom-in');
        modal_add_book.close();
    }, 300);
});