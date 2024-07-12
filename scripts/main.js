// Create an Object book (Constructor)
function Book(title, author, genre, isRead, color) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.isRead = isRead;
    this.color = color;
};

modal_btn_add.addEventListener('mousedown', (e) => {
    // Initialize a book object
    let book;
    // Retrieve book properties from modal inputs
    let book_title = document.querySelector('#book-title').value;
    let book_author = document.querySelector('#book-author').value;
    let book_genre = document.querySelector('#book-genre').value;
    let book_status = document.querySelector('[name="status"]:checked').value;
    let book_color = document.querySelector('[name="color"]:checked').value;

    console.log(book_status.value);
    // Preven submitting of form to server
    e.preventDefault();
    e.stopPropagation();

    // Instantiate book object
    book = new Book(book_title, book_author, book_genre, book_status, book_color);
    // Add new book to array
    bookLibrary.push(book);
    console.log(bookLibrary);
});