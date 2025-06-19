describe("Basic Tests", () => {

	beforeEach(() => {
		library = new Library();
	});
	it("should include a Library class", () => {

		expect(library.catalogue.length).toBe(0);
		expect(library.allMyUsers.length).toBe(0);
		expect(library.lastUserId).toBe(0);
		expect(library.lastBookId).toBe(0);
	});

	it("should include a Book class", () => {
		const theLibrary = new Library();
		const book = new Book(theLibrary,
			"Implementing LDAP",
			"Mark Wilcox",
			"Non-fiction",
			"1-861002-21-1",
			"Aisle 4B",
			"Share the experience Mark Wilcox (Netscape Developer Champion) has gained developing directory services for a large university using LDAP and Netscape Directory Server"
		);

		expect(book.theLibrary).toBe(theLibrary);
		expect(book.bookId).toBe(1);
		expect(book.title).toBe("Implementing LDAP");
		expect(book.author).toBe("Mark Wilcox");
		expect(book.genre).toBe("Non-fiction");
	});
	// More tests for the attributes...
	it("should include a User class", () => {
		let library = new Library();
		const user = new User(library, 2, "Bob", "Bob@123.com", "123123");
		expect(user.userId).toBe(2);


	});

});

describe("User Management", () => {
	it("should have an addUser method", () => {
		let library = new Library();
		expect(library.allMyUsers.length).toBe(0);
		library.addUser(
			"Mike",
			"milk@123.com",
			"something");
		expect(library.allMyUsers.length).toBe(1);
	});
	it("should have a toString method.", () => {
		let user = new User(2, "Bob", "bob@123,com", "1111");
	});

	    it("Should be able to update a user", () => {
        let library = new Library();

        library.addUser("Tim", "abc@123.com", "secret");
        expect(library.allMyUsers[0].name).toBe("Tim");
        expect(library.allMyUsers[0].email).toBe("abc@123.com");
        expect(library.allMyUsers[0].password).toBe("secret");
        library.updateUser(1, "bob", "a@b.co.nz", "newsecret")
        expect(library.allMyUsers[0].name).toBe("bob");
        expect(library.allMyUsers[0].email).toBe("a@b.co.nz");
        expect(library.allMyUsers[0].password).toBe("newsecret");
    });
    it("Should be able to delete a user", () => {
        let library = new Library();
        expect(library.allMyUsers.length).toBe(0);
        library.addUser("Tim", "abc@123.com", "secret");
        expect(library.allMyUsers.length).toBe(1);
        library.deleteUser(1);
        expect(library.allMyUsers.length).toBe(0);
    });

});


describe("Book Management", () => {
	it("should have an addBook method", () => {
		let library = new Library();
		expect(library.catalogue.length).toBe(0);
		library.addBook(library,
			"Harry Poter",
			"JK rowling",
			"Fiction",
			"f556",
			"unknown",
			"A story of a child wizard."

		);
		expect(library.catalogue.length).toBe(1);
	});
});

describe("Borrowing and Returning Books", () => {
	beforeEach(() => { library = new Library() });
	it("Should be able to borrow a book", () => {
		let member = new Member(library, "Tim", "abc@123.com", "secret");
		let book1 = new Book(library, "Harry Potter", "JK Rowling", "genre", "ISBN", "location", "description");
		let book2 = new Book(library, "Pride and Prejudice", "Jane Austen", "genre", "ISBN", "location", "description");

		expect(member.borrowedBooks.length).toBe(0);
		member.borrowBook(book1, Date.now());
		expect(member.borrowedBooks.length).toBe(1);
		member.borrowBook(book2, Date.now());
		expect(member.borrowedBooks.length).toBe(2);
		expectedOutput = "Harry Potter (ID: 1) by JK Rowling\nPride and Prejudice (ID: 2) by Jane Austen";
		//expect(member.checkBorrowingStatus()).toBe(expectedOutput);
	});
});

describe("Catalogue Search", () => {
	it("TODO", () => {

		expect(true).toBe(true);

	});
});