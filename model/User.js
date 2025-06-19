class User {
    constructor(library, userId, name, email, password) {
        this.theLibrary = library;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    updateDetails(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    toString() {
        return `User ID: ${this.userId}, Name: ${this.name}`;
    }
}
