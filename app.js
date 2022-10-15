class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

const library = [];

const addButtonElement = document.querySelector('#add-button');
const booksListElement = document.querySelector('#books');
const bookCardElement = document.querySelector('.add-book-card');
const readButtonElement = document.querySelector('button[type=button]');
const submitButtonElement = document.querySelector('#add');

//Event listeners--------------------------------------------------------------------------------------------
addButtonElement.addEventListener('click', () => bookCardElement.style.display = 'block');
readButtonElement.addEventListener('click', changeColor);
submitButtonElement.addEventListener('click', addBookToLibrary);

//Functions--------------------------------------------------------------------------------------------------
function changeColor(e) {
    e.target.textContent = e.target.textContent == 'Not read' ? 'Read' : 'Not read';
    e.target.classList.toggle('green');
}
function addBookToLibrary(e) {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = Number(document.querySelector('#pages').value);
    const isRead = e.target.parentElement.children[3].classList.contains('green') ? true : false;
    if (!title || !author || !pages) return;

    const book = new Book(title, author, pages, isRead);
    library.push(book);
    displayBook(book);
    document.querySelectorAll('input').forEach(el => el.value = '');
    if (readButtonElement.classList.contains('green')) readButtonElement.classList.toggle('green');
    readButtonElement.textContent = 'Not read';
    e.target.parentElement.parentElement.style.display = 'none';
}
function displayBook(bookObj) {
    // Create card
    const div = document.createElement('div');
    div.classList.add('card');
    const title = document.createElement('p');          //Title
    title.textContent = `Title: ${bookObj.title}`;
    const author = document.createElement('p');         //Author
    author.textContent = `Author: ${bookObj.author}`;
    const pages = document.createElement('p');          //Pages
    pages.textContent = `Pages: ${bookObj.pages}`;
    const isRead = document.createElement('button');    //Is read
    if (bookObj.isRead) {
        isRead.textContent = 'Read';
        isRead.classList.add('green');
    } else {
        isRead.textContent = 'Not read';
        isRead.style.backgroundColor = 'var(--red)';
    }
    const removeButton = document.createElement('button');//Remove
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', removeElement);

    //Append card
    div.append(title, author, pages, isRead, removeButton);
    booksListElement.append(div);
}
function removeElement(e) {
    e.target.parentElement.remove();
    const elementTitle = e.target.parentElement.children[0].textContent.split(': ')[1];
    const indexOfObject = library.findIndex(object => {
        return object.title == elementTitle;
    });
    library.splice(indexOfObject, 1);
    console.log(library);
}