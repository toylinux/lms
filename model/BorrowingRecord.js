class BorrowingRecord {
    constructor(borrower, borrowedBook, borrowDate, dueDate) {
        this.borrower = borrower;
        this.borrowedBook = borrowedBook;
        this.borrowDate = borrowDate;
        this.dueDate = dueDate;
        this.isReturned = false;
    }

    returnBook() {
        this.isReturned = true;
        this.borrowedBook.markAsReturned();
    }

    checkOverdue() {
        return !this.isReturned && new Date(this.dueDate) < Date.now();
    }
//    checkOverdue(currentDate) {
//        return currentDate > this.dueDate && !this.isReturned;
//    }
}
