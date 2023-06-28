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
    const newBook = document.createElement("div");
    newBook.classList.add("book");
    newBook.textContent = book.info();
    const lineBreak = document.createElement("br");
    newBook.appendChild(lineBreak);
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.textContent = "Remove";
    newBook.appendChild(removeButton);

    removeButton.addEventListener("click", () => {
        const removedBook = removeButton.parentNode;
        const bookList = Array.from(document.querySelectorAll(".book"));

        let childIndex = indexOfBookNode(removedBook);
        myLibrary.splice(childIndex, 1);
        console.log(myLibrary);

        removedBook.remove();
    });


    books.appendChild(newBook);
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

    const book = new Book(dataObject.title, dataObject.author, dataObject.pages);
    addBookToLibrary(book);
    form.classList.remove("modal-revealed");
    form.reset();
});

function indexOfBookNode(node){
    const bookList = Array.from(document.querySelectorAll(".book"));

    let childIndex = 0;
    while(node !== bookList[childIndex]){
        childIndex++;
    }

    return childIndex;
}