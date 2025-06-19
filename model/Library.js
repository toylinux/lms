class Library {
    constructor() {
        this.lastUserId = 0;
        this.lastBookId = 0;
        this.catalogue = [];
        this.allMyUsers = [];
    }

    getNextBookId() {
        return ++this.lastBookId;
    }

    getNextUserId() {
        return ++this.lastUserId;
    }

    addBook(title, author, genre, ISBN, location, description) {
        const book = new Book(this, title, author, genre, ISBN, location, description);
        this.catalogue.push(book);
        return book;
    }

    findBook(bookId) {
        return this.catalogue.find(book => book.bookId == bookId);
    }

    updateBook(bookId, newDetails) {
        const book = this.findBook(bookId);
        if (book) {
            book.updateDetails(newDetails);
            return true;
        }
        return false;
    }

    catalogueSearch(title) {
        return this.catalogue.filter(book => book.title.includes(title));
    }

    addUser(name, email, password, isLibrarian) {
        let user;
        const id = this.getNextUserId();
        if (isLibrarian) {
            user = new Librarian(this, id, name, email, password);
        } else {
            user = new Member(this, id, name, email, password);
        }
        this.allMyUsers.push(user);
    }

    findUser(userId) {
        return this.allMyUsers.find(user => user.userId == userId);
    }

    updateUser(userId, name, email, password) {
        let user = this.findUser(userId);
        if (user) {
            user.updateDetails(name, email, password);
            return true;
        }
        return false;
    }

    deleteUser(userId) {
        const user = this.findUser(userId);
        if (user) {
            const index = this.allMyUsers.indexOf(user);
            this.allMyUsers.splice(index, 1);
            return true;
        }
        return false;
    }
}
