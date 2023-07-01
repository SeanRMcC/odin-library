const books = document.querySelector(".books");
const newBook = document.querySelector(".new");
const form = document.querySelector(".modal");

let myLibrary = [];


class Book{
    constructor(title, author, pages){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = false
    }

    get info(){
        let information = `${this.title} by ${this.author}, ${this.pages} pages,`;
        information += this.hasRead ? " already read" : " not read yet";
        return information;
    }
}

function addBookToLibrary(book){
    myLibrary.push(book);
    const newBook = document.createElement("div");
    newBook.classList.add("book");
    const text = document.createElement("div");
    text.textContent = book.info;
    newBook.appendChild(text);
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.textContent = "Remove";
    newBook.appendChild(removeButton);

    removeButton.addEventListener("click", () => {
        const removedBook = removeButton.parentNode;

        let childIndex = indexOfBookNode(removedBook);
        myLibrary.splice(childIndex, 1);

        removedBook.remove();
    });
 
    const readButton = document.createElement("button");
    readButton.classList.add("read-button")
    readButton.textContent = "Toggle Read Status"
    newBook.appendChild(readButton);

    readButton.addEventListener("click", () => {
        const toggledBook = readButton.parentNode;
        const toggledBookText = toggledBook.firstChild;
        const bookIndex = indexOfBookNode(toggledBook);
        const toggledBookObj = myLibrary[bookIndex];
        toggledBookObj.hasRead = !toggledBookObj.hasRead;
        toggledBookText.textContent = toggledBookObj.info;
        toggledBook.classList.toggle("read");
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