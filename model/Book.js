class Book {
    constructor(library, title, author, genre, ISBN, location, description) {
        this.theLibrary = library;
        this.bookId = library.getNextBookId();
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.ISBN = ISBN;
        this.location = location;
        this.description = description;
        this.availableToBorrow = true;
        this.borrowingRecord = null;
    }

    markAsBorrowed() { this.availableToBorrow = false; }
    markAsReturned() { this.availableToBorrow = true; }
    canBorrow() { return this.availableToBorrow; }

    toString() {
        return `${this.title} (ID: ${this.bookId}) by ${this.author} - ${this.availableToBorrow ? "Available" : "Borrowed"}`;
    }
}
