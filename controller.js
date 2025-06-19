// Controller.js
let library = new Library();
library.addBook("The Great Gatsby", "F. Scott Fitzgerald", "Classic", "9780743273565", "Shelf A1", "A novel set in the Jazz Age.");
library.addBook("1984", "George Orwell", "Dystopian", "9780451524935", "Shelf B2", "Dystopian social science fiction novel.");
library.addBook("To Kill a Mockingbird", "Harper Lee", "Classic", "9780061120084", "Shelf C3", "A novel about racial injustice.");
library.addBook("Harry Potter", "some author", "fiction", "ISBN1234", "here", "good");
library.addBook("Lord of Rings", "some author", "fiction", "ISBN1235", "here", "good");
library.addBook("Twilight", "some author", "fiction", "ISBN1236", "here", "good");
library.addBook("Programming", "some author", "fiction", "ISBN1238", "here", "good");

library.addUser("Adam", "adam@example.com", "password123", true);
library.addUser("Alice", "alice@example.com", "password123", false);
library.addUser("Bob", "bob@example.com", "password456", false);
library.addUser("Charlie", "charlie@example.com", "password789", false);

function populateBooks(filter = "") {
    const bookDisplay = document.getElementById("book-display");
    bookDisplay.innerHTML = "";
    for (let book of library.catalogueSearch(filter)) {
        let bookDetails = document.createElement("li");
        bookDetails.innerHTML = book.toString();
        bookDisplay.appendChild(bookDetails);
    }
}
populateBooks();

const catalogueSearchForm = document.getElementById('catalogue-search-form');
catalogueSearchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = catalogueSearchForm.elements['title'].value;
    populateBooks(title);
    catalogueSearchForm.reset();
});

function populateUsers() {
    const userDisplay = document.getElementById("user-display");
    userDisplay.innerHTML = library.allMyUsers.map(user => `
        <li class="user-item">
            ID:${user.userId} ${user.name} (${user instanceof Librarian ? 'Librarian' : 'Member'})<br>Email: ${user.email}
        </li>`).join("");
}
populateUsers();

const addBookForm = document.getElementById('add-book-form');
addBookForm.addEventListener('submit', (event) => {
    event.preventDefault();// Stop form submission
    // Validate form data
    const title = addBookForm.elements['title'].value;
    const author = addBookForm.elements['author'].value;
    const genre = addBookForm.elements['genre'].value;
    const ISBN = addBookForm.elements['ISBN'].value;
    const location = addBookForm.elements['location'].value;
    const description = addBookForm.elements['description'].value;
    library.addBook(title, author, genre, ISBN, location, description);
    populateBooks();
    addBookForm.reset();
});

const addUserForm = document.getElementById('add-user-form');
addUserForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = addUserForm.elements['name'].value;
    const email = addUserForm.elements['email'].value;
    const password = addUserForm.elements['password'].value;
    const isLibrarian = addUserForm.elements['librarian'].checked;
    library.addUser(name, email, password, isLibrarian);
    populateUsers();
    addUserForm.reset();
});

const updateUserForm = document.getElementById('update-user-form');
updateUserForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const userId = updateUserForm.elements['user-id'].value;
    const name = updateUserForm.elements['name'].value;
    const email = updateUserForm.elements['email'].value;
    const password = updateUserForm.elements['password'].value;
    if (library.updateUser(userId, name, email, password)) {
        document.getElementById('update-user-result').innerHTML = "Update Successful.";
    } else {
        document.getElementById('update-user-result').innerHTML = "User not found.";
    }
    populateUsers();
    updateUserForm.reset();
});

const deleteUserForm = document.getElementById('delete-user-form');
deleteUserForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const userId = deleteUserForm.elements['user-id'].value;
    if (library.deleteUser(userId)) {
        document.getElementById('delete-user-result').innerHTML = "Delete Successful.";
    } else {
        document.getElementById('delete-user-result').innerHTML = "User not found.";
    }
    populateUsers();
    deleteUserForm.reset();
});

const borrowBookForm = document.getElementById('borrow-book-form');
borrowBookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const memberId = borrowBookForm.elements['member-id'].value;
    const bookId = borrowBookForm.elements['book-id'].value;
    const dueDate = borrowBookForm.elements['due-date'].value;
    let member = library.findUser(memberId);
    let book = library.findBook(bookId);
    if (member && book && book.canBorrow()) {
        member.borrowBook(book, dueDate);
        document.getElementById('borrowed-books').innerHTML = `${member.name}'s Borrowed Books:<br>${member.checkBorrowingStatus().replace(/\n/g, '<br>')}`;
    } else {
        document.getElementById('borrowed-books').innerHTML = `Borrow Failed.`;
    }
    borrowBookForm.reset();
});

const returnBookForm = document.getElementById('return-book-form');
returnBookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const memberId = returnBookForm.elements['member-id'].value;
    const bookId = returnBookForm.elements['book-id'].value;
    let member = library.findUser(memberId);
    try {
        member.returnBook(bookId);
        document.getElementById('borrowed-books').innerHTML = `${member.name}'s Borrowed Books:<br>${member.checkBorrowingStatus().replace(/\n/g, '<br>')}`;
    } catch (e) {
        document.getElementById('borrowed-books').innerHTML = `Return Failed.`;
    }
    returnBookForm.reset();
});