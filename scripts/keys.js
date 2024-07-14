// Function to reinitialize modals
function reintializeModal() {
    // Reset customize book properties
    customize_book_title.textContent = '';
    customize_book_author.textContent = '';
    customize_book_genre.textContent = '';
    customize_book_status.setAttribute('style', '--_status-color: #34783a');
    customize_book_color.setAttribute('style', '--book-color: #fdfdfc');

    // Reset form
    // Title-Author
    modal_input_book_property.forEach(container => {
        container.querySelector('.text').classList.remove('active');
        container.querySelector('input').classList.remove('active');
        container.querySelector('input').value = '';
    });

    // Genre
    modal_book_property_label.classList.remove('active');
    modal_book_property_select.classList.remove('active');
    modal_book_property_select.value = '';

    // Status
    const initial_status = document.querySelector('.status-choice label input[type="radio"]');
    initial_status.checked = true;

    // Book Color
    const initial_color = document.querySelector('.color-palette input[type="radio"]');
    initial_color.checked = true;

    // Notifications
    // Remove fade-in animation
    notification_title.classList.remove('fade-in');
    notification_author.classList.remove('fade-in');
    notification_genre.classList.remove('fade-in');
    // Add fade-out animation
    notification_title.classList.add('fade-out');
    notification_author.classList.add('fade-out');
    notification_genre.classList.add('fade-out');
    // Then make display none after 0.3s
    setTimeout(() => {
        // Remove animation class
        notification_title.classList.remove('fade-out');
        notification_author.classList.remove('fade-out');
        notification_genre.classList.remove('fade-out');
        // Display none
        notification_title.removeAttribute('style', 'display: block');
        notification_author.removeAttribute('style', 'display: block');
        notification_genre.removeAttribute('style', 'display: block');
    }, 300);
};

// Function to open modal
// of adding a book_property_dynamic
btn_add.addEventListener('mousedown', () => {
    // Add animation
    modal_add_book.classList.add('zoom-out');
    // Then remove after
    setTimeout(() => {
        modal_add_book.classList.remove('zoom-out');
    }, 300);
    modal_add_book.showModal();
});

// Function to reset modal
// of adding a book
modal_btn_reset.addEventListener('mouseup', () => {
    reintializeModal();
});

// Function to close modal
// of adding a book
modal_btn_close.addEventListener('mouseup', () => {
    // Add animation
    modal_add_book.classList.add('zoom-in');
    // then remove after
    setTimeout(() => {
        // Reinitialize modal
        reintializeModal();
        modal_add_book.classList.remove('zoom-in');
        modal_add_book.close();
    }, 300);
    // Close modal
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
        let color = object_status_color[status.querySelector('input').value];

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

// Function to remove required notification
// When title input gains focus
modal_book_property_title_input.addEventListener('focus', () => {
    // Remove fade-in animation
    notification_title.classList.remove('fade-in');
    // Then make display none after 0.3s
    setTimeout(() => {
        // Remove animation class
        notification_title.classList.remove('fade-out');
        // Display none
        notification_title.removeAttribute('style', 'display: block');
    }, 300);
});

// Function to remove required notification
// When title input gains focus
modal_book_property_author_input.addEventListener('focus', () => {
    // Remove fade-in animation
    notification_author.classList.remove('fade-in');
    // Then make display none after 0.3s
    setTimeout(() => {
        // Remove animation class
        notification_author.classList.remove('fade-out');
        // Display none
        notification_author.removeAttribute('style', 'display: block');
    }, 300);
});

// Function to remove required notification
// When genre select gains focus
modal_book_property_select.addEventListener('focus', () => {
    // Remove fade-in animation
    notification_genre.classList.remove('fade-in');
    // Then make display none after 0.3s
    setTimeout(() => {
        // Remove animation class
        notification_genre.classList.remove('fade-out');
        // Display none
        notification_genre.removeAttribute('style', 'display: block');
    }, 300);
});