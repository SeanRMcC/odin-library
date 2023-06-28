const books = document.querySelector(".books");
const newBook = document.querySelector(".new");
const form = document.querySelector(".modal");

let myLibrary = [];

function Book(title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = false;
}

Book.prototype.info = function(){
    let information = `${this.title} by ${this.author}, ${this.pages} pages,`;
    information += this.hasRead ? " already read" : " not read yet";
    return information;
};

function addBookToLibrary(book){
    myLibrary.push(book);
}

function displayBooks(){
    for(let b of myLibrary){
        let book = document.createElement("div");
        book.classList.add("book");
        book.innerHTML = b.info() + '<br><button type="button" class="remove">Remove</button>';
        books.appendChild(book);
    }
}

newBook.addEventListener("click", () => {
    form.classList.toggle("modal-revealed");
});

form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const dataArray = [...data.entries()];
    const dataObject = {};
    for(let dataArrayCell of dataArray){
        dataObject[dataArrayCell[0]] = dataArrayCell[1];
    }
    console.log(dataObject);

    const book = new Book(dataObject.title, dataObject.author, dataObject.pages);
    clear();
    addBookToLibrary(book);
    displayBooks();
    form.classList.remove("modal-revealed");
    form.reset();
});

function clear(){
    books.innerHTML = '';
}