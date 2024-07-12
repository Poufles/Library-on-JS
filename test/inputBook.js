function Book(title, genre) {
    this.title = title;
    this.genre = genre;
};

const myPetitLibrary = new Array();

let book = new Book('10 Little Indians', 'Thriller');

myPetitLibrary.push(book);
console.log(myPetitLibrary);

book = new Book('Bible', 'Religious');

myPetitLibrary.push(book);
console.log(myPetitLibrary);

for (book of myPetitLibrary) {
    console.log(book.title);
}

for (book of myPetitLibrary) {
    if (book.title === '10 Little Indians') {
        console.log(book);
    };
};

