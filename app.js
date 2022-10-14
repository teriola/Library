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
const [readButtonElement, addBookButtonElement] = document.querySelectorAll('button[type=button]');

//Event listeners---------------------------------------------------------------------------
addButtonElement.addEventListener('click', () => bookCardElement.style.display = 'block');
readButtonElement.addEventListener('click', () => {
    if (readButtonElement.textContent == 'Not read') {
        readButtonElement.classList.add('green');
        readButtonElement.classList.remove('red');
        readButtonElement.textContent = 'Read';
        // debugger;
    } else {
        readButtonElement.classList.add('red');
        readButtonElement.classList.remove('green');
        readButtonElement.textContent = 'Not read';
        // debugger;
    }
});
addBookButtonElement.addEventListener('click', () => {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = Number(document.querySelector('#pages').value);
    const isRead = readButtonElement.classList.contains('green') ? true : false;
    if (!title || !author || !pages) return;

    const book = new Book(title, author, pages, isRead)
    addBookToLibrary(book);


    bookCardElement.style.display = 'none';
    readButtonElement.classList.add('red');
    readButtonElement.classList.remove('green');
    readButtonElement.textContent = 'Not read';
    document.querySelectorAll('input').forEach(el => el.value = '');
});

//Functions---------------------------------------------------------------------------------
function addBookToLibrary(bookObj) {
    library.push(bookObj);
    displayBook(bookObj);
}
function displayBook(bookObj) {
    // Container
    const div = document.createElement('div');
    div.classList.add('card');
    //Title
    const title = document.createElement('p');
    title.textContent = `Title: ${bookObj.title}`;

    //Author
    const author = document.createElement('p');
    author.textContent = `Author: ${bookObj.author}`;

    //Pages
    const pages = document.createElement('p');
    pages.textContent = `Pages: ${bookObj.pages}`;

    //isRead
    const isRead = document.createElement('button');
    if (bookObj.isRead) {
        isRead.textContent = 'Read';
        isRead.classList.add('green');
    } else {
        isRead.textContent = 'Not read';
        isRead.classList.add('red');
    }
    isRead.addEventListener('click', () => {
        if (isRead.textContent == 'Not read') {
            isRead.classList.add('green');
            isRead.classList.remove('red');
            isRead.textContent = 'Read';
            // debugger;
        } else {
            isRead.classList.add('red');
            isRead.classList.remove('green');
            isRead.textContent = 'Not read';
            // debugger;
        }
    });
    //Remove
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', (e) => {
        e.target.parentElement.remove();
    });
    //Append
    div.append(title, author, pages, isRead, removeButton);
    booksListElement.append(div);

    document.querySelector('#books').append(div);
}