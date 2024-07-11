// Function to open modal
// of adding a book_property_dynamic
btn_add.addEventListener('mousedown', () => {
    modal_add_book.showModal();
});

// Function to close modal
// of adding a bool
modal_btn_close.addEventListener('mouseup', () => {
    modal_add_book.close();
});

// Function to change modal buttons style
// When mouse is pressed
modal_buttons.forEach(button => {
    button.addEventListener('mousedown', () => {
        button.classList.add('press');
    });

    button.addEventListener('mouseup', () => {
        button.classList.remove('press');
    });

    button.addEventListener('mouseleave', () => {
        button.classList.remove('press');
    });
});

// Function to position label above input
modal_input_book_property.forEach(book_property => {
    const book_text = book_property.querySelector('.text');

    book_property.addEventListener('mousedown', () => {
        modal_input_book_property.forEach(book_property_dynamic => {
            const book_text_dynamic = book_property_dynamic.querySelector('.text');
            const book_input_dynamic = book_property_dynamic.querySelector('.text');

            if (book_text_dynamic.classList.contains('active')) {
                book_text_dynamic.classList.remove('active');
            }
        });

        book_text.classList.add('active');
    });
});