// Function to reinitialize input containers
function reinitializeInputContainer() {
    // Reset customize book properties
    customize_book_title.textContent = '';
    customize_book_author.textContent = '';
    customize_book_genre.textContent = '';
    customize_book_status.setAttribute('style', '--_status-color: #dd2525');
    customize_book_color.setAttribute('style', '--book-color: #fdfdfc');

    // Reset form
    modal_input_book_property.forEach(container => {
        container.querySelector('.text').classList.remove('active');
        container.querySelector('input').classList.remove('active');
    });

    modal_book_property_label.classList.remove('active');
    modal_book_property_select.classList.remove('active');
};

// Function to open modal
// of adding a book_property_dynamic
btn_add.addEventListener('mousedown', () => {
    modal_add_book.showModal();
});

// Function to reset modal
// of adding a book
modal_btn_reset.addEventListener('mouseup', () => {
    reinitializeInputContainer();
});

// Function to close modal
// of adding a book
modal_btn_close.addEventListener('mouseup', () => {
    modal_add_book.close();
    reinitializeInputContainer();
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
// When input field contains text
modal_input_book_property.forEach(container => {
    const label_book_property = container.querySelector('.text');
    const input_book_property = container.querySelector('input');

    input_book_property.addEventListener('blur', () => {
        // Validate if input field text contains text
        if (input_book_property.value !== '') {
            label_book_property.classList.add('active');
            input_book_property.classList.add('active');
        } else { // Or not
            label_book_property.classList.remove('active');
            input_book_property.classList.remove('active');
        }
    });
});

// Function to change visual text
// of customizable book title
modal_book_property_title_input.addEventListener('keyup', () => {
    // Change title element of customizable book
    customize_book_title.textContent = modal_book_property_title_input.value;
});

// Function to change visual text
// of customizable book author
modal_book_property_author_input.addEventListener('keyup', () => {
    // Change author element of customizable book
    customize_book_author.textContent = modal_book_property_author_input.value;
});

modal_book_property_select.addEventListener('change', () => {
    // Change genre element of customizable book
    customize_book_genre.textContent = modal_book_property_select.value;
});

// Function to position label above input
// When select field contains text
modal_book_property_select.addEventListener('blur', () => {
    if (modal_book_property_select.value !== '') {
        modal_book_property_label.classList.add('active');
    };
});

// Function to change the status color
// of the customizable book
modal_book_property_status.forEach(status => {
    status.addEventListener('mousedown', () => {
        // Retrieve visual status
        const book_status = document.querySelector('.modal .status-container');
        // Retrieve proper color
        let color = status_color[status.querySelector('input').value];

        // Set visual status color
        book_status.querySelector('.status').setAttribute('style', `--_status-color: ${color}`)
    });
});

// Function to change the color
// of the customizable book
modal_book_property_color.forEach(color => {
    color.addEventListener('mousedown', () => {
        // Retrieve book
        const book_color = document.querySelector('.modal .card');

        // Set visual color of the book
        book_color.setAttribute('style', `--book-color: ${color.value}`);
    });
})