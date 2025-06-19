class Librarian extends User {
    constructor(library, userId, name, email, password) {
        super(library, userId, name, email, password);
    }

    toString() {
        return `Librarian ID: ${this.userId}, Name: ${this.name}`;
    }
}
