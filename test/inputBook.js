function Book(title, genre) {
    this.title = title;
    this.genre = genre;
};

const myPetitLibrary = new Array();

myPetitLibrary.push(new Book('10 Little Indians', 'Thriller'));
console.log(myPetitLibrary);

myPetitLibrary.push(new Book('Bible', 'Religious'));
console.log(myPetitLibrary);

for (book of myPetitLibrary) {
    console.log(book.title);
}

for (book of myPetitLibrary) {
    if (book.title === '10 Little Indians') {
        console.log(book);
    };
};

