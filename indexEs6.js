// Saving table HTML before running any other functions
let tableID = document.getElementById('tableID');
let TableTxt = document.getElementById('tableID').innerHTML;

// Showning added books
showBook();


//Making our Booklist scrollable


// console.log("Working");
//This function will show the added books
function showBook() {
    let getBook = localStorage.getItem('books');
    let bookObj;
    if (getBook == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(getBook);
    }
    let addRow = "";
    bookObj.forEach(function (element, index) {
        addRow += `
            <tr>
            <td>${element.name}</td>
            <td>${element.author}</td>
            <td>${element.type}</td>
            <td><button id="${index}" onclick="deleteBook(this.id)" class="btn btn-primary">Delete Book</button></td>
            </tr>`;
    });
    let tableBody = document.getElementById('tableBody');
    let empty_TableTxt = `<h5>Nothing to show! Use "Add Book" button above to add new book.</h5>`;
    if (bookObj.length == 0) {
        tableBody.innerHTML = "";
        tableID.innerHTML = empty_TableTxt;

    }
    else {
        tableBody.innerHTML = addRow;
        if (tableID.innerHTML = empty_TableTxt) {
            tableID.innerHTML = TableTxt;
        }
    }
}

//This function will delete the books
function deleteBook(index) {
    let getBook = localStorage.getItem('books');
    let bookObj;
    if (getBook == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(getBook);
    }
    let bookname = bookObj[index].name;
    bookObj.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(bookObj));
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Deleted</strong>: ${bookname} has been deleted from the list
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`
    setTimeout(() => {
        message.innerHTML = "";
    }, 5000);
    showBook();
}
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}
class Display {
    addBook(book) {
        let getBook = localStorage.getItem('books');
        let bookObj;
        if (getBook == null) {
            bookObj = [];
        } else {
            bookObj = JSON.parse(getBook);
        }
        bookObj.push(book);
        localStorage.setItem('books', JSON.stringify(bookObj));
        showBook();
    }
    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }
    validate(book) {
        if (book.name.length < 2 && book.author.length < 3) {
            return false;
        } else {
            return true;
        }
    }
    showMessage(messageType, displayMessage) {
        let message = document.getElementById('message');
        let typeText;
        if (messageType == 'success') {
            typeText = 'Success';
        } else {
            typeText = 'Error';
        }
        message.innerHTML = `<div class="alert alert-${messageType} alert-dismissible fade show" role="alert">
                            <strong>${typeText}</strong>: ${displayMessage}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`
        setTimeout(() => {
            message.innerHTML = "";
        }, 5000);
    }
}

let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmitter);

function libraryFormSubmitter(e) {
    e.preventDefault();

    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let typeSelector = document.querySelectorAll('.type');
    Array.from(typeSelector).forEach(function (element) {
        if (element.checked) {
            type = element.value;
        }
    });
    let book = new Book(name, author, type);
    let display = new Display();

    if (display.validate(book)) {
        display.addBook(book);
        display.clear();
        display.showMessage('success', `Your Book ${book.name} has been added to the list`);
    } else {
        display.showMessage('danger', "We couldn't add your book to the list");
    }
}