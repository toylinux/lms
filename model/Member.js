class Member extends User {
    constructor(library, userId, name, email, password) {
        super(library, userId, name, email, password);
        this.borrowedBooks = [];
    }

    borrowBook(book, dueDate) {
        if (!book.canBorrow()) return;
        const record = new BorrowingRecord(this, book, new Date(), new Date(dueDate));
        this.borrowedBooks.push(record);
        book.markAsBorrowed();
    }

    returnBook(bookId) {
        const index = this.borrowedBooks.findIndex(record => record.borrowedBook.bookId == bookId);
        if (index !== -1) {
            this.borrowedBooks[index].returnBook();
            this.borrowedBooks.splice(index, 1);
        }
    }

//    checkBorrowingStatus() {
//        return this.borrowedBooks.map(record => record.borrowedBook.toString()).join("<br>");
//    }

    checkBorrowingStatus() {
        let out = "";
        for (let borrowingRecord of this.borrowedBooks) {
            let book = borrowingRecord.borrowedBook;
            out += book.toString();
            if (borrowingRecord.checkOverdue()) {
                out += " | OVERDUE! |";
            }
            out += "<br>";
        }
        return out.trim();
    }    
    
    toString() {
        return `${this.userId} The mumber ${this.name} hase the email ${this.email}`;
    }
}
